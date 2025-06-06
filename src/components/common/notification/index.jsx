import React, { useMemo } from "react";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification, Space } from "antd";
const Context = React.createContext({ name: "Default" });
const Popupnotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      
        <Button
          type="primary"
          onClick={() => openNotification("topRight")}
          icon={<RadiusUprightOutlined />}
        >
          topRight
        </Button>
    </Context.Provider>
  );
};
export default Popupnotification;
