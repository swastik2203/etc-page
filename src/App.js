import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {About, Home} from './pages/Home';
import Signup_page from './components/Signup_page';

function App() {
  return (
    <div>
      <Router>
        {/* <Header /> */}
        {/* <div className='mainContainer' > */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup_page" component={Signup_page} />
            <Route path="/about" component={About} />
          </Switch>
          {/* <Footer /> */}
        {/* </div> */}
      </Router>
    </div>
    
  );
}




export default App

