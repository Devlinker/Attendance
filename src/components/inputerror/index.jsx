// import React, { useState } from "react";
// import axios from "axios";

// const MyComponent = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!email.includes("@")) {
//       setError("Invalid email format");
//       return;
//     }
//     setError("");

//     try {
//       const response = await axios.post("https://api.example.com/submit", {
//         email,
//       });
//       console.log("API Response:", response.data);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to submit. Try again.");
//     }
//   };

//   return (
//     <>
//       <input
//         type="text"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//       />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <button onClick={handleSubmit}>Submit</button>
//     </>
//   );
// };

// export default MyComponent;
