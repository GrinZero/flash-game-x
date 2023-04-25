export default {
  path: "/",
  redirect: "/home",
  children: [
    {
      path: "*",
      element: <div>404</div>,
    },
  ],
};
