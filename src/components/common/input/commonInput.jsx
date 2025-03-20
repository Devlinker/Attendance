import React from "react";
import "./input.scss";
import { Input, InputNumber } from "antd";

const CommonInput = ({
  label,
  type = "text",
  width = "100%",
  height = "40px",
  ...rest
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          {label}
        </label>
      )}
      {type === "password" ? (
        <Input.Password style={{ width, height }} {...rest} />
      ) : type === "number" ? (
        <InputNumber
          style={{ width, height }}
          keyboard={false}
          step={0}
          {...rest}
        />
      ) : (
        <Input style={{ width, height }} {...rest} />
      )}
    </div>
  );
};

export default CommonInput;
