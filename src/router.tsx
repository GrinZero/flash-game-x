import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";

export interface Route {
  path: string;
  element: React.ReactNode;
  redirect?: string;
  children?: Route[];
  _children?: Route[];
}
export interface RouterStore {
  route: Route;
  [key: string]: any;
}

const importGlob = import.meta.glob("./pages/**/*.tsx");
const metaGlob = import.meta.glob("./pages/**/meta.tsx", { eager: true });

const initStore = () => {
  const baseFlatRoutes: Omit<Route, "element">[] = Object.keys(importGlob)
    .filter((path) => !path.includes("meta.tsx"))
    .map((path) => {
      const route =
        path === "./pages/index.tsx"
          ? ""
          : path.replace("/index.tsx", "").replace("./pages/", "");
      return {
        path: `/${route}`,
      };
    });
  const store: RouterStore = {
    route: baseFlatRoutes.find((i) => i.path === "/") as Route,
  };
  for (const route of baseFlatRoutes) {
    const pathArr = route.path.split("/");
    const path = pathArr[pathArr.length - 1];
    if (path === "") {
      continue;
    }
    let current = store;
    for (let i = 0; i < pathArr.length; i++) {
      if (i == 0) {
        continue;
      }
      const path = pathArr[i];
      if (!current[path]) {
        current[path] = {};
      }
      current = current[path];
      if (i === pathArr.length - 1) {
        current.route = route as Route;
      }
    }
  }
  return store;
};
const getRouter = (storeItem: RouterStore) => {
  let route: Route | null = storeItem["route"];
  for (const key in storeItem) {
    if (key === "route") {
      continue;
    }
    const item = storeItem[key];
    if (!route) {
      route = {
        path: key,
      } as Route;
    }
    if (!route.children) {
      route.children = [];
    }
    route.children.push(getRouter(item));
  }

  if (!storeItem["route"]) {
    return route as Route;
  }

  const path =
    route.path === "/"
      ? "index.tsx"
      : route.path.replace("/", "") + "/index.tsx";
  const meta =
    (metaGlob[`./pages/${path.replace("index.tsx", "meta.tsx")}`] as any)
      ?.default || {};
  const { children, keepAlive, ...rest } = meta;
  const ele = (() => {
    const Module = lazy(
      () => importGlob[`./pages/${path}`]() as unknown as Promise<any>
    );
    return <Module />;
  })();

  const customRoute: Route = {
    ...route,
    path: route.path === "/" ? "/" : route.path.split("/").at(-1),
    element: <Suspense fallback={"loading..."}>{ele}</Suspense>,
    ...(children && {
      _children: children,
    }),
    ...rest,
  };
  return customRoute;
};
const transformRoute = (route: Route) => {
  if (route.children) {
    route.children = route.children.map(transformRoute);
  }
  if (route.redirect) {
    if (!route.children) {
      route.children = [];
    }
    route.children.push({
      path: "",
      element: <Navigate to={route.redirect} replace />,
    });
  }
  if (route._children) {
    if (!route.children) {
      route.children = [];
    }
    route.children.push(...route._children);
  }

  return route;
};

const store = initStore();
const baseRoutes = getRouter(store);

const createRouter = createHashRouter;
const routes = transformRoute(baseRoutes);

export const router: ReturnType<typeof createRouter> = createRouter([routes]);

const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export const openPage = (
  path: string,
  target?: string | undefined,
  features?: string | undefined
) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    window.open(path, target, features);
    return;
  }
  const href = router.createHref(new URL(path, window.location.href));
  const prefix = "";
  window.open(`${prefix}${href}`, target, features);
};

export default AppRouter;
