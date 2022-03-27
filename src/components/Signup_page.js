import React, { useState } from "react";
import axios from "axios";

function Signup_page() {
  const [useremailReg, setUseremailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const BASE_URL = 'http//localhost:3001/signup'

  const register = (e) => {
    e.preventDefault();
    if  (useremailReg === '' || passwordReg === '') {
    setError(true);
    } else {
    setSubmitted(true);
    setError(false);
    }

    // fetch("http//localhost:3001/signup", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: useremailReg,
    //       password: passwordReg,
    //     })
    //   }).then((response)=> {
    //     console.log(response)
    //     return response.json();
    //   });
      
     
    axios.post(BASE_URL, {
      useremail: useremailReg,
      password: passwordReg
    }).then((response) => {
      console.log(response);
    });
  };


  // Showing success message
const successMessage = () => {
  return (
  <div
  className="success"
  style={{
  display: submitted ? '' : 'none',
  }}>
  <h1>User {useremailReg} successfully registered!!</h1>
  </div>
  );
  };
  
  // Showing error message if error is true
  const errorMessage = () => {
  return (
  <div
  className="error"
  style={{
  display: error ? '' : 'none',
  }}>
  <h1>Please enter all the fields</h1>
  </div>
  );
  };
  

  return (
    <>
      <div className="container">

        {/* Calling to the methods */}
        <div className="messages">
        {errorMessage()}
        {successMessage()}
        </div>

        <form >
          <label for="uemail">
            <b>Username</b>
          </label>
          <input
            type="text"
            onChange={(e) => {
              setUseremailReg(e.target.value);
              setSubmitted(false);
            }}
            placeholder="Enter Useremail"
            name="useremail"
            required
          ></input>

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
              setSubmitted(false);
            }}
            placeholder="Enter Password"
            name="password"
            required
          ></input>

          <button onClick={register} type="submit">
            signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup_page;
