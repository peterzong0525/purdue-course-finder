import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import './index.css';
import Home from './components/Home.js';
import Login from './components/loginPage.js';
import Signup from './components/signupPage.js';
import AcctDelete from './components/deleteAcct.js';
import ModifyAcnt from './components/modifyAccount.js';
import Tutorial from './components/tutorialPage.js';
import Schedule from './components/Schedule.js';
import Favorites from './components/Favorites.js';
import Suggestions from './components/Suggestions.js';

export const serverURL = process.env.REACT_APP_BACKEND_URL || 'https://localhost:8443';

ReactDOM.render(
  // Add routes to the list below
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/deleteacct' element={<AcctDelete/>} />
          <Route path='/modifyAccount' element={<ModifyAcnt />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/suggestions' element={<Suggestions />} />
        </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root') || document.createElement('div')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
