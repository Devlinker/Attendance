import React from "react";
import { DatePicker, Space } from "antd";
import "./datepicker.scss";
const Datepicker = ({
  onChange,
  label,
  error,
  width = "100%",
  height = "40px",
}) => (
  <div className="datepicker-container">
    <div className="label">{label}</div>
    <DatePicker
      style={{ width, height }}
      format={{
        format: "DD-MM-YYYY",
        type: "mask",
      }}
      onChange={onChange}
    />
    {error && <p className="errorDate">Date is Required</p>}
  </div>
);
export default Datepicker;

// display: block;
//     margin-bottom: 0.5rem;
//     margin-right: 0px;
//     font-weight: bold;
//     width: auto;