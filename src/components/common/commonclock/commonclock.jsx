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

  const formattedDate = now
    .toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
    .replace(/ (\d{2}) (\w{3})/, " $1-$2");

  const formattedTime = now
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(/am|pm/i, (match) => match.toUpperCase());

  return (
    <div className="clockmenu">
      <div
        style={{
          display: "flex",
          fontSize: "17px",
          gap: "3px",
          alignItems: "center",
        }}
      >
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
    </div>
  );
};

export default CommonClock;

// import React, { useState, useEffect } from "react";
// import "./commonclock.scss";

// const CommonClock = () => {
//   const [now, setNow] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setNow(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="clockmenu">
//       <div
//         style={{
//           display: "flex",
//           fontSize: "17px",
//           // flexDirection: "column",
//           gap: "3px",
//           alignItems: "center",
//         }}
//       >
//         <span>
//           {now
//             .toLocaleDateString("en-GB", {
//               weekday: "short", // "Mon", "Tue", "Wed"
//               day: "2-digit",
//               month: "short",
//               // year: "numeric", // "Jan", "Feb", "Mar"
//             })
//             .replace(/ (\d{2}) (\w{3})/ , " $1-$2")}
//         </span>
//         <span>
//           {now.toLocaleTimeString("en-IN", {
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//             hour12: true,
//           })}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CommonClock;
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
