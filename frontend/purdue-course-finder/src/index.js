import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import './index.css';
import Home from './components/Home.js'
import Login from './components/loginPage.js'
import Signup from './components/signupPage.js'
import Tutorial from './components/tutorialPage.js'
import Courses from './components/Courses.js'
import AcctDelete from './components/deleteAcct.js'
import ModifyAcnt from './components/modifyAccount.js'

export const serverURL = 'https://localhost:8443';

const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));

root.render(
  // Add routes to the list below
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/deleteacct' element={<AcctDelete/>} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/modifyAccount' element={<ModifyAcnt />} />
        </Routes>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
