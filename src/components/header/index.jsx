import React from "react";
import Profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutAction } from "../../shared/login/actions";

const MainHeader = () => {
  const { userProfile } = useSelector((state) => state.profile);

  // const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div style={{ padding: 0, background: "white" }}>
      <span className="dashboardcontent" typeof="button">
        <img
          className="downloadimg"
          src={Profile}
          style={{ width: "40px" }}
          alt=""
        />
        <h4>{userProfile?.data?.name || "User Name"}</h4>
        <div className="logoutbtn">
          <LogoutOutlined onClick={handleLogout} />
        </div>
      </span>
    </div>
  );
};
export default MainHeader;
