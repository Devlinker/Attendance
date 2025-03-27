import React, { useState, useEffect } from "react";
// import "./Menubar.css";

const CommonClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="Menubar">
      <ul className="Menubar-menu">
      <div>
        {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
      </div>

      </ul>
    </div>
  );
};

export default CommonClock;
