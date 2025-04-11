import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutAction } from "../../shared/login/actions";
import Usericons from "../common/Avatar";

const MainHeader = () => {
  const { userProfile } = useSelector((state) => state.profile);

  // const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div style={{ padding: 0 }} className="page-center header">
      <div className="dashboardcontent">
        {/* <div className="logo">
          <img src="https://cartoonmango.com/cm-logo.gif" alt="" />
        </div> */}
        <div className="profiledata">
          <Usericons />
          <h4>{userProfile?.data?.name || "User Name"}</h4>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
