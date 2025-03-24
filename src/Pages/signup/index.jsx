import React from "react";
import Signupcard from "../../components/SignupCard";
import { useDispatch } from "react-redux";
// import Logo from '../../img/logoipsum.svg';

const Signup = () => {
  const dispatch = useDispatch();
  return (
    <header className="containerleft">
      <h1 className="leftcontent">
        Welcome to
        <br /> <strong>Your Secure Signup</strong>
      </h1>
      <div className="containerright">
        <Signupcard />
      </div>
    </header>
  );
};

export default Signup;
