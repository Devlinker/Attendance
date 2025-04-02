import React, { useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import CommonClock from "../../components/common/commonclock/commonclock";
import CustomButton from "../../components/common/button";
import { checkin } from "../../shared/checkin";
import { getLocation } from "../../utils";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.checkin);
  const { userProfile } = useSelector((state) => state.profile);
  let checkinType = profile?.data?.punch_type || userProfile?.data?.punch_type;
  let checkinTime = userProfile?.data?.checked_in_time;
  let checkouttime = userProfile?.data?.checked_out_time;

  const handleCheckin = () => {
    getLocation()
      .then(({ lat, lon }) => {
        console.log("Latitude:", lat, "Longitude:", lon);
        dispatch(
          checkin({
            latitude: lat,
            longitude: lon,
            user_id: 1,
            project_id: 1,
          })
        );
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="checkinclock">
      <CommonClock />
      <div className="checkinbtn">
        <CustomButton
          disabled={
            checkinType === "checked_in" || checkinType === "checked_out"
          }
          buttonTxt={"Check In"}
          width={"100px"}
          onClick={handleCheckin}
        />
        <CustomButton
          disabled={checkinType === "checked_out" || checkinType == null}
          buttonTxt={"Check Out"}
          width={"100px"}
          onClick={handleCheckin}
        />
      </div>
      <div className="checkindata">
        {/* <div>{userProfile?.data?.name || "User Name"}</div> */}
        <div> Check In Time : {checkinTime}</div>
        <div> Check Out Time : {checkouttime}</div>
      </div>
    </div>

    // <div className=""></div>
  );
};
export default Dashboard;
