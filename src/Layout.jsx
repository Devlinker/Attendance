import React, { useState } from "react";
import "./Layout.scss";
import {
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "./shared/login/actions";
import { dashboardRoute } from "./utils/routeContants";
import { AiOutlineAudit } from "react-icons/ai";
import logo from "./assets/imgs/logo.svg";

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
  // getItem("Regularize", "/regularize", <AiOutlineAudit />),
];
const AppLayout = ({ children }) => {
  // const [modalLogout, setModalLogout] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);
  const updatedProfile = userProfile?.data;

  // Prepare menu items
  const baseItems = [
    getItem("Dashboard", dashboardRoute, <PieChartOutlined />),
    getItem("Employee", "/employee", <TeamOutlined />),
    // getItem("Regularize", "/regularize", <AiOutlineAudit />),
  ];

  // If user_type is "employee", remove "Employee" tab
  const items =
    updatedProfile?.user_type === "employee"
      ? baseItems.filter((item) => item.label !== "Employee")
      : baseItems;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Modal
        open
        title={title}
        maskClosable={closable}
        okText={okText}
        onOk={handleOk}
        onCancel={handleCancel}
      /> */}
      <Sider>
        <div className="demo-logo-vertical" />
        <div className="logo">
          <img src={logo} alt="svg" />
        </div>
        {/* {console.log(pathname)} */}
        <Menu
          theme="dark"
          selectedKeys={[pathname ? `/${pathname.split("/")[1]}` : "/"]}
          onClick={(e) => {
            navigate(e.key);
          }}
          style={{
            minHeight: "calc(100vh - 155px)",
            padding: "15px",
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
        <Content style={{ margin: "0px" }}>
          <div className="main-layout-container">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
