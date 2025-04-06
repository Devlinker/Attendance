import React, { useState, useEffect } from "react";
import "./commonclock.scss";

const CommonClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clockmenu">
      {/* <div>
        {now.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          weekday: "long",
        })}
      </div> */}
      {/* <div>
        {now
          .toLocaleDateString("en-GB", {
            weekday:"long",
            day: "2-digit",
            month: "2-digit",
            // year: "numeric",
          })
          .replace(/\//g, "-")}
      </div> */}

      {/* <div>
        {now
          .toLocaleDateString("en-GB", {
            weekday: "short", // "Mon", "Tue", "Wed"
            day: "2-digit",
            month: "short", // "Jan", "Feb", "Mar"
          })
          .replace(/ (\d{2}) (\w{3})/, " $1-$2")}{" "} */}
      {/* Adds "-" only between day and month */}
      {/* </div> */}

      {/* <div>
        {now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </div> */}

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span>
          {now
            .toLocaleDateString("en-GB", {
              weekday: "short", // "Mon", "Tue", "Wed"
              day: "2-digit",
              month: "short", // "Jan", "Feb", "Mar"
            })
            .replace(/ (\d{2}) (\w{3})/, " $1-$2")}
        </span>

        <span>
          {now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default CommonClock;
// import { DatePicker, Space } from 'antd';
// import dayjs from 'dayjs';
// import { useState } from 'react';

// const CommonClock = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   const onChange = (date, dateString) => {
//     setSelectedDate(date);
//     console.log(date, dateString);
//   };

//   return (
//     <Space direction="vertical">
//       <DatePicker
//         value={selectedDate}
//         showTime
//         format="DD-MM-YYYY HH:mm:ss"
//         onChange={onChange}
//       />
//     </Space>
//   );
// };

// export default CommonClock;
