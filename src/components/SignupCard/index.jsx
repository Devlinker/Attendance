import React, { useState } from "react";
import CommonInput from "../../components/common/input/commonInput";
import Commoncheckbox from "../../components/common/checkbox/commoncheckbox";
import { loginAdmin } from "../../shared/apirepo/signinapi";
import CustomButton from "../../components/common/button";
// import { FaLock } from "react-icons/fa";
import DatePicker from "../../components/common/Datepicker";
import { signupAdmin } from "../../shared/apirepo/signupapi";
import { useNavigate } from "react-router-dom";
import { Signup } from "../../shared/signup/actions";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
// import Logo from '../../img/logoipsum.svg';

const Signupcard = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.Signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [disable, setDisable] = useState("");
  const [err, setErr] = useState({ email: false, pass: false });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignup = () => {
    let hasError = false;
    if (name === "" || name === null) {
      setErr((prevErr) => ({ ...prevErr, pass: true }));
      hasError = true;
    }
    if (email === "" || email === null || !emailRegex.test(email)) {
      setErr((prevErr) => ({ ...prevErr, email: true }));
      hasError = true;
      if (password === "" || password === null) {
        setErr((prevErr) => ({ ...prevErr, pass: true }));
        hasError = true;
      }
      if (dob === "" || dob === null) {
        setErr((prevErr) => ({ ...prevErr, pass: true }));
        hasError = true;
      }
      if (number === "" || number === null) {
        setErr((prevErr) => ({ ...prevErr, pass: true }));
        hasError = true;
      }
    }
    if (!hasError) {
      setDisable(true);
      dispatch(
        Signup({ name, email, password, dob, mobile_number: `${number}` })
      );
    }
  };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            // error={err.pass ? !!(name === "" || name === null) : false}
            // customInputStyles={{ marginBottom: 20 }}
            // errorText="Enter a valid Name"
          />
          <CommonInput
            label="Email"
            placeholder="Enter your Email"
            width="100%"
            height="40px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // error={
            //   err.email
            //     ? !!(email === "" || email === null || !emailRegex.test(email))
            //     : false
            // }
            // errorText={
            //   email === "" || email === null
            //     ? "Email address is required"
            //     : !emailRegex.test(email)
            //     ? "Enter a valid email address"
            //     : ""
            // }
          />
          <CommonInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            width="100%"
            height="40px"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // error={err.pass ? !!(password === "" || password === null) : false}
            // customInputStyles={{ marginBottom: 20 }}
            // errorText="Enter a valid password"
          />
          <span style={{ fontWeight: "bold" }}>Date of Birth</span>
          <DatePicker onChange={(e) => setDob(dayjs(e).format("YYYY-MM-DD"))} />
          <CommonInput
            label="Number"
            type="number"
            placeholder="Enter your Number"
            width="100%"
            height="40px"
            value={number}
            onChange={(e) => setNumber(e)}
            error={err.pass ? !!(password === "" || password === null) : false}
            customInputStyles={{ marginBottom: 20 }}
            errorText="Enter a valid Number"
          />
          <div className="options">
            <Commoncheckbox />
          </div>
          <CustomButton
            className={"test"}
            // onClick={() => signupAdmin()}
            buttonTxt={"Sign Up"}
            onClick={handleSignup}
            disable={false}
          />
          <span className="signup-text">
            New on our platform?{" "}
            <span className="" onClick={() => navigate("/signin")}>
              Already have an account?
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signupcard;
