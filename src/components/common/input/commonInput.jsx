// import React from "react";
import "./input.scss";
import { Input, InputNumber } from "antd";

const CommonInput = ({
  label,
  type = "text",
  width = "100%",
  height = "40px",
  labelPosition = "above", // "above", "below", "side"
  ...rest
}) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
        display: labelPosition === "side" ? "flex" : "block",
        alignItems: labelPosition === "side" ? "center" : "unset",
      }}
    >
      {label && labelPosition !== "below" && (
        <label
          style={{
            display: labelPosition === "side" ? "inline-block" : "block",
            marginBottom: labelPosition === "above" ? "0.5rem" : "0",
            marginRight: labelPosition === "side" ? "0.5rem" : "0",
            fontWeight: "bold",
            width: labelPosition === "side" ? "100px" : "auto", 
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

      {label && labelPosition === "below" && (
        <label
          style={{
            display: "block",
            marginTop: "0.5rem",
            fontWeight: "bold",
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CommonInput;
