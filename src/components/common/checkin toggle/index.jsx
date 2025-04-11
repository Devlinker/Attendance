import React from "react";
import "./checkintoggle.scss";

const Checkintoggle = ({ checked, handleChange, disabled }) => {
  return (
    <>
      {/* <div class="button-cover"> */}
      <div class="button r" id="button-2">
        <input
          type="checkbox"
          class="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
        <div class="knobs"></div>
        <div class="layer"></div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Checkintoggle;
