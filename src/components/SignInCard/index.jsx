// import React, { useEffect, useState } from "react";
// import "./signincard.scss";
// import Commoncheckbox from "../../components/common/checkbox/commoncheckbox";
// import CustomButton from "../common/custombutton";
// import CommonInput from "../common/input";

// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../shared/login/actions";
// import { dashboardRoute } from "../../utils/routeContants";

// const SignInCard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { isAuthenticated, error } = useSelector((state) => state.login);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [disable, setDisable] = useState(false);
//   const [err, setErr] = useState({ email: false, pass: false });

//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
//   // At least 6 characters, one letter and one number

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(dashboardRoute, { replace: true });
//     }
//   }, [isAuthenticated]);

//   const handleLogin = () => {
//     const isEmailValid = emailRegex.test(email);
//     // const isPasswordValid = passwordRegex.test(password);

//     setErr({
//       email: !isEmailValid,
//       // pass: !isPasswordValid,
//     });

//     if (isEmailValid ) {
//       setDisable(true);
//       dispatch(login({ email, password }));
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>
//         <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//           <CommonInput
//             label="Email"
//             placeholder="Enter your Email"
//             width="100%"
//             height="40px"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             error={err.email}
//             errorText={
//               email === "" || email === null
//                 ? "Email is required"
//                 : !emailRegex.test(email)
//                 ? "Enter a valid email address"
//                 : ""
//             }
//           />

//           <CommonInput
//             label="Password"
//             type="password"
//             placeholder="Enter your password"
//             width="100%"
//             height="40px"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={err.pass}
//             customInputStyles={{ marginBottom: 20 }}
//             errorText={
//               password === null || password === "" ? "Password is required" : ""
//             }
//           />

//           <div className="options">
//             <Commoncheckbox />
//             <a>Forgot Password?</a>
//           </div>

//           <CustomButton
//             className="test"
//             buttonTxt="Sign In"
//             onClick={handleLogin}
//             disabled={disable}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInCard;


import React, { useEffect, useState } from "react";
import "./signincard.scss";
import Commoncheckbox from "../../components/common/checkbox/commoncheckbox";
import CustomButton from "../common/custombutton";
import CommonInput from "../common/input";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../shared/login/actions";
import { dashboardRoute } from "../../utils/routeContants";

const SignInCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error } = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [err, setErr] = useState({ email: false, pass: false });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(dashboardRoute, { replace: true });
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    const isEmailValid = emailRegex.test(email);

    setErr({
      email: !isEmailValid,
      pass: password === "" || password === null,
    });

    if (isEmailValid && password !== "") {
      setDisable(true);
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <CommonInput
            label="Email"
            placeholder="Enter your Email"
            width="100%"
            height="40px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={err.email}
            errorText={
              email === "" || email === null
                ? "Email is required"
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
            error={err.pass}
            customInputStyles={{ marginBottom: 20 }}
            errorText={
              password === "" || password === null ? "Password is required" : ""
            }
          />

          <div className="options">
            <Commoncheckbox />
            <a>Forgot Password?</a>
          </div>

          <CustomButton
            className="test"
            buttonTxt="Sign In"
            onClick={handleLogin}
            disabled={disable}
          />
        </form>
      </div>
    </div>
  );
};

export default SignInCard;
