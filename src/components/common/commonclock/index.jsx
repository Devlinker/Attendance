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
          flexDirection:"column",
          fontSize: "17px",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <div className="clockmenu-date">{formattedDate}</div>
        <div className="clockmenu-time">{formattedTime}</div>
      </div>
    </div>
  );
};

export default CommonClock;
