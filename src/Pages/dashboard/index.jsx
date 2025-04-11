import React, { useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/common/button";
import { checkin } from "../../shared/checkin";
import { getLocation } from "../../utils";
import CommonClock from "../../components/common/commonclock/commonclock";
import Tablecalendar from "../../components/common/commoncalender";
import { FiLogIn, FiLogOut, FiPhone } from "react-icons/fi";
import Usericons from "../../components/common/Avatar";
import { MdOutlineEmail, MdOutlineTimer } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Checkintoggle from "../../components/common/checkin toggle";
import { Divider, Tooltip } from "antd";
import moment from "moment";
const Dashboard = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { checkin: checkinData } = useSelector((state) => state.checkin);
  const { userProfile } = useSelector((state) => state.profile);
  let updatedProfile = checkinData?.data || userProfile?.data;
  let checkinType = updatedProfile?.punch_type;

  let checkinTime = updatedProfile?.checked_in_time;
  let displayCheckinTime = checkinTime
    ? formatDateTime(new Date(checkinTime))
    : "Not Checked In";

  console.log("testing", userProfile?.data?.email);

  let checkoutTime = updatedProfile?.checked_out_time;
  let displayCheckoutTime = checkoutTime
    ? formatDateTime(new Date(checkoutTime))
    : "Not Checked Out";

  function formatDateTime(date) {
    const options = { timeZone: "Asia/Kolkata" };
    const localDate = new Date(date.toLocaleString("en-IN", options));

    const day = String(localDate.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[localDate.getMonth()];

    let hours = localDate.getHours();
    const minutes = String(localDate.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");

    return `${day}-${month}, ${hours}:${minutes} ${ampm}`;
  }

  // function formatDateTime(date) {
  //   const options = { timeZone: "Asia/Kolkata" };
  //   const localDate = new Date(date.toLocaleString("en-IN", options));

  //   const day = String(localDate.getDate()).padStart(2, "0");
  //   const month = String(localDate.getMonth() + 1).padStart(2, "0");
  //   const year = localDate.getFullYear();

  //   let hours = localDate.getHours();
  //   const minutes = String(localDate.getMinutes()).padStart(2, "0");
  //   const seconds = String(localDate.getSeconds()).padStart(2, "0");

  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12 || 12; // Convert to 12-hour format
  //   hours = String(hours).padStart(2, "0");

  //   return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  // }

  let workinghours = updatedProfile?.working_hours;
  // let workinghours = updatedProfile?.working_hours;

  let formattedTime = workinghours
    ? moment(workinghours, ["HH:mm", "h:mm A", "HHmm"]).format("HH") +
      "hrs : " +
      moment(workinghours, ["HH:mm", "h:mm A", "HHmm"]).format("mm") +
      "mins"
    : "";

  // console.log(); // Example output: "09:30"

  // let workinghours = updatedProfile?.working_hours?.slice(0, 5);

  const handleCheckin = (val) => {
    setLoading(true); // Start loading
    getLocation()
      .then(({ lat, lon }) => {
        console.log("Latitude:", lat, "Longitude:", lon);
        dispatch(
          checkin(
            {
              latitude: lat,
              longitude: lon,
              user_id: 1,
              project_id: 1,
            },
            () => {
              setChecked(val);
            }
          )
        ).finally(() => setLoading(false)); // Stop loading after dispatch
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <div className="dashboardmain">
      <section className="dashboardleft">
        <section className="worklogcontainer">
          <div className="dashboard-header">
            <div className="dashboard-content">
              <h2>
                {" "}
                Hello, {userProfile?.data?.name?.toUpperCase() || "User Name"}
              </h2>
              <p>Track team progress here. You almost reach a goal!</p>
            </div>
            <div className="centerclock">
              <CommonClock />
              <div className="header-timer">
                <MdOutlineTimer />
              </div>
            </div>
          </div>
          <div className="worklog">
            <div className="checkincheckouttime left">
              {/* <h2>Work Log</h2> */}
              <div className="checkinout loginout-action">
                {" "}
                <FiLogIn />
              </div>
              <div className="checkinouttime">{displayCheckinTime}</div>
            </div>
            <Divider type="vertical" className="divider" />
            <div className="checkincheckoutbtn right">
              <Checkintoggle
                checked={checked}
                disabled={loading || checkinType === "checked_out"}
                handleChange={(val) => {
                  handleCheckin(val.target.checked);
                }}
              />
              <div className="productivityhours-content">
                <span className="productivityhours">Productivity Hours :</span>{" "}
                <span>{formattedTime}</span>
              </div>
            </div>

            <Divider type="vertical" className="divider" />
            {/* <CustomButton
              disabled={
                loading ||
                checkinType === "checked_in" ||
                checkinType === "checked_out"
              }
              buttonTxt={loading ? "Checking In..." : "Check In"}
              width={"130px"}
              onClick={handleCheckin}
            />
            <CustomButton
              disabled={
                loading || checkinType === "checked_out" || checkinType == null
              }
              buttonTxt={loading ? "Checking Out..." : "Check Out"}
              width={"130px"}
              onClick={handleCheckin}
            /> */}
            <div className="checkincheckouttime left">
              <div className="checkinout loginout-action">
                {" "}
                <FiLogOut />
              </div>
              <div className="checkinouttime">{displayCheckoutTime}</div>
            </div>
          </div>
        </section>

        <div className="checkinclock page-center">
          <div className="tablecalendar">
            <Tablecalendar />
          </div>
        </div>
      </section>
      <section className="dashboardright">
        <div className="profilecard-container">
          <div className="profiledata">
            <Usericons />
            <h4>{userProfile?.data?.name?.toUpperCase() || "User Name"}</h4>
            <div className="profile-icons">
              <Tooltip title={"title"} placement="bottom">
                <div className="phone profile-action">
                  <FiPhone />
                </div>
              </Tooltip>
              <Tooltip title={userProfile?.data?.email} placement="bottom">
                <div className="email profile-action">
                  <MdOutlineEmail />
                </div>
              </Tooltip>
              <div className="options profile-action">
                <HiDotsVertical />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
