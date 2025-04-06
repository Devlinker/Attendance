import React from "react";
import Profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutAction } from "../../shared/login/actions";
import Usericons from "../common/Avatar";
import CommonClock from "../common/commonclock/commonclock";

const MainHeader = () => {
  const { userProfile } = useSelector((state) => state.profile);

  // const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div style={{ padding: 0, background: "white" }} className="page-center">
      <div className="dashboardcontent">
        <div className="headerclock">
        <CommonClock />
        </div>
        <div className="profiledata">
        <Usericons />
        <h4>{userProfile?.data?.name || "User Name"}</h4>
        </div>
        <div className="logoutbtn">
          <LogoutOutlined onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
