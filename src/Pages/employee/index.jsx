// import React, { useEffect, useState } from "react";
// import CustomTable from "../../components/common/customtable";
// import { useDispatch, useSelector } from "react-redux";
// import { employeelist } from "../../shared/employee/actions";
// import { data, useNavigate } from "react-router-dom";
// import "./employee.scss";
// import CustomButton from "../../components/common/custombutton";
// import { Tooltip } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import { MdOutlineLockReset } from "react-icons/md";
// import CommonPopup from "../../components/common/popup";
// import CommonInput from "../../components/common/input";
// import { changepassword } from "../../shared/changepassword/actions";

// const Employee = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const employeeData = useSelector((state) => state.employee);
//   const [showPassChangeModal, setShowPassChangeModal] = useState(false);
//   const [tempSelectedData, setTempSelectedData] = useState({});
//   const [formData, setFormData] = useState({
//     data: {
//       new_password: "",
//       confirm_password: "",
//     },
//     error: {
//       new_password: "",
//       confirm_password: "",
//     },
//   });
//   const validationRules = {
//     new_password: { required: true, minLength: 6 },
//     confirm_password: { required: true, minLength: 6 },
//   };

// const columns = [
//   {
//     dataIndex: "employee_code",
//     key: "employee_code",
//   },
//   {
//     title: "User Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   // {
//   //   title: "User ID",
//   //   dataIndex: "user_id",
//   //   key: "user_id",
//   // },
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "Mobile Number",
//     dataIndex: "mobile_number",
//     key: "mobile_number",
//   },
//   {
//     title: "Action",
//     fixed: "right",
//     render: (record) => (
//       <div className="action-container">
//         <div
//           className="green tdu"
//           style={{
//             cursor: "pointer",
//             fontSize: "16px",
//             display: "flex",
//             flexDirection: "row",
//             gap: "10px",
//           }}
//         >
//           <Tooltip title="Edit">
//             <EditOutlined
//               onClick={() => navigate(`/employee/add-user/${record.user_id}`)}
//             />
//           </Tooltip>
//           <Tooltip title="Reset Password">
//             <MdOutlineLockReset
//               onClick={() => {
//                 setTempSelectedData(record);
//                 setShowPassChangeModal(true);
//               }}
//             />
//           </Tooltip>
//         </div>
//       </div>
//     ),
//   },
// ];

//   useEffect(() => {
//     dispatch(employeelist());
//   }, []);

//   const checkValid = () => {
//     const { data } = formData;
//     let isValid = true;
//     const errors = {};

//     Object.entries(validationRules).forEach(([field, rules]) => {
//       const value = data[field];

//       // Min length
//       if (rules.minLength && value?.length < rules.minLength) {
//         errors[field] = `Minimum ${rules.minLength} characters required`;
//         isValid = false;
//       }
//     });

//     setFormData((prev) => ({
//       ...prev,
//       error: errors,
//     }));

//     return isValid;
//   };

//   const handleChange = (e, key) => {
//     checkValid();
//     setFormData((prev) => ({
//       ...prev,
//       data: {
//         ...prev.data,
//         [key]: e,
//       },
//     }));
//   };

//   return (
//     <>
//       <div className="users-container">
//         <div className="addlist-content">
//           <h2>Admin</h2>
//           <CustomButton
//             width={"70px"}
//             buttonTxt={"Create"}
//             onClick={() => navigate("/employee/add-user")}
//           />
//         </div>
//         <CustomTable
//           columns={columns}
//           data={employeeData?.employeelist?.data}
//           loading={employeeData?.employeeListLoader}
//           callback={() => {}}
//         />
//       </div>
//       {showPassChangeModal ? (
//         <CommonPopup
//           isModalOpen={showPassChangeModal}
//           handleCancel={() => {
//             setShowPassChangeModal(false);
//             setTempSelectedData({});
//             setFormData({
//               data: {
//                 new_password: "",
//                 confirm_password: "",
//               },
//               error: {
//                 new_password: "",
//                 confirm_password: "",
//               },
//             });
//           }}
//           handleOk={() => {
//             if (formData.data.confirm_password != formData.data.new_password) {
//               setFormData((prev) => ({
//                 ...prev,
//                 error: {
//                   ...prev.error,
//                   confirm_password: "Password doesn't match",
//                 },
//               }));
//             } else {
//               dispatch(
//                 changepassword({
//                   user_id: tempSelectedData?.user_id,
//                   new_password: formData.data.new_password,
//                   confirm_password: formData.data.confirm_password,
//                 })
//               );
//               setShowPassChangeModal(false);
//               setTempSelectedData({});
//               setFormData({
//                 data: {
//                   new_password: "",
//                   confirm_password: "",
//                 },
//                 error: {
//                   new_password: "",
//                   confirm_password: "",
//                 },
//               });
//             }
//           }}
//           children={
//             <div>
//               <h2> Change Password </h2>
//               <div>
//                 <CommonInput
//                   label={"New Password"}
//                   type="password"
//                   placeholder={"Enter New Password"}
//                   width={"100%"}
//                   height={"40px"}
//                   error={formData.error.new_password}
//                   errorText={formData.error.new_password}
//                   onChange={(e) => handleChange(e.target.value, "new_password")}
//                 />
//                 <CommonInput
//                   label={"Confirm Password"}
//                   type="password"
//                   placeholder={"Enter Confirm Password"}
//                   width={"100%"}
//                   height={"40px"}
//                   customInputStyles={{ marginTop: "20px" }}
//                   error={formData.error.confirm_password}
//                   errorText={formData.error.confirm_password}
//                   onChange={(e) =>
//                     handleChange(e.target.value, "confirm_password")
//                   }
//                 />
//               </div>
//             </div>
//           }
//         />
//       ) : null}
//     </>
//   );
// };

// export default Employee;

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/common/customtable";
import { useDispatch, useSelector } from "react-redux";
import { employeelist } from "../../shared/employee/actions";
import { useNavigate } from "react-router-dom";
import "./employee.scss";
import CustomButton from "../../components/common/custombutton";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineLockReset } from "react-icons/md";
import CommonPopup from "../../components/common/popup";
import CommonInput from "../../components/common/input";
import { changepassword } from "../../shared/changepassword/actions";
import { HiOutlineEye } from "react-icons/hi";

const Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeData = useSelector((state) => state.employee);
  const [showPassChangeModal, setShowPassChangeModal] = useState(false);
  const [tempSelectedData, setTempSelectedData] = useState({});
  const [formData, setFormData] = useState({
    data: {
      new_password: "",
      confirm_password: "",
    },
    error: {
      new_password: "",
      confirm_password: "",
    },
  });

  const validationRules = {
    new_password: { required: true, minLength: 5 },
    confirm_password: { required: true, minLength: 5 },
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial_no",
      render: (_, __, index) => {
        const currentPage = employeeData?.pagination?.current || 1;
        const pageSize = employeeData?.pagination?.pageSize || 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Employee Code",
      dataIndex: "employee_code",
      key: "employee_code",
      render: (record) => <div>{record || "--"}</div>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
    {
      title: "Action",
      fixed: "right",
      render: (record) => (
        <div className="action-container">
          <div
            className="green tdu"
            style={{
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            <Tooltip title="Edit">
              <EditOutlined
                onClick={() => navigate(`/employee/add-user/${record.user_id}`)}
              />
            </Tooltip>
            <Tooltip title="Reset Password">
              <MdOutlineLockReset
                onClick={() => {
                  setTempSelectedData(record);
                  setShowPassChangeModal(true);
                }}
              />
            </Tooltip>
            <Tooltip title="Active">
              <HiOutlineEye />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      employeelist({
        page: employeeData?.pagination?.current || 1,
        items: employeeData?.pagination?.pageSize || 10,
      })
    );
  }, [employeeData?.pagination?.current, employeeData?.pagination?.pageSize]);

  const checkValid = () => {
    const { data } = formData;
    let isValid = true;
    const errors = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = data[field];
      if (rules.minLength && value?.length < rules.minLength) {
        errors[field] = `Minimum ${rules.minLength} characters required`;
        isValid = false;
      }
    });

    setFormData((prev) => ({
      ...prev,
      error: errors,
    }));

    return isValid;
  };

  const handleChange = (e, key) => {
    checkValid();
    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: e,
      },
    }));
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(
      employeelist({
        page,
        items: pageSize,
      })
    );
  };

  return (
    <>
      <div className="users-container">
        <div className="addlist-content">
          <h2>Admin</h2>
          <CustomButton
            width={"70px"}
            buttonTxt={"Create"}
            onClick={() => navigate("/employee/add-user")}
          />
        </div>
        <CustomTable
          columns={columns}
          data={employeeData?.employeelist || []}
          loading={employeeData?.employeeListLoader}
          callback={() => {}}
          pagination={{
            total: employeeData?.pagination?.total,
            pageSize: employeeData?.pagination?.pageSize,
            current: employeeData?.pagination?.current,
            onChange: handlePageChange,
          }}
        />
      </div>

      {showPassChangeModal && (
        <CommonPopup
          isModalOpen={showPassChangeModal}
          handleCancel={() => {
            setShowPassChangeModal(false);
            setTempSelectedData({});
            setFormData({
              data: {
                new_password: "",
                confirm_password: "",
              },
              error: {
                new_password: "",
                confirm_password: "",
              },
            });
          }}
          handleOk={() => {
            if (formData.data.confirm_password !== formData.data.new_password) {
              setFormData((prev) => ({
                ...prev,
                error: {
                  ...prev.error,
                  confirm_password: "Password doesn't match",
                },
              }));
            } else {
              dispatch(
                changepassword(tempSelectedData?.user_id, {
                  new_password: formData.data.new_password,
                  confirm_password: formData.data.confirm_password,
                })
              );
              setShowPassChangeModal(false);
              setTempSelectedData({});
              setFormData({
                data: {
                  new_password: "",
                  confirm_password: "",
                },
                error: {
                  new_password: "",
                  confirm_password: "",
                },
              });
            }
          }}
        >
          <div>
            <h2> Change Password </h2>
            <CommonInput
              label={"New Password"}
              type="password"
              placeholder={"Enter New Password"}
              width={"100%"}
              height={"40px"}
              error={formData.error.new_password}
              errorText={formData.error.new_password}
              onChange={(e) => handleChange(e.target.value, "new_password")}
            />
            <CommonInput
              label={"Confirm Password"}
              type="password"
              placeholder={"Enter Confirm Password"}
              width={"100%"}
              height={"40px"}
              customInputStyles={{ marginTop: "20px" }}
              error={formData.error.confirm_password}
              errorText={formData.error.confirm_password}
              onChange={(e) => handleChange(e.target.value, "confirm_password")}
            />
          </div>
        </CommonPopup>
      )}
    </>
  );
};

export default Employee;
