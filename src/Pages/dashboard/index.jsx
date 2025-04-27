import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  checkin,
  getCalender,
  regularize,
  worklogs,
} from "../../shared/dashboard";
import { getLocation } from "../../utils";
import Tablecalendar from "../../components/common/tablecalender";
import { FiLogIn, FiLogOut, FiPhone } from "react-icons/fi";
import Usericons from "../../components/common/Avatar";
import { MdOutlineEmail, MdOutlineTimer } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Checkintoggle from "../../components/common/checkintoggle";
import { Divider, Form, TimePicker, Tooltip } from "antd";
import moment from "moment";
import LogStep from "../../components/common/steps";
import { RiTimerLine } from "react-icons/ri";
import { getUserProfile } from "../../shared/profile";
import CommonPopup from "../../components/common/popup";
import CommonClock from "../../components/common/commonclock";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TextAreainput from "../../components/common/textarea";
import { useNotification } from "../../utils/notifications";

dayjs.extend(utc);
dayjs.extend(timezone);
const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { checkin: checkinData } = useSelector((state) => state.dashboard);
  const { logwork } = useSelector((state) => state.dashboard);
  const { userProfile } = useSelector((state) => state.profile);
  let updatedProfile = userProfile?.data;
  let checkinType = updatedProfile?.punch_type;
  const [checked, setChecked] = useState();
  const [workingTime, setWorkingTime] = useState({ hours: 0, minutes: 0 });
  const [regularizeTimeRange, setRegularizetimerange] = useState({
    checked_in_time: null,
    checked_out_time: null,
    regularize_reason: "",
  });

  const calendardata = useSelector((state) => state.dashboard);
  const [calendarFilter, setCalendarFilter] = useState({
    month: moment().month() + 1,
    year: moment().year(),
  });
  useEffect(() => {
    dispatch(getCalender(calendarFilter));
  }, [checkinData, calendarFilter]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (value) => {
    setIsModalOpen(value);
    let todayTime = calendardata?.calender?.data?.find(
      (item) =>
        moment(item.calendar_date, "YYYY-MM-DD").format("DD-MM-YYYY") == value
    );
    setRegularizetimerange({
      checked_in_time: todayTime?.checked_in_time
        ? dayjs.utc(todayTime.checked_in_time, "HH:mm:ss").tz("Asia/Kolkata")
        : null,
      checked_out_time: todayTime?.checked_out_time
        ? dayjs.utc(todayTime.checked_out_time, "HH:mm:ss").tz("Asia/Kolkata")
        : null,
    });
  };
  const notify = useNotification();

  const handleOk = () => {
    setIsModalOpen(false);
    // dispatch(
    //   regularize({
    //     checked_in_time: regularizeTimeRange.checked_in_time,
    //     checked_out_time: regularizeTimeRange.checked_out_time,
    //     attendance_date: isModalOpen,
    //     regularize_reason: regularizeTimeRange.regularize_reason,
    //   })
    // );
    // Convert to desired format using dayjs
    const formattedCheckIn = dayjs(regularizeTimeRange.checked_in_time, [
      // "hh.mmA",
      "hh:mm ",
    ]).format("HH:mma");
    const formattedCheckOut = dayjs(regularizeTimeRange.checked_out_time, [
      // "hh.mmA",
      "hh:mm ",
    ]).format("HH:mma");
    console.log(isModalOpen);

    // Dispatch to Redux
    dispatch(
      regularize(
        {
          checked_in_time: formattedCheckIn,
          checked_out_time: formattedCheckOut,
          attendance_date: moment(isModalOpen, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ), // assuming this is the date
          regularize_reason: regularizeTimeRange.regularize_reason,
        },
        (message) => {
          notify("success", "Success!", message);
        },
        (errMessage) => {
          notify("error", "Failed!", errMessage);
        }
      )
    );
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

    updateWorkingTime();

    const intervalId = setInterval(() => {
      updateWorkingTime();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [checkinTime, checkinType]);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(worklogs());
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
        ).finally(() => setLoading(false));
      })
      .catch((error) => {
        setLoading(false);
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
  const RegularizeModelChange = (key, time, timeString) => {
    setRegularizetimerange((prev) => ({
      ...prev,
      [key]: time,
    }));
  };
  return (
    <div className="dashboardmain">
      <CommonPopup
        title={<div>Regularize For {isModalOpen}</div>}
        isModalOpen={isModalOpen}
        okText={"Submit"}
        handleOk={handleOk}
        handleCancel={handleCancel}
        children={
          <div>
            <Form layout="vertical">
              <Form.Item label="Check-in Time" style={{ width: "100%" }}>
                <TimePicker
                  style={{ width: "100%" }}
                  // use12Hours
                  value={
                    regularizeTimeRange.checked_in_time
                      ? dayjs(regularizeTimeRange.checked_in_time)
                      : regularizeTimeRange.checked_in_time
                  }
                  format="h:mm a"
                  onChange={(time, timeString) =>
                    RegularizeModelChange("checked_in_time", time, timeString)
                  }
                />
              </Form.Item>

              <Form.Item label="Check-out Time" style={{ width: "100%" }}>
                <TimePicker
                  style={{ width: "100%" }}
                  // use12Hours
                  value={
                    regularizeTimeRange.checked_out_time
                      ? dayjs(regularizeTimeRange.checked_out_time)
                      : regularizeTimeRange.checked_out_time
                  }
                  format="h:mm a"
                  onChange={(time, timeString) =>
                    RegularizeModelChange("checked_out_time", time, timeString)
                  }
                />
              </Form.Item>
              <TextAreainput
                value={regularizeTimeRange.regularize_reason}
                onChange={(val) =>
                  RegularizeModelChange("regularize_reason", val.target.value)
                }
              />
            </Form>
          </div>
        }
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
                  loading={loading}
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
              calendarFilter={calendarFilter}
              setCalendarFilter={setCalendarFilter}
              calendardata={calendardata}
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
                key={index}
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
          <LogStep logwork={logwork} />
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
