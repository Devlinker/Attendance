import React from "react";
import { Badge, Calendar, ConfigProvider } from "antd";
import "./tablecalendar.scss";
import moment from "moment-timezone";
import enGb from "antd/locale/en_GB";
import dayjs from "dayjs";

const Tablecalendar = ({
  calendardata,
  calendarFilter,
  setCalendarFilter,
  handleDateClick,
}) => {
  const response = calendardata?.calender?.data || [];

  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const todayStr = new Date().toISOString().split("T")[0];

    const filteredData = response?.filter(
      (item) => item?.calendar_date === dateStr
    );

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
            "Mandatory Holiday": "purple",
            "Restricted Holiday": "black",
            Weekend: "orange",
            "Weekend Holiday": "blue",
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
            content: item.checked_in_time ? (
              <>
                <div className="calendar-checkinout-ui">
                  {formatTimeFromGMT(item.checked_in_time)}-
                  {formatTimeFromGMT(item.checked_out_time)}
                </div>
                <div className="calendar-ph"> PH : {item.working_hours}</div>
              </>
            ) : itemDate.isSame(today, "day") ? (
              "Yet To Checkin"
            ) : (
              "Absent"
            ),
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

  const validateDateClick = (e) => {
    handleDateClick(e);
  };

  return (
    <ConfigProvider locale={enGb}>
      <Calendar
        cellRender={cellRender}
        disabledDate={(current) => {
          const today = dayjs();
          const firstDayOfMonth = today.clone().startOf("month");
          const lastDayOfMonth = today.clone().endOf("month");
          return (
            current.isBefore(firstDayOfMonth, "day") ||
            current.isAfter(lastDayOfMonth, "day")
          );
        }}
        onSelect={(e) => {
          const today = dayjs();
          const yesterday = today.clone().subtract(1, "day");
          const firstDayOfMonth = today.clone().startOf("month");
          const selectedDate = e.clone().startOf("day");

          if (
            e.month() + 1 !== calendarFilter.month ||
            e.year() !== calendarFilter.year
          ) {
            setCalendarFilter({
              month: e.month() + 1,
              year: e.year(),
            });
          } else {
            if (
              (selectedDate.isAfter(firstDayOfMonth, "day") ||
                selectedDate.isSame(firstDayOfMonth, "day")) &&
              selectedDate.isBefore(today, "day")
            ) {
              validateDateClick(e);
            } else {
              // do nothing
            }
          }
        }}
      />
    </ConfigProvider>
  );
};

export default Tablecalendar;
