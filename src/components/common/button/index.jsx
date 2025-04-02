import React from "react";
import { Button, Flex } from "antd";
const CustomButton = ({
  onClick,
  className,
  width,
  children,
  type = "primary",
  buttonTxt,
  disabled,
}) => (
  <div
    className={`${className} `}
    style={{
      width: width || "100%",
    }}
  >
    <Button disabled={disabled} type={type} block onClick={onClick}>
      {buttonTxt || children}
    </Button>
  </div>
);
export default CustomButton;
