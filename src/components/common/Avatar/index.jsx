import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import "./avatar.scss";
const Usericons = () => (
  <Avatar
    size="large"
    style={{ height: "46px", width: "46px" }}
    icon={<UserOutlined />}
  />
);
export default Usericons;
