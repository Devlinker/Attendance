import React, { useEffect } from "react";
import { Badge, Calendar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCalender } from "../../../shared/calendar/actions";

const Tablecalendar = () => {
  const calendardata = useSelector((state) => state.calender);
  const response = calendardata?.calender?.data || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalender());
  }, []);

  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const filteredData = response?.filter(
      (item) => item?.calendar_date === dateStr
    );

    return filteredData
      .filter((item) => new Date(item.calendar_date) <= new Date())
      .map((item) => {
        const formatTimeFromGMT = (timeStr) => {
          const [hours, minutes, seconds] = timeStr.split(":");
          // Construct date as UTC
          const date = new Date(
            Date.UTC(1970, 0, 1, +hours, +minutes, +seconds || 0)
          );
          // Format in IST
          return date.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        };

        return {
          type: item.checked_in_time ? "success" : "warning",
          content: item.checked_in_time
            ? `(${formatTimeFromGMT(
                item.checked_in_time
              )} - ${formatTimeFromGMT(item.checked_out_time)}) - ${
                item.working_hours
              }`
            : "Absent",
        };
      });
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default Tablecalendar;

// import React from "react";
// import { Badge, Calendar } from "antd";

// // import './commoncalender.scss'
// const response = [
//   {
//     attendance_status: "absent",
//     calendar_date: "2025-04-01",
//     checked_in_time: null,
//     checked_out_time: null,
//     working_hours: "0 hrs 0 mins",
//   },
//   {
//     attendance_status: "absent",
//     calendar_date: "2025-04-02",
//     checked_in_time: null,
//     checked_out_time: null,
//     working_hours: "0 hrs 0 mins",
//   },
//   {
//     attendance_status: "present",
//     calendar_date: "2025-04-03",
//     checked_in_time: "05:37:56",
//     checked_out_time: "05:38:35",
//     working_hours: "0 hrs 0 mins",
//   },
// ];
// const getListData = (value) => {
//   let listData = [];
//   function generateListContent(res) {
//     console.log(res);
//     return res.map((item) => ({
//       type: item.checked_in_time ? "success" : "warning",
//       content: item.checked_in_time
//         ? `${item.checked_in_time} (Check-in) - ${item.checked_out_time} (Check-out) - ${item.working_hours}`
//         : "This is a warning event.",
//     }));
//   }
//   listData = generateListContent()
//   return listData || [];
// };
// const getMonthData = (value) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };

// const Tablecalendar = () => {
//   const monthCellRender = (value) => {
//     const num = getMonthData(value);
//     return num ? (
//       <div className="notes-month">
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null;
//   };

//   const dateCellRender = (value) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge status={item.type} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };
//   const cellRender = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     if (info.type === "month") return monthCellRender(current);
//     return info.originNode;
//   };
//   return <Calendar cellRender={cellRender} />;
// };
// export default Tablecalendar;
