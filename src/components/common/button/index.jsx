import React from "react";
import { Button, Flex } from "antd";
const CustomButton = ({ onClick, className,width, children,type= "primary", buttonTxt}) => (
  <div
    className={`${className} `}
    style={{
      width: width || "100%",
    }}
  >
    <Button type={type} block onClick={onClick}>
      {buttonTxt || children}
    </Button>
  </div>
);
export default CustomButton;
