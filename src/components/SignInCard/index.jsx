import React from "react";
import "./signincard.scss";
import CommonInput from "../../components/common/input/commonInput";
import Commoncheckbox from "../../components/common/checkbox/commoncheckbox";
import { loginAdmin } from "../../shared/apirepo/signinapi";
import CustomButton from "../common/button";
import { useNavigate } from "react-router-dom";
// import Logo from '../../img/logoipsum.svg';

const SignInCard = () => {
  let navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  
  return (
    <div className="login-container">
      <div className="login-card">
        {/* <div className="logo">
          <img src="https://www.cartoonmango.com/cm-logo.gif" alt="logo" />
        </div> */}
        {/* <h2>Welcome to Cartoon Mango! 👋</h2> */}
        {/* <p>Please sign in to your account and start the adventure</p> */}
        <form className="login-form">
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
          <div className="options">
            <Commoncheckbox />
            <a>Forgot Password?</a>
          </div>
          <CustomButton
            className={"test"}
            onClick={() => loginAdmin()}
            buttonTxt={"Sign In"}
          />
          <span className="signup-text">
            New on our platform?{" "}
            <span onClick={() => navigate("/signup")}>Create an account</span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignInCard;
