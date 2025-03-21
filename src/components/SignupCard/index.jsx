import React from "react";
import CommonInput from "../../components/common/input/commonInput";
import Commoncheckbox from "../../components/common/checkbox/commoncheckbox";
import { loginAdmin } from "../../shared/apirepo/signinapi";
import CustomButton from "../../components/common/button";
// import { FaLock } from "react-icons/fa";
import DatePicker from "../../components/common/Datepicker";
import { signupAdmin } from "../../shared/apirepo/signupapi";
import { useNavigate } from "react-router-dom";
// import Logo from '../../img/logoipsum.svg';

const Signupcard = () => {
  let navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-card">
        {/* <div className="logo">
          <img src="https://www.cartoonmango.com/cm-logo.gif" alt="logo" />
        </div>
        <h2>Welcome to Cartoon Mango! 👋</h2> */}
        <form className="login-form">
          <CommonInput
            label="Name"
            type="text"
            placeholder="Enter your Name"
            width="100%"
            height="40px"
          />
          <CommonInput
            label="Email"
            placeholder="Enter your Email"
            width="100%"
            height="40px"
          />
          <CommonInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            width="100%"
            height="40px"
          />
          <span style={{ fontWeight: "bold" }}>Date of Birth</span>
          <DatePicker />
          <CommonInput
            label="Number"
            type="number"
            placeholder="Enter your Number"
            width="100%"
            height="40px"
          />
          <div className="options">
            <Commoncheckbox />
          </div>
          <CustomButton
            className={"test"}
            onClick={() => signupAdmin()}
            buttonTxt={"Sign Up"}
          />
            <span className="signup-text">
            New on our platform?{" "}
            <span className="" onClick={() => navigate("/signin")}>Already have an account?</span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signupcard;
