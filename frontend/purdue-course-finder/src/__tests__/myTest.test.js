import React from 'react';
import ReactDOM from 'react-dom';
import Signup from '../components/signupPage';
import Login from '../components/loginPage';
import Home from '../components/Home';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
    render(<Signup />)
});

it('renders without crashing', () => { 
    render(<BrowserRouter><Login /></BrowserRouter>)
});

it('renders without crashing', () => {
    render(<Home />)
});