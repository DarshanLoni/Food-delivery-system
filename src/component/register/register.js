import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../register/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [nameErr, setnameErr] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const history = useHistory();

  async function registertration() {
    if (username.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0) {
      setnameErr(true);
    } else if (!email.includes('@') || !email.includes('.') || !email.includes('com')) {
      alert('please Enter valid email address');
    } else if (password.length < 5) {
      alert('please enter the password more than five characters');
    } else {
      setnameErr(false);
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          sessionStorage.setItem('user', JSON.stringify({ 'name': username, 'email': email, 'password': password }));
          history.push('/login');
        } else {
          const errorData = await response.json();
          setRegistrationError(errorData.error || 'Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
        setRegistrationError('Registration failed');
      }
    }
  }

  return (
    <div className="register-body">
      <div className="register-main">
        <h1>Register Form</h1>
        {nameErr && <p className="errP">*please fill every input field*</p>}
        {registrationError && <p className="errP">{registrationError}</p>}
        <br />
        <p>Name</p>
        <input type='text' value={username} onChange={(e) => { setUsername(e.target.value) }}></input>
        <br />
        <p>Email</p>
        <input type='text' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
        <br />
        <p>Password</p>
        <input type='password' value={password} onChange={(e) => { setpassword(e.target.value) }}></input>
        <br /><br />
        <button onClick={registertration}>Register</button>
      </div>
    </div>
  );
}

export default Register;
