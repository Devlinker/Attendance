import React, { use, useEffect, useState } from "react";
import "./signincard.scss";
import CommonInput from "../../components/common/input/commonInput";
import Commoncheckbox from "../../components/common/checkbox/commoncheckbox";
import CustomButton from "../common/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../shared/login/actions";
// import Logo from '../../img/logoipsum.svg';

const SignInCard = () => {
  let navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.login);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [disable, setDisable] = useState("");
  const [err, setErr] = useState({ email: false, pass: false });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = () => {
    let hasError = false;
    if (email === "" || email === null || !emailRegex.test(email)) {
      setErr((prevErr) => ({ ...prevErr, email: true }));
      hasError = true;
      if (password === "" || password === null) {
        setErr((prevErr) => ({ ...prevErr, pass: true }));
        hasError = true;
      }
    }
    if (!hasError) {
      setDisable(true);
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* <div className="logo">
          <img src="https://www.cartoonmango.com/cm-logo.gif" alt="logo" />
        </div> */}
        {/* <h2>Welcome to Cartoon Mango! 👋</h2> */}
        <h2>Login</h2>
        <form className="login-form">
          <CommonInput
            label="Email"
            placeholder="Enter your Email"
            width="100%"
            height="40px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              err.email
                ? !!(email === "" || email === null || !emailRegex.test(email))
                : false
            }
            errorText={
              email === "" || email === null
                ? "Email address is required"
                : !emailRegex.test(email)
                ? "Enter a valid email address"
                : ""
            }
          />
          <CommonInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            width="100%"
            height="40px"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={err.pass ? !!(password === "" || password === null) : false}
            customInputStyles={{ marginBottom: 20 }}
            errorText="Enter a valid password"
          />
          <div className="options">
            <Commoncheckbox />
            <a>Forgot Password?</a>
          </div>
          <CustomButton
            className={"test"}
            // onClick={() => loginAdmin()}
            buttonTxt={"Sign In"}
            onClick={handleLogin}
            disabled={false}
          />
          {/* <span className="signup-text"> */}
            {/* New on our platform?{" "} */}
            {/* <span onClick={() => navigate("/signup")} className="createaccount">Create an account </span> */}
          {/* </span> */}
        </form>
      </div>
    </div>
  );
};

export default SignInCard;
