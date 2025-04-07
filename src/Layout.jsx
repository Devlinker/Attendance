import React, { useState } from "react";
import "./Layout.scss";
import {
  // DesktopOutlined,
  // FileOutlined,
  PieChartOutlined,
  // TeamOutlined,
  // UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Header from "./components/header";
import { useLocation, useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [getItem("Dashboard", "/dashboard", <PieChartOutlined />)];
const AppLayout = ({ children }) => {
  const naviagte = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              height: "calc(100% - 50px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default AppLayout;
