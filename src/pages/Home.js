import React from 'react';
import { NavLink } from "react-router-dom";



function Home() {

  return (
    <div>
        <h1>WElcome</h1>
        <NavLink to="/signup_page">
            <button>Signup</button>
        </NavLink>

        <NavLink to="/about">
              <button>About</button>
          </NavLink>
    </div>
  )
}

function About() {
    return (
      <div>
          <h1>About</h1>
      </div>
    )
  }


export {About, Home}