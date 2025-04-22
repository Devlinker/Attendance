import React, { useState } from "react";
import { Button, Modal } from "antd";
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
      </Modal>
    </>
  );
};
export default CommonPopup;
