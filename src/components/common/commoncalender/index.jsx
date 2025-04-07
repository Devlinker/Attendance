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
          const [hours, minutes, seconds] = (timeStr || "00:00:00")?.split(":");
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
