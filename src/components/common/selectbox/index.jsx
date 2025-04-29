import React from "react";
import { Select } from "antd";
import "./selectbox.scss";
const SelectBox = ({
  label,
  error,
  errorText,
  options,
  value,
  onChange,
  placeholder,
  className = "",
  width = "100%",
  height = "40px",
}) => (
  <div className={`selectbox-container ${className}`}>
    <div className="label">{label}</div>
    <Select
      style={{ width, height }}
      placeholder={'select' ||placeholder}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
    />
    {error && errorText && <p className="error">{errorText}</p>}
  </div>
);
export default SelectBox;
