import React, { useEffect, useState } from "react";
import CommonInput from "../../../components/common/input";
import SelectBox from "../../../components/common/selectbox";
import Datepicker from "../../../components/common/Datepicker";
import "./addemployee.scss";
import CustomButton from "../../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { addemployee } from "../../../shared/employee/actions";
import { getcompanyies } from "../../../shared/company/actions";
import { getProjects } from "../../../shared/projects/actions";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { employeeRoute } from "../../../utils/routeContants";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addEmployeeForm, setaddEmployeeForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: null,
    mobile_number: "",
    work_location: "",
    work_location_valid_till: null,
    employee_code: "",
    project_id: "",
    company_id: "",
  });

  const companyiesData = useSelector((state) => state.company);
  const projectsData = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getcompanyies());
    dispatch(getProjects());
  }, []);


  const handleChange = (field, value) => {
    setaddEmployeeForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "work_location" && { work_location_valid_till: null }),
    }));
  };

  // const handleChange = (field, value) => {
  //   setaddEmployeeForm((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  return (
    <div className="add-employee">
      <h1>Add Employee</h1>
      <div className="add-employee-container">
        <CommonInput
          label="Name"
          placeholder="Enter your Name"
          width="100%"
          value={addEmployeeForm.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <CommonInput
          label="Email"
          placeholder="Enter your Email"
          width="100%"
          value={addEmployeeForm.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <CommonInput
          label="Password"
          type="password"
          placeholder="Enter your Password"
          width="100%"
          value={addEmployeeForm.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <Datepicker
          label="Date Of Birth"
          width="100%"
          value={addEmployeeForm.dob}
          onChange={(value) =>
            handleChange("dob", dayjs(value).format("YYYY-MM-DD"))
          }
        />
        <CommonInput
          label="Phone Number"
          placeholder="Enter your Number"
          width="100%"
          value={addEmployeeForm.mobile_number}
          onChange={(e) => handleChange("mobile_number", e.target.value)}
        />
        <SelectBox
          label="Work Location"
          options={[
            { label: "Home", value: "home" },
            { label: "Office", value: "office" },
          ]}
          width="100%"
          placeholder="Select Location"
          value={addEmployeeForm.work_location}
          onChange={(value) => handleChange("work_location", value)}
        />
        {addEmployeeForm.work_location == "home" && (
          <Datepicker
            label="Valid Date"
            width="100%"
            value={addEmployeeForm.work_location_valid_till}
            onChange={(value) =>
              handleChange(
                "work_location_valid_till",
                dayjs(value).format("YYYY-MM-DD")
              )
            }
          />
        )}
        <CommonInput
          label="Employee Code"
          placeholder="Enter your Code"
          width="100%"
          value={addEmployeeForm.employee_code}
          onChange={(e) => handleChange("employee_code", e.target.value)}
        />
        <SelectBox
          label="Project Id"
          options={projectsData?.projects?.data?.map((item) => ({
            value: item.project_id,
            label: item.project_name,
          }))}
          width="100%"
          placeholder="Select Project"
          value={Number(addEmployeeForm.project_id)}
          onChange={(value) => handleChange("project_id", `${value}`)}
        />
        <SelectBox
          label="Company"
          options={companyiesData?.company?.data?.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          }))}
          width="100%"
          placeholder="Select Company"
          value={addEmployeeForm.company_id}
          onChange={(value) => handleChange("company_id", value)}
        />
        <CustomButton
          width="70px"
          buttonTxt="Create"
          onClick={() => {
            console.log("Form Data:", addEmployeeForm);
            dispatch(
              addemployee(addEmployeeForm, () => navigate(employeeRoute))
            );
          }}
        />
      </div>
    </div>
  );
};

export default AddEmployee;
