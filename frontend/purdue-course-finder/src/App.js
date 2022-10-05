import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js'
import Login from './components/Login/loginPage.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { Component } from 'react';

class App extends Component {
    render() {
      return (
        // Add routes to the list below
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      )
    }
}

export default App;
