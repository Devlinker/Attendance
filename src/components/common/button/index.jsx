import React from "react";
import "./button.scss";
import { Button, Flex } from "antd";
const CustomButton = ({
  onClick,
  className,
  width,
  children,
  type = "primary",
  buttonTxt,
  disabled,
  rightIcon,
}) => (
  <div
    className={`${className} ${type}`}
    style={{
      width: width || "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {buttonTxt || children ? (
      <Button disabled={disabled} type={type} block onClick={onClick}>
        {buttonTxt || children}
      </Button>
    ) : null}
    {rightIcon && rightIcon}
  </div>
);
export default CustomButton;
