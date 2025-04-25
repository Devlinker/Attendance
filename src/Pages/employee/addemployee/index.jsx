import React, { useEffect, useState } from "react";
import CommonInput from "../../../components/common/input";
import SelectBox from "../../../components/common/selectbox";
import Datepicker from "../../../components/common/Datepicker";
import "./addemployee.scss";
import CustomButton from "../../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addemployee,
  editemployee,
  getemployeedetails,
} from "../../../shared/employee/actions";
import { getcompanyies } from "../../../shared/company/actions";
import { getProjects } from "../../../shared/projects/actions";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { employeeRoute } from "../../../utils/routeContants";
import { FaArrowLeft } from "react-icons/fa";

const AddEmployee = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkValid = () => {
    const { data } = addEmployeeForm;
    let isValid = true;
    const errors = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = data[field];

      // Required field check
      if (rules.required && !value) {
        errors[field] = "This field is required";
        isValid = false;
      }

      // Conditional required (e.g., work from home date)
      if (
        rules.requiredIf &&
        data[rules.requiredIf] === rules.equals &&
        !value
      ) {
        errors[field] = "This field is required";
        isValid = false;
      }

      // Pattern match
      if (rules.pattern && value && !rules.pattern.test(value)) {
        errors[field] = rules.message || "Invalid format";
        isValid = false;
      }

      // Min length
      if (rules.minLength && value?.length < rules.minLength) {
        errors[field] = `Minimum ${rules.minLength} characters required`;
        isValid = false;
      }
    });

    setaddEmployeeForm((prev) => ({
      ...prev,
      error: errors,
    }));

    return isValid;
  };

  const validationRules = {
    name: { required: true, minLength: 3 },
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      message: "Invalid email",
    },
    password: { required: !id, minLength: 6 },
    dob: { required: true },
    mobile_number: {
      required: true,
      pattern: /^\d{10}$/,
      message: "Invalid phone number",
    },
    work_location: { required: true },
    work_location_valid_till: { requiredIf: "work_location", equals: "home" },
    employee_code: { required: true },
    project_id: { required: true },
    company_id: { required: true },
  };

  const handleSubmit = () => {
    if (!checkValid()) return;
    if (id) {
      let payload = {
        name: addEmployeeForm.data.name,
        // email: addEmployeeForm.data.email,
        dob: addEmployeeForm.data.dob,
        mobile_number: addEmployeeForm.data.mobile_number,
        work_location: addEmployeeForm.data.work_location,
        work_location_valid_till: addEmployeeForm.data.work_location_valid_till,
        employee_code: addEmployeeForm.data.employee_code,
        project_id: addEmployeeForm.data.project_id,
        company_id: addEmployeeForm.data.company_id,
      };
      dispatch(editemployee(id, payload, () => navigate(employeeRoute)));
    } else {
      dispatch(
        addemployee(addEmployeeForm.data, () => navigate(employeeRoute))
      );
    }
  };

  const [addEmployeeForm, setaddEmployeeForm] = useState({
    data: {
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
    },
    error: {
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
    },
  });

  const companyiesData = useSelector((state) => state.company);
  const projectsData = useSelector((state) => state.projects);
  const getemployeedetaildata = useSelector((state) => state.employee);
  // console.log(
  //   "getemployeedetaildata",
  //   getemployeedetaildata?.getemployeedetails?.data
  // );
  useEffect(() => {
    dispatch(getcompanyies());
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getemployeedetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setaddEmployeeForm((prev) => ({
        ...prev,
        data: {
          ...getemployeedetaildata?.getemployeedetails?.data,
        },
        error: {
          name: "",
          email: "",
          password: "",
          dob: "",
          mobile_number: "",
          work_location: "",
          work_location_valid_till: "",
          employee_code: "",
          project_id: "",
          company_id: "",
        },
      }));
    } else {
      setaddEmployeeForm({
        data: {
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
        },
        error: {
          name: "",
          email: "",
          password: "",
          dob: "",
          mobile_number: "",
          work_location: "",
          work_location_valid_till: "",
          employee_code: "",
          project_id: "",
          company_id: "",
        },
      });
    }
  }, [getemployeedetaildata?.getemployeedetails?.data]);

  const handleChange = (field, value) => {
    checkValid();
    setaddEmployeeForm((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
        ...(field === "work_location" && {
          work_location_valid_till: undefined,
        }),
      },
    }));
  };

  return (
    <div className="add-employee">
      <div className="employee-header">
        <CustomButton
          width="35px"
          onClick={() => navigate(employeeRoute)}
          customStyles={{ marginBottom: "20px" }}
          rightIcon={
            <div
              style={{
                backgroundColor: "#E8E4E4",
                borderRadius: "6px",
                border: "1px solid #E8E4E4",
                boxShadow: "unset",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6px 0px"
              }}
            >
              <FaArrowLeft />
            </div>
          }
        />
        <h1>{id ? "Edit Employee" : "Create Employee"}</h1>
      </div>

      <div className="add-employee-container">
        <CommonInput
          label="Name"
          placeholder="Enter your Name"
          width="100%"
          value={addEmployeeForm.data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={addEmployeeForm.error.name}
          errorText={addEmployeeForm.error.name}
        />
        <CommonInput
          label="Email"
          placeholder="Enter your Email"
          width="100%"
          disabled={id}
          value={addEmployeeForm.data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={addEmployeeForm.error.email}
          errorText={addEmployeeForm.error.email}
        />
        {!id && (
          <CommonInput
            label="Password"
            type="password"
            placeholder="Enter your Password"
            width="100%"
            value={addEmployeeForm.data.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={addEmployeeForm.error.password}
            errorText={addEmployeeForm.error.password}
          />
        )}
        <Datepicker
          label="Date Of Birth"
          width="100%"
          value={
            addEmployeeForm.data.dob
              ? dayjs(addEmployeeForm.data.dob)
              : addEmployeeForm.data.dob
          }
          onChange={(value) =>
            handleChange("dob", dayjs(value).format("YYYY-MM-DD"))
          }
          error={addEmployeeForm.error.dob}
          errorText={addEmployeeForm.error.dob}
        />
        <CommonInput
          label="Phone Number"
          placeholder="Enter your Number"
          width="100%"
          value={addEmployeeForm.data.mobile_number}
          onChange={(e) => handleChange("mobile_number", e.target.value)}
          error={addEmployeeForm.error.mobile_number}
          errorText={addEmployeeForm.error.mobile_number}
        />
        <SelectBox
          label="Work Location"
          options={[
            { label: "Home", value: "home" },
            { label: "Office", value: "office" },
          ]}
          width="100%"
          placeholder="Select Location"
          value={addEmployeeForm.data.work_location}
          onChange={(value) => handleChange("work_location", value)}
          error={addEmployeeForm.error.work_location}
          errorText={addEmployeeForm.error.work_location}
        />
        {addEmployeeForm.data.work_location == "home" && (
          <Datepicker
            label="Valid Date"
            width="100%"
            value={addEmployeeForm.data.work_location_valid_till}
            onChange={(value) =>
              handleChange(
                "work_location_valid_till",
                dayjs(value).format("YYYY-MM-DD")
              )
            }
            error={addEmployeeForm.error.work_location_valid_till}
            errorText={addEmployeeForm.error.work_location_valid_till}
          />
        )}
        <CommonInput
          label="Employee Code"
          placeholder="Enter your Code"
          width="100%"
          value={addEmployeeForm.data.employee_code}
          onChange={(e) => handleChange("employee_code", e.target.value)}
          error={addEmployeeForm.error.employee_code}
          errorText={addEmployeeForm.error.employee_code}
        />
        <SelectBox
          label="Project Id"
          options={projectsData?.projects?.data?.map((item) => ({
            value: item.project_id,
            label: item.project_name,
          }))}
          width="100%"
          placeholder="Select Project"
          value={Number(addEmployeeForm.data.project_id)}
          onChange={(value) => handleChange("project_id", `${value}`)}
          error={addEmployeeForm.error.project_id}
          errorText={addEmployeeForm.error.project_id}
        />
        <SelectBox
          label="Company"
          options={companyiesData?.company?.data?.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          }))}
          width="100%"
          placeholder="Select Company"
          value={addEmployeeForm.data.company_id}
          onChange={(value) => handleChange("company_id", value)}
          error={addEmployeeForm.error.company_id}
          errorText={addEmployeeForm.error.company_id}
        />
        <CustomButton
          width="70px"
          buttonTxt={id ? "Edit" : "Create"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddEmployee;
