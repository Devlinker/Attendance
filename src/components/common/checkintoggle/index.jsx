import React from "react";
import "./checkintoggle.scss";
import { Spin } from "antd";

const Checkintoggle = ({ checked, handleChange, loading, disabled }) => {
  return (
    <>
      <Spin spinning={loading} size="small" className="spin">
        <div className="button r" id="button-2">
          <input
            type="checkbox"
            className="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
          />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
      </Spin>
    </>
  );
};

export default Checkintoggle;
