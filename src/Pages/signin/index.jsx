import React, { useEffect } from "react";
import "./style.scss";
import SignInCard from "../../components/SignInCard";
import { useDispatch, useSelector } from "react-redux";
import { getTutor } from "../../shared/userlist";
// import { Link } from "react-router-dom"

const Signin = () => {
  // const data = useSelector((state) => {
  //   console.log(state);
  // });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTutor({ page: 1, items: 10 }));
  // }, []);

  return (
    <>
      <header>
        {/* <div className="logo">
          <img src="https://www.cartoonmango.com/cm-logo.gif" alt="logo" />
          </div> */}
        <div className="containerleft">
          <h1 className="leftcontent">
            Welcome to
            <br /> <strong>Your Secure Signin</strong>
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
