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
      <div>
        {now.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          weekday: "long",
        })}
      </div>
      <div>
        {now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
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
