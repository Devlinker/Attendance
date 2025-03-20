import React from "react";
import "./style.scss";
import SignInCard from "../../components/SignInCard";
// import { Link } from "react-router-dom"

const Signin = () => {
  return (
    <>
      <header>
      {/* <div className="logo">
          <img src="https://www.cartoonmango.com/cm-logo.gif" alt="logo" />
          </div> */}
        <div className="containerleft">
          <h1 className="leftcontent">
            Impressive <br /> <strong>React Login Page</strong>
            <br />
            Template
          </h1>
          <div className="containerright">
            <SignInCard />
          </div>
        </div>
      </header>
    </>
  );
};

export default Signin;
