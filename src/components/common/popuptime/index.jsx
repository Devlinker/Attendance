import React from "react";
import { TimePicker, Form } from "antd";

const onChange = (time, timeString) => {
  console.log("Selected Time: ", timeString);
};

const PopupTime = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Check-in Time" style={{ width: "100%" }}>
        <TimePicker
          style={{ width: "100%" }}
          use12Hours
          format="h:mm A"
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item label="Check-out Time" style={{ width: "100%" }}>
        <TimePicker
          style={{ width: "100%" }}
          use12Hours
          format="h:mm A"
          onChange={onChange}
        />
      </Form.Item>
    </Form>
  );
};

export default PopupTime;
