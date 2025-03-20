import React from "react";
import Signupcard from "../../components/SignupCard";
// import Logo from '../../img/logoipsum.svg';

const Signup = () => {
  return (
    <header className="containerleft">
      <h1 className="leftcontent">
        Impressive <br /> <strong>React Login Page</strong>
        <br />
        Template
      </h1>
      <div className="containerright">
      <Signupcard/>
      </div>
    </header>
  );
};

export default Signup;
