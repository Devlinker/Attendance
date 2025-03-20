import axios from "axios";

export const signupAdmin = async () => {
  const url = "http://13.203.157.12/api/v1/admin/signup/";
  const payload = {
    name: "Admin User",
    email: "abcd@example.com",
    password: "123456",
    dob: "1990-01-01",
    mobile_number: "9955243098",
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Signup Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Signup Error:",
      error.response ? error.response.data : error.message
    );
  }
};
