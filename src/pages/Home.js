import React from 'react';
import { NavLink } from "react-router-dom";



function Home() {

  return (
    <div>
        <h1>WElcome</h1>
        <NavLink to="/signup_page">
            <button>Signup</button>
        </NavLink>

        <NavLink to="/login_page">
              <button>Login</button>
          </NavLink>
    </div>
  )
}


export default Home;