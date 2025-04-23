import React from "react";
import { Input } from "antd";
const { TextArea } = Input;
const TextAreainput = ({ value, onChange, placeholder }) => (
  <>
    {/* <TextArea rows={4} />
    <br />
    <br /> */}
    <TextArea
      value={value}
      onChange={onChange}
      rows={4}
      placeholder={placeholder}
    />
  </>
);
export default TextAreainput;
