import React, { useState } from "react";
import "./Layout.scss";
import {
  LogoutOutlined,
  // DesktopOutlined,
  // FileOutlined,
  PieChartOutlined,
  // TeamOutlined,
  // UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Header from "./components/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "./shared/login/actions";
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
  // console.log(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
      // collapsible
      // collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <div className="logo">
          <img src="https://cartoonmango.com/cm-logo.gif" alt="" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[pathname]}
          style={{
            minHeight: "calc(100vh - 155px)",
            padding: "15px 15px 15px 15px",
          }}
          mode="inline"
          items={items}
        />
        <div
          className="logoutbtn"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <LogoutOutlined />
          Log out
        </div>
      </Sider>

      <Layout>
        {/* <Header /> */}

        <Content style={{ margin: " 0px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
           <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> 
          </Breadcrumb> */}
          <div className="main-layout-container">{children}</div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default AppLayout;
