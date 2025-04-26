import React, { useState } from "react";
import "./Layout.scss";
import {
  LogoutOutlined,
  // DesktopOutlined,
  // FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  // UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "./shared/login/actions";
import { dashboardRoute } from "./utils/routeContants";
import { AiOutlineAudit } from "react-icons/ai";
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", dashboardRoute, <PieChartOutlined />),
  getItem("Employee", "/employee", <TeamOutlined />),
  getItem("Regularize", "/regularize", <AiOutlineAudit />),
];
const AppLayout = ({ children }) => {
  const naviagte = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="demo-logo-vertical" />
        <div className="logo">
          <img src="https://cartoonmango.com/cm-logo.gif" alt="" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[pathname]}
          onClick={(e) => {
            naviagte(e.key);
          }}
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
        <Content style={{ margin: " 0px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
           <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> 
          </Breadcrumb> */}
          <div className="main-layout-container">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
