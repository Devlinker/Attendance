import React, { useEffect, useState } from "react";
import CustomTable from "../../components/common/customtable";
import { useDispatch, useSelector } from "react-redux";
import { employeelist } from "../../shared/employee/actions";
import { data, useNavigate } from "react-router-dom";
import "./employee.scss";
import CustomButton from "../../components/common/custombutton";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineLockReset } from "react-icons/md";
import CommonPopup from "../../components/common/popup";
import CommonInput from "../../components/common/input";

const Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeData = useSelector((state) => state.employee);
  const [showPassChangeModal, setShowPassChangeModal] = useState(false);

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "employee_code",
      key: "employee_code",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "User ID",
    //   dataIndex: "user_id",
    //   key: "user_id",
    // },
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
              gap: "10px",
            }}
          >
            <Tooltip title="Edit">
              <EditOutlined
                onClick={() => navigate(`/employee/add-user/${record.user_id}`)}
              />
            </Tooltip>
            <Tooltip title="Reset Password">
              <MdOutlineLockReset
                onClick={() => setShowPassChangeModal(true)}
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(employeelist());
  }, []);

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
          data={employeeData?.employeelist?.data}
          loading={employeeData?.employeeListLoader}
          callback={() => {}}
        />
      </div>
      {showPassChangeModal ? (
        <CommonPopup
          isModalOpen={showPassChangeModal}
          handleCancel={() => {
            setShowPassChangeModal(false);
          }}
          handleOk={() => {
            setShowPassChangeModal(false);
          }}
          children={
            <div>
              <h2> Change Password </h2>
              <div>
                <CommonInput
                label={"New Password"}
                type="password"
                placeholder={"Enter New Password"}
                width={"100%"}
                height={"40px"}
                 />
                 <CommonInput
                label={"Confirm Password"}
                type="password"
                placeholder={"Enter Confirm Password"}
                width={"100%"}
                height={"40px"}
                customInputStyles={{ marginTop: "20px" }}
                  />
              </div>
            </div>
          }
        />
      ) : null}
    </>
  );
};

export default Employee;
