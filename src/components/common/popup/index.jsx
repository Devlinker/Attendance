import React, { useState } from "react";
import { Button, Modal } from "antd";
import PopupTime from "../popuptime";
const CommonPopup = ({
  isModalOpen,
  title,
  okText,
  handleOk,
  handleCancel,
  children,
}) => {
  return (
    <>
      <Modal
        open={isModalOpen}
        title={title}
        okText={okText}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
        <PopupTime />
      </Modal>
    </>
  );
};
export default CommonPopup;
