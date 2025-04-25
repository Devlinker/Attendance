import React from "react";
import { Select, Space } from "antd";
import "./selectbox.scss";
const SelectBox = ({
  label,
  error,
  errorText,
  options,
  value,
  onChange,
  placeholder,
  width = "100%",
  height = "40px",
}) => (
  <div className="selectbox-container">
    <div className="label">{label}</div>
    <Select
      style={{ width, height }}
      placeholder={placeholder}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
    />
    {/* <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      disabled
      options={[{ value: "lucy", label: "Lucy" }]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      loading
      options={[{ value: "lucy", label: "Lucy" }]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      allowClear
      options={[{ value: "lucy", label: "Lucy" }]}
      placeholder="select it"
    /> */}
    {error && errorText && <p className="error">{errorText}</p>}
  </div>
);
export default SelectBox;
