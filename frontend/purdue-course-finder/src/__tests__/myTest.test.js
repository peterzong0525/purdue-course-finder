import React from 'react';
import Signup from '../components/signupPage';
import Login from '../components/loginPage';
import Home from '../components/Home';
import Modify from '../components/modifyAccount';
import Delete from '../components/deleteAcct';
import Tutorial from '../components/tutorialPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';


it('Signup page renders without crashing', () => {
    render(<Signup />)
    expect(screen.getByTestId('signup_container')).toBeInTheDocument();
    expect(screen.getByTestId('signup_head')).toBeInTheDocument();
    expect(screen.getByTestId('signup_form')).toBeInTheDocument();
    expect(screen.getByTestId('signup_email')).toBeInTheDocument();
    expect(screen.getByTestId('signup_password1')).toBeInTheDocument();
    expect(screen.getByTestId('signup_password2')).toBeInTheDocument();
    expect(screen.getByTestId('signup_signup_button')).toBeInTheDocument();

    // Nesting items
    const signup_container = screen.getByTestId('signup_container');
    const signup_head = screen.getByTestId('signup_head');
    const signup_form = screen.getByTestId('signup_form');
    const signup_email = screen.getByTestId('signup_email');
    const signup_password1 = screen.getByTestId('signup_password1');
    const signup_password2 = screen.getByTestId('signup_password2');
    const signup_signup_button = screen.getByTestId('signup_signup_button');

    // Cofirming nesting
    expect(signup_container).toContainElement(signup_head);
    expect(signup_container).toContainElement(signup_form);
    expect(signup_container).toContainElement(signup_email);
    expect(signup_container).toContainElement(signup_password1);
    expect(signup_container).toContainElement(signup_password2);
    expect(signup_container).toContainElement(signup_signup_button);
    expect(signup_head).not.toContainElement(signup_container);
    expect(signup_head).not.toContainElement(signup_form);
    expect(signup_head).not.toContainElement(signup_signup_button);
    expect(signup_form).toContainElement(signup_email);
    expect(signup_form).toContainElement(signup_password1);
    expect(signup_form).toContainElement(signup_password2);
    expect(signup_form).toContainElement(signup_signup_button);
    expect(signup_password1).not.toContainElement(signup_password2);
});

it('Login page renders without crashing', () => { 
    render(<BrowserRouter><Login /></BrowserRouter>)

    // On page normally
    expect(screen.getByTestId('login_container')).toBeInTheDocument();
    expect(screen.getByTestId('login_head')).toBeInTheDocument();
    expect(screen.getByTestId('login_form')).toBeInTheDocument();
    expect(screen.getByTestId('login_label')).toBeInTheDocument();
    expect(screen.getByTestId('login_email')).toBeInTheDocument();
    expect(screen.getByTestId('login_password')).toBeInTheDocument();
    expect(screen.getByTestId('login_button')).toBeInTheDocument();
    expect(screen.getByTestId('login_links')).toBeInTheDocument();

    // Nesting items
    const login_container = screen.getByTestId('login_container');
    const login_head = screen.getByTestId('login_head');
    const login_form = screen.getByTestId('login_form');
    const login_email = screen.getByTestId('login_email');
    const login_password = screen.getByTestId('login_password');
    const login_button = screen.getByTestId('login_button');

    // Cofirming nesting
    expect(login_container).toContainElement(login_head);
    expect(login_container).toContainElement(login_form);
    expect(login_container).toContainElement(login_email);
    expect(login_container).toContainElement(login_password);
    expect(login_container).toContainElement(login_button);
    expect(login_head).not.toContainElement(login_container);
    expect(login_head).not.toContainElement(login_form);
    expect(login_head).not.toContainElement(login_button);
    expect(login_form).toContainElement(login_email);
    expect(login_form).toContainElement(login_password);
    expect(login_form).toContainElement(login_button);
});

it('Home page renders without crashing', () => {
    render(<Home />)
});

it('Modify account page renders without crashing', () => {
    render(<Modify />)
    expect(screen.getByTestId('modify_account')).toBeInTheDocument();
    expect(screen.getByTestId('modify_form')).toBeInTheDocument();
    expect(screen.getByTestId('noedit_buttons')).toBeInTheDocument();
    expect(screen.getByTestId('noedit_email_input')).toBeInTheDocument();
    expect(screen.getByTestId('noedit_password_input')).toBeInTheDocument();
});

it('Delete account page renders without crashing', () => {
    render(<Delete />)

    // On page normally
    expect(screen.getByTestId('delete_parent')).toBeInTheDocument();
    expect(screen.getByTestId('delete_header')).toBeInTheDocument();
    expect(screen.getByTestId('delete_back_button')).toBeInTheDocument();
    expect(screen.getByTestId('delete_delete_button')).toBeInTheDocument();

    // Nesting items
    const delete_parent = screen.getByTestId('delete_parent');
    const delete_header = screen.getByTestId('delete_header');
    const delete_back_button = screen.getByTestId('delete_back_button');
    const delete_delete_button = screen.getByTestId('delete_delete_button');
    const delete_confirm_window = screen.getByTestId('delete_confirm_window');
    const delete_popup = screen.getByTestId('delete_popup');
    
    // Confirming nesting
    expect(delete_parent).toContainElement(delete_header);
    expect(delete_parent).toContainElement(delete_back_button);
    expect(delete_parent).toContainElement(delete_delete_button);
    expect(delete_parent).toContainElement(delete_popup);
    expect(delete_header).not.toContainElement(delete_back_button);
    expect(delete_back_button).not.toContainElement(delete_header);
    expect(delete_delete_button).not.toContainElement(delete_confirm_window);
    expect(delete_confirm_window).toContainElement(delete_popup);
});

it('Tutorial page renders without crashing', () => {
    render(<Tutorial />)
});

it('Sidebar Filter Pop-up renders without crashing', () => {
    render(<Home />)

    // On page normally
    expect(screen.getByTestId('filter_overlay')).toBeInTheDocument();
    expect(screen.getByTestId('filter_close')).toBeInTheDocument();
    expect(screen.getByTestId('filter_container')).toBeInTheDocument();
    expect(screen.getByTestId('filter_building')).toBeInTheDocument();
    expect(screen.getByTestId('filter_classroom')).toBeInTheDocument();
    expect(screen.getByTestId('filter_course')).toBeInTheDocument();
    expect(screen.getByTestId('filter_section')).toBeInTheDocument();

    // Nesting items
    const filter_overlay = screen.getByTestId('filter_overlay');
    const filter_close = screen.getByTestId('filter_close');
    const filter_container = screen.getByTestId('filter_container');
    const filter_building = screen.getByTestId('filter_building');
    const filter_classroom = screen.getByTestId('filter_classroom');
    const filter_course = screen.getByTestId('filter_course');
    const filter_section = screen.getByTestId('filter_section');

    // Confirming nesting
    expect(filter_overlay).toContainElement(filter_close);
    expect(filter_overlay).toContainElement(filter_container);
    expect(filter_close).not.toContainElement(filter_container);
    expect(filter_container).not.toContainElement(filter_close);
    expect(filter_container).toContainElement(filter_building);
    expect(filter_container).toContainElement(filter_classroom);
    expect(filter_container).toContainElement(filter_course);
    expect(filter_container).toContainElement(filter_section);
});

it('Home page contains Map and Sidebar', () => {
    render(<Home />);

    const map = screen.getByTestId('map');
    const sidebar = screen.getByTestId('sidebar');

    expect(map).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
});