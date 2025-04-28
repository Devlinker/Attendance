import React from "react";
import { DatePicker } from "antd";
import "./datepicker.scss";

const Datepicker = ({
  onChange,
  label,
  value,
  error,
  width = "100%",
  height = "40px",
  onlyAllowFutureDates = false, // ➡️ new prop added
}) => {
  // ➡️ function to disable past dates if onlyAllowFutureDates is true
  const disabledDate = (current) => {
    if (!onlyAllowFutureDates) {
      return false;
    }
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="datepicker-container">
      <div className="label">{label}</div>
      <DatePicker
        style={{ width, height }}
        format={{
          format: "DD-MM-YYYY",
          type: "mask",
        }}
        onChange={onChange}
        value={value}
        disabledDate={disabledDate} // ➡️ passing disabledDate
      />
      {error && <p className="errorDate">Date is Required</p>}
    </div>
  );
};

export default Datepicker;
