import React from "react";
import "./checkintoggle.scss";

const Checkintoggle = ({ checked, handleChange, disabled }) => {
  return (
    <>
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
    </>
  );
};

export default Checkintoggle;
