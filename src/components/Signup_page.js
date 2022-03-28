import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";

function Signup_page() {
  const history = useHistory();
  const [useremailReg, setUseremailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [samedataError, setSamedataError] = useState(false);


  // const BASE_URL = 'http//localhost:3001/signup'

  const register = async (e) => {
    e.preventDefault();

    // if  (useremailReg === '' || passwordReg === '') {
    //   setError(true);
    //   }
     
    //   else {
    //   setSubmitted(true);
    //   setError(false);
    //   }
    
    const res = await fetch("/signup", {
        method: "POST",
        headers:{
          "Content-Type" :"application/json"
        },
        body: JSON.stringify({
          useremail: useremailReg,
          password: passwordReg,
        })
      });
      const data = await res.json();
      
      if  (useremailReg === '' || passwordReg === '') {
        setError(true);
        window.alert("invalid registration");
        console.log("invalid registration")
        }
      else if(res.status === 409 || !data){
        setSamedataError(true);
        setSubmitted(false);
        setError(false);
        window.alert("invalid registration");
        console.log("invalid registration")
      } else{
        setSubmitted(true);
        setError(false);
        window.alert("succesful registration")
        console.log("successful registration")

        history.push('/');

      }
   
     
    // axios.post(BASE_URL, {
    //   useremail: useremailReg,
    //   password: passwordReg
    // }).then((response) => {
    //   console.log(response);
    // });
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

  // Showing samedataerror message if error is true
  const samedataErrorMessage = () => {
    return (
    <div
    className="samedataerror"
    style={{
    display: samedataError ? '' : 'none',
    }}>
    <h1>User Already Exists  Please Enter Valid </h1>
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
        {samedataErrorMessage()}
        </div>

        <form method="POST">
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
