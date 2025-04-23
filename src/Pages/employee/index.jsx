import React, { useEffect } from "react";
import CustomTable from "../../components/common/customtable";
import { useDispatch, useSelector } from "react-redux";
import { employeelist } from "../../shared/employee/actions";
import { data, useNavigate } from "react-router-dom";
import "./employee.scss";
import CustomButton from "../../components/common/custombutton";

const Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeData = useSelector((state) => state.employee);
  console.log(employeeData?.employeelist?.data, "test");

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
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
            buttonTxt={"Add"}
            onClick={() => navigate("/employee/add-user")}
            // className={}
          />
        </div>
        <CustomTable
          columns={columns}
          data={employeeData?.employeelist?.data}
        />
      </div>
    </>
  );
};

export default Employee;
