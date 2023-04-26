import { Link, Outlet } from "react-router-dom";
import { FloatButton, Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const IndexElement = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          background: "var(--base-color)",
        }}
        className="flex flex-row"
      >
        <Link className="flex flex-row items-center hover:text-white" to={"/"}>
          <img className="w-[36px] h-[36px] mr-2" src="/logo.png" />
          <span className="font-bold text-xl">Flash-Game-X</span>
        </Link>
      </Header>
      <Content className="px-4 md:px-[50px]" style={{ background: "#222222" }}>
        <FloatButton.BackTop />
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center", background: "#1a1a1a" }}>
        Flash-Game-X ©2023 Created by
        <Link
          className="ml-2"
          to="https://github.com/GrinZero/flash-game-x"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <GithubOutlined className="mr-1" />
          flash-game-x
        </Link>
      </Footer>
    </Layout>
  );
};
export default IndexElement;
