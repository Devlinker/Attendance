// import React, { useState } from "react";
// import CommonInput from "../../components/common/input/commonInput";
// import CustomButton from "../../components/common/button";
// // import { FaLock } from "react-icons/fa";
// import DatePicker from "../../components/common/Datepicker";
// import { useNavigate } from "react-router-dom";
// import { Signup } from "../../shared/signup/actions";
// import { useDispatch, useSelector } from "react-redux";
// import dayjs from "dayjs";
// import Datepicker from "../../components/common/Datepicker";
// import { ArrowRightOutlined } from "@ant-design/icons";
// // import Logo from '../../img/logoipsum.svg';

// const Signupcard = () => {
//   let navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { error } = useSelector((state) => state.Signup);
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const [formError, setFormError] = useState({
//     name: "",
//     email: "",
//     password: "",
//     dob: "",
//     mobile_number: "",
//   });
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     dob: "",
//     mobile_number: "",
//     company_id: "1",
//   });
//   const text_fields = [
//     {
//       key: "name",
//       type: "textfield",
//       label: "Name",
//       placeholder: "Enter you Name",
//       width: "100%",
//       hieght: "40px",
//     },
//     {
//       key: "email",
//       type: "textfield",
//       label: "Email",
//       placeholder: "Enter you Email",
//       width: "100%",
//       hieght: "40px",
//     },
//     {
//       key: "password",
//       type: "textfield",
//       label: "Password",
//       placeholder: "Enter you Password",
//       width: "100%",
//       hieght: "40px",
//     },
//     {
//       key: "dob",
//       type: "datepicker",
//       label: "Dob",
//       placeholder: "Select Dob",
//       width: "100%",
//       hieght: "40px",
//     },
//     {
//       key: "mobile_number",
//       type: "textfield",
//       label: "Number",
//       placeholder: "Enter you Number",
//       width: "100%",
//       hieght: "40px",
//     },
//   ];

//   const handleOnChange = (key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const checkValidation = () => {
//     let errors = {};
//     let isValid = true;

//     // Check if fields are empty
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key].trim()) {
//         errors[key] = `${
//           key.charAt(0).toUpperCase() + key.slice(1)
//         } is required`;
//         isValid = false;
//       }
//     });

//     // Email validation
//     if (formData.email && !emailRegex.test(formData.email)) {
//       errors.email = "Invalid email format";
//       isValid = false;
//     }

//     setFormError(errors);

//     return !isValid;
//   };

//   const handleSignup = () => {
//     let hasError = checkValidation();
//     console.log(hasError, "test", formError);
//     if (!hasError) {
//       console.log(formData);
//       dispatch(
//         Signup(formData, () => {
//           navigate("/signin");
//         })
//       );
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <form className="login-form">
//           {text_fields.map((field) => {
//             if (field.type === "textfield") {
//               return (
//                 <>
//                   <CommonInput
//                     label={field.label}
//                     type="text"
//                     placeholder={field.placeholder}
//                     width={field.width}
//                     height={field.hieght}
//                     value={formData[field.key]}
//                     error={formError[field.key]}
//                     onChange={(e) => handleOnChange(field.key, e.target.value)}
//                   />
//                 </>
//               );
//             }
//             if (field.type === "datepicker") {
//               return (
//                 <>
//                   <span style={{ fontWeight: "bold" }}>{field.label}</span>
//                   <Datepicker
//                     onChange={(e) =>
//                       setFormData((preState) => {
//                         return {
//                           ...preState,
//                           dob: dayjs(e).format("YYYY-MM-DD"),
//                         };
//                       })
//                     }
//                     error={error?.dob}
//                   />
//                 </>
//               );
//             }
//           })}
//           <CustomButton
//             className={"test"}
//             buttonTxt={"Sign Up"}
//             onClick={handleSignup}
//             disable={false}
//           />
//           <span className="signup-text">
//             Already have an account?{" "}
//             <span className="" onClick={() => navigate("/signin")}>
//               Signin <ArrowRightOutlined />
//             </span>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signupcard;
