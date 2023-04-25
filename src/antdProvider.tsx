import React from "react";

import zhCN from "antd/locale/zh_CN";
import { setTwoToneColor } from "@ant-design/icons";
import { ConfigProvider, theme, App as AntdApp } from "antd";

setTwoToneColor("#7fa1f7");

function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#7fa1f7",
          colorError: "#f77f7f",
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}

export default AntdProvider;
