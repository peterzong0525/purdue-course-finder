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
import Courses from './components/Courses.js';
import Sections from './components/Sections.js';
import Subjects from './components/Subjects.js';
import Map from './components/Map.js';

export const serverURL = process.env.REACT_APP_BACKEND_URL || 'https://localhost:8443';

//const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));

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

          {/* Below Routes are Temporary */}
          <Route path='/courses/:id' element={<Courses />} />
          <Route path='/sections/:id' element={<Sections />} />
          <Route path='/subjects' element={<Subjects />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root') || document.createElement('div')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
