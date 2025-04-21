import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkin } from "../../shared/checkin";
import { getLocation } from "../../utils";
import Tablecalendar from "../../components/common/tablecalender";
import { FiLogIn, FiLogOut, FiPhone } from "react-icons/fi";
import Usericons from "../../components/common/Avatar";
import { MdOutlineEmail, MdOutlineTimer } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Checkintoggle from "../../components/common/checkintoggle";
import { Divider, Tooltip } from "antd";
import moment from "moment";
import LogStep from "../../components/common/steps";
import { RiTimerLine } from "react-icons/ri";
import { getUserProfile } from "../../shared/profile";
import CommonPopup from "../../components/common/popup";
import CommonClock from "../../components/common/commonclock";
import dayjs from "dayjs";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { checkin: checkinData } = useSelector((state) => state.checkin);
  const { userProfile } = useSelector((state) => state.profile);
  let updatedProfile = userProfile?.data;
  let checkinType = updatedProfile?.punch_type;
  const [checked, setChecked] = useState();
  const [workingTime, setWorkingTime] = useState({ hours: 0, minutes: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (value) => {
    setIsModalOpen(value);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (checkinType === "checked_in") {
      setChecked(true);
    } else if (checkinType === "checked_out") {
      setChecked(false);
    }
  }, [checkinType]);

  let checkinTime = updatedProfile?.checked_in_time;
  let displayCheckinTime = checkinTime
    ? formatDateTime(new Date(checkinTime))
    : "Not Checked In";

  let checkoutTime = updatedProfile?.checked_out_time;
  let displayCheckoutTime = checkoutTime
    ? formatDateTime(new Date(checkoutTime))
    : "Not Checked Out";

  function formatDateTime(date) {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const parts = formatter.formatToParts(date);

    let day, month, hour, minute, dayPeriod;

    for (const part of parts) {
      switch (part.type) {
        case "day":
          day = part.value;
          break;
        case "month":
          month = part.value;
          break;
        case "hour":
          hour = part.value;
          break;
        case "minute":
          minute = part.value;
          break;
        case "dayPeriod":
          dayPeriod = part.value.toUpperCase();
          break;
      }
    }

    return `${day}-${month}, ${hour}:${minute} ${dayPeriod}`;
  }

  let workinghours =
    checkinType == "checked_in"
      ? `${workingTime.hours} hrs ${workingTime.minutes} mins`
      : updatedProfile?.working_hours;

  let parsedHours = workinghours
    ? moment
        .duration(
          moment(workinghours, ["HH:mm", "h:mm A", "HHmm"]).format("HH:mm")
        )
        .asHours()
    : 0;

  let formattedTime = workinghours
    ? moment(workinghours, ["HH:mm", "h:mm A", "HHmm"]).format("HH") +
      "hrs : " +
      moment(workinghours, ["HH:mm", "h:mm A", "HHmm"]).format("mm") +
      "mins"
    : "";

  let color = parsedHours > 9 ? "#99BC85" : "rgb(255 178 178)";

  useEffect(() => {
    if (checkinType === "checked_out") return;

    const updateWorkingTime = () => {
      const now = new Date();
      const checkin = new Date(checkinTime);
      const diffMs = now - checkin;
      const totalMinutes = Math.floor(diffMs / 1000 / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setWorkingTime({ hours, minutes });
    };

    updateWorkingTime(); // Initial call

    const intervalId = setInterval(() => {
      updateWorkingTime();
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup
  }, [checkinTime, checkinType]);

  console.log(workingTime, "workingTime");

  useEffect(() => {
    dispatch(getUserProfile());
  }, [checkinData]);

  const handleCheckin = (val) => {
    setLoading(true);
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
  const legendsData = [
    { key: "absent", title: "Absent" },
    { key: "present", title: "Present" },
    { key: "weekend", title: "Week End" },
    { key: "weekendholiday", title: " Weekend Holiday" },
    { key: "mandatory", title: "Mandatory Holiday" },
    { key: "resricted", title: "Resricted Holiday" },
  ];
  return (
    <div className="dashboardmain">
      <CommonPopup
        title={"Regularize"}
        isModalOpen={isModalOpen}
        okText={"Submit"}
        handleOk={handleOk}
        handleCancel={handleCancel}
        children={<div>{isModalOpen}</div>}
      />
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
                <RiTimerLine />
              </div>
            </div>
          </div>
          <div className="worklog">
            <div className="checkincheckouttime left">
              <div className="checkinout login-action">
                <FiLogIn />
              </div>
              <div className="checkinouttime">{displayCheckinTime}</div>
            </div>
            <Divider type="vertical" className="divider" />
            <div className="checkincheckoutbtn right">
              {checkinType === "checked_out" ? (
                <div className="checkout-content">You're done for the day</div>
              ) : (
                <Checkintoggle
                  checked={checked}
                  disabled={loading || checkinType === "checked_out"}
                  handleChange={(val) => {
                    handleCheckin(val.target.checked);
                  }}
                />
              )}
              <div
                className="productivityhours-content"
                style={{
                  visibility: checkinType === null ? "hidden" : "visible",
                }}
              >
                <span className="productivityhours">Productivity Hours :</span>{" "}
                <span style={{ color: color }}>{formattedTime}</span>
              </div>
            </div>

            <Divider type="vertical" className="divider" />
            <div className="checkincheckouttime left">
              <div className="checkinout logout-action">
                <FiLogOut />
              </div>
              <div className="checkinouttime">{displayCheckoutTime}</div>
            </div>
          </div>
        </section>

        <div className="checkinclock page-center">
          <div className="tablecalendar">
            <Tablecalendar
              handleDateClick={(e) => {
                showModal(dayjs(e).format("DD-MM-YYYY"));
              }}
            />
          </div>
        </div>

        <div className="calendar-legends">
          {legendsData?.map((e, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <div className={`${e.key} color`}></div>
                <div style={{ marginLeft: "4px" }}>{e?.title}</div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="dashboardright">
        <div className="profilecard-container">
          <div className="profiledata">
            <Usericons />
            <h4>
              {userProfile?.data?.name || "User Name"}{" "}
              <div className="profilremployee-code">
                ({userProfile?.data?.employee_code})
              </div>
            </h4>
            <div className="profile-icons">
              <Tooltip
                title={userProfile?.data?.mobile_number}
                placement="bottom"
              >
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
        <CommonPopup />
        <div className="worklog-container">
          <LogStep />
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
{
  /* <CustomButton
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
            /> */
}
