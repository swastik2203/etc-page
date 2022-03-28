import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup_page from './components/Signup_page';
import Login_page from './components/Login_page';

function App() {
  return (
    <div>
      <Router>
        {/* <Header /> */}
        {/* <div className='mainContainer' > */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup_page" component={Signup_page} />
            <Route path="/login_page" component={Login_page} />
          </Switch>
          {/* <Footer /> */}
        {/* </div> */}
      </Router>
    </div>
    
  );
}




export default App

