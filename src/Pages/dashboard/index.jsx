import React, { useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/common/button";
import { checkin } from "../../shared/checkin";
import { getLocation } from "../../utils";
import Tablecalendar from "../../components/common/commoncalender";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { checkin: checkinData } = useSelector((state) => state.checkin);
  const { userProfile } = useSelector((state) => state.profile);
  let updatedProfile = checkinData?.data || userProfile?.data;
  let checkinType = updatedProfile?.punch_type;

  // let checkinTime = updatedProfile?.checked_in_time;
  // let displayCheckinTime = checkinTime
  //   ? new Date(checkinTime).toLocaleString("en-IN", {
  //       timeZone: "Asia/Kolkata",
  //     })
  //   : "Not Checked In";

  // let checkouttime = updatedProfile?.checked_out_time;
  // let displayCheckoutTime = checkouttime
  //   ? new Date(checkouttime).toLocaleString("en-IN", {
  //       timeZone: "Asia/Kolkata",
  //     })
  //   : "Not Checked Out";

  let checkinTime = updatedProfile?.checked_in_time;
  let displayCheckinTime = checkinTime
    ? formatDateTime(new Date(checkinTime))
    : "Not Checked In";

  let checkoutTime = updatedProfile?.checked_out_time;
  let displayCheckoutTime = checkoutTime
    ? formatDateTime(new Date(checkoutTime))
    : "Not Checked Out";

  function formatDateTime(date) {
    const options = { timeZone: "Asia/Kolkata" };
    const localDate = new Date(date.toLocaleString("en-IN", options));

    const day = String(localDate.getDate()).padStart(2, "0");
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const year = localDate.getFullYear();

    let hours = localDate.getHours();
    const minutes = String(localDate.getMinutes()).padStart(2, "0");
    const seconds = String(localDate.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  }

  let workinghours = updatedProfile?.working_hours;

  // const handleCheckin = () => {
  //   getLocation()
  //     .then(({ lat, lon }) => {
  //       console.log("Latitude:", lat, "Longitude:", lon);
  //       dispatch(
  //         checkin({
  //           latitude: lat,
  //           longitude: lon,
  //           user_id: 1,
  //           project_id: 1,
  //         })
  //       );
  //     })
  //     .catch((error) => console.error(error.message));
  // };

  const handleCheckin = () => {
    setLoading(true); // Start loading
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
        ).finally(() => setLoading(false)); // Stop loading after dispatch
      })
      .catch((error) => {
        console.log(error);
        // console.error(error.message);
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <div className="checkinclock">
      <div className="checkinbtn">
        {/* <CustomButton
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
        /> */}

        <CustomButton
          disabled={
            loading ||
            checkinType === "checked_in" ||
            checkinType === "checked_out"
          }
          buttonTxt={loading ? "Checking In..." : "Check In"}
          width={"100px"}
          onClick={handleCheckin}
        />
        <CustomButton
          disabled={
            loading || checkinType === "checked_out" || checkinType == null
          }
          buttonTxt={loading ? "Checking Out..." : "Check Out"}
          width={"100px"}
          onClick={handleCheckin}
        />
      </div>
      <div className="checkindata">
        {/* <div>{userProfile?.data?.name || "User Name"}</div> */}
        <div> Check In Time : {displayCheckinTime}</div>
        <div> Check Out Time : {displayCheckoutTime}</div>
        <div> Working Hours : {workinghours}</div>
      </div>
      {/* <Popupnotification /> */}
      <div className="tablecalendar">
        <Tablecalendar />
      </div>
    </div>
  );
};
export default Dashboard;
