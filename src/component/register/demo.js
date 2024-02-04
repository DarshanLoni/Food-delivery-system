import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../register/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);

  function registertration() {
    if (username.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0) {
      setNameErr(true);
    } else if (!email.includes("@", ".", "com")) {
      alert("Please Enter a valid email address");
    } else if (password.length < 5) {
      alert("Please enter a password with more than five characters");
    } else {
      setNameErr(false);

      // Make a POST request to the server
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Registration success:", data);
          // Redirect or handle success as needed
        })
        .catch((error) => {
          console.error("Registration error:", error);
          // Handle error as needed
        });
    }
  }

  return (
    <div className="register-body">
      <div className="register-main">
        <h1>Register Form</h1>
        {nameErr && <p className="errP">*please fill every input field*</p>}
        <br />
        <p>Name</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br />
        <p>Email</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <p>Password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <br /><br />
        <button onClick={registertration}>Register</button>
      </div>
    </div>
  );
}

export default Register;
