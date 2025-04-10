// import React, { useEffect } from "react";
// import { Badge, Calendar } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import "./commoncalender.scss"
// import { getCalender } from "../../../shared/calendar/actions";

// const Tablecalendar = () => {
//   const calendardata = useSelector((state) => state.calender);
//   const response = calendardata?.calender?.data || [];

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCalender());
//   }, []);

//   const getListData = (value) => {
//     const dateStr = value.format("YYYY-MM-DD");
//     const filteredData = response?.filter(
//       (item) => item?.calendar_date === dateStr
//     );

//     return filteredData
//       .filter((item) => new Date(item.calendar_date) <= new Date())
//       .map((item) => {
//         const formatTimeFromGMT = (timeStr) => {
//           const [hours, minutes, seconds] = (timeStr || "00:00:00")?.split(":");
//           // Construct date as UTC
//           const date = new Date(
//             Date.UTC(1970, 0, 1, +hours, +minutes, +seconds || 0)
//           );
//           // Format in IST
//           return date.toLocaleTimeString("en-IN", {
//             timeZone: "Asia/Kolkata",
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: true,
//           });
//         };

//         return {
//           type: item.checked_in_time ? "success" : "warning",
//           content: item.checked_in_time
//             ? `(${formatTimeFromGMT(
//                 item.checked_in_time
//               )} - ${formatTimeFromGMT(item.checked_out_time)}) - ${
//                 item.working_hours
//               }`
//             : "Absent",
//         };
//       });
//   };
//   const dateCellRender = (value) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item, index) => (
//           <li key={index}>
//             <Badge status={item.type} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     return info.originNode;
//   };

//   return <Calendar cellRender={cellRender} />;
// };

// export default Tablecalendar;

import React, { useEffect, useState } from "react";
import { Badge, Calendar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./commoncalender.scss";
import { getCalender } from "../../../shared/calendar/actions";
import moment from "moment-timezone";
import dayjs from "dayjs";

const Tablecalendar = () => {
  const { checkin } = useSelector((state) => state.checkin);
  const calendardata = useSelector((state) => state.calender);
  const response = calendardata?.calender?.data || [];
  const [calendarFilter, setCalendarFilter] = useState({
    month: moment().month() + 1,
    year: moment().year(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalender(calendarFilter));
  }, [checkin, calendarFilter]);

  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const todayStr = new Date().toISOString().split("T")[0];

    const filteredData = response?.filter(
      (item) => item?.calendar_date === dateStr
    );

    // If date is today and no data available, show "Yet to Check In"
    if (dateStr === todayStr && filteredData.length === 0) {
      return [
        {
          type: "default",
          content: "Yet to Check In",
        },
      ];
    }

    return (
      filteredData
        // .filter((item) => moment(item.calendar_date).isSameOrBefore(moment()))
        .map((item) => {
          const formatTimeFromGMT = (timeStr) => {
            if (!timeStr) return null;
            return moment
              .utc(timeStr, "HH:mm:ss")
              .tz("Asia/Kolkata")
              .format("hh:mm A");
          };

          const dayTypeConfig = {
            checkIn: "green",
            absent: "red",
            yetToCheckin: "yellow",
            " Mandatory Holiday": "purple",
            Weekend: "orange",
            "Weekend Holiday": "blue"
          };

          const itemDate = moment(item.calendar_date);
          const today = moment().startOf("day");

          if (item?.is_holiday) {
            return {
              type: "success",
              className: dayTypeConfig[item?.holiday_type],

              content: item?.holiday_name,
            };
          } else if (itemDate.isAfter(today)) {
            return {};
          }

          return {
            type: "success",
            className: item.checked_in_time
              ? dayTypeConfig["checkIn"]
              : itemDate.isSame(today, "day")
              ? dayTypeConfig["yetToCheckin"]
              : dayTypeConfig["absent"],
            content: item.checked_in_time
              ? `(${formatTimeFromGMT(
                  item.checked_in_time
                )} - ${formatTimeFromGMT(item.checked_out_time)}) - ${
                  item.working_hours
                }`
              : itemDate.isSame(today, "day")
              ? "Yet To Checkin"
              : "Absent",
          };
        })
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index} className={item?.className}>
            <Badge status={item?.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar
      cellRender={cellRender}
      onSelect={(e) => {
        if (
          e.month() + 1 != calendarFilter.month ||
          e.year() != calendarFilter.year
        ) {
          setCalendarFilter({
            month: e.month() + 1,
            year: e.year(),
          });
        } else {
          console.log(dayjs(e).format("YYYY-MM-DD"));
        }
      }}
    />
  );
};

export default Tablecalendar;
