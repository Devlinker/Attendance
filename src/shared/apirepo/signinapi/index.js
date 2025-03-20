import axios from "axios";

export  const loginAdmin = async () => {
  const url = "http://13.203.157.12/api/v1/admin/login/";
  const payload = {
    "email": "zxy@example.com",
    "password": "123456"
  
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

