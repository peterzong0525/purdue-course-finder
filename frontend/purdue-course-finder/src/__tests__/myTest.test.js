import React from 'react';
import Signup from '../components/signupPage';
import Login from '../components/loginPage';
import Home from '../components/Home';
import Sidebar from '../components/sideBar'
import Modify from '../components/modifyAccount';
import Delete from '../components/deleteAcct';
import Tutorial from '../components/tutorialPage';
import Favorites from '../components/Favorites';
import Schedule from '../components/Schedule';
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

it('Modify account page renders without crashing', () => {
    render(<BrowserRouter><Modify /></BrowserRouter>)
    expect(screen.getByTestId('modify_account')).toBeInTheDocument();
    expect(screen.getByTestId('modify_form')).toBeInTheDocument();
    expect(screen.getByTestId('noedit_buttons')).toBeInTheDocument();
    expect(screen.getByTestId('noedit_email_input')).toBeInTheDocument();
    expect(screen.getByTestId('noedit_password_input')).toBeInTheDocument();
});

it('Delete account page renders without crashing', () => {
    render(<BrowserRouter><Delete /></BrowserRouter>)

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
    render(<BrowserRouter><Sidebar onClick={() => {return;}}/></BrowserRouter>)

    // On page normally
    expect(screen.getByTestId('filter_overlay')).toBeInTheDocument();
    expect(screen.getByTestId('filter_close')).toBeInTheDocument();
    expect(screen.getByTestId('filter_container')).toBeInTheDocument();
    expect(screen.getByTestId('filter_building')).toBeInTheDocument();
    expect(screen.getByTestId('filter_classroom')).toBeInTheDocument();
    expect(screen.getByTestId('filter_course')).toBeInTheDocument();
    expect(screen.getByTestId('sort_asc')).toBeInTheDocument();
    expect(screen.getByTestId('sort_des')).toBeInTheDocument();

    // Nesting items
    const filter_overlay = screen.getByTestId('filter_overlay');
    const filter_close = screen.getByTestId('filter_close');
    const filter_container = screen.getByTestId('filter_container');
    const filter_building = screen.getByTestId('filter_building');
    const filter_classroom = screen.getByTestId('filter_classroom');
    const filter_course = screen.getByTestId('filter_course');
    const sort_container = screen.getByTestId('sort_container');
    const sort_asc = screen.getByTestId('sort_asc');
    const sort_des = screen.getByTestId('sort_des');

    // Confirming nesting
    expect(filter_overlay).toContainElement(filter_close);
    expect(filter_overlay).toContainElement(filter_container);
    expect(filter_close).not.toContainElement(filter_container);
    expect(filter_container).not.toContainElement(filter_close);
    expect(filter_container).toContainElement(filter_building);
    expect(filter_container).toContainElement(filter_classroom);
    expect(filter_container).toContainElement(filter_course);
    expect(filter_container).toContainElement(sort_container);
    expect(sort_container).toContainElement(sort_asc);
    expect(sort_container).toContainElement(sort_des);
});

it('Home page renders without crashing', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
});

it('Home page contains Map and Sidebar', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);

    const map = screen.getByTestId('map');
    const sidebar = screen.getByTestId('sidebar');
    const mapLoading = screen.getByTestId('mapLoading');
    const sidebarContainer = screen.getByTestId('sidebarContainer');

    expect(map).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(mapLoading).toBeInTheDocument();
    expect(sidebarContainer).toBeInTheDocument();
});

it('Favorites page renders without crashing', () => {
    render(<BrowserRouter><Favorites /></BrowserRouter>);

    // On page normally
    expect(screen.getByTestId("favoritesPageContainer")).toBeInTheDocument();
    expect(screen.getByTestId("favoritesContainer")).toBeInTheDocument();
    expect(screen.getByTestId("favoriteBuildings")).toBeInTheDocument();
    expect(screen.getByTestId("favoriteClassrooms")).toBeInTheDocument();
    expect(screen.getByTestId("favoriteCourses")).toBeInTheDocument();
    expect(screen.getByTestId("favoriteSections")).toBeInTheDocument();
    expect(screen.getAllByTestId("noFavorites").length).toBe(4);
    
    // Nesting items
    const favoritesPageContainer = screen.getByTestId("favoritesPageContainer");
    const favoritesContainer = screen.getByTestId("favoritesContainer");
    const favoriteBuildings = screen.getByTestId("favoriteBuildings");
    const favoriteClassrooms = screen.getByTestId("favoriteClassrooms");
    const favoriteCourses = screen.getByTestId("favoriteCourses");
    const favoriteSections = screen.getByTestId("favoriteSections");
    const noFavorites = screen.getAllByTestId("noFavorites");

    // Confirm nesting
    expect(favoritesPageContainer).toContainElement(favoritesContainer);
    expect(favoritesContainer).toContainElement(favoriteBuildings);
    expect(favoritesContainer).toContainElement(favoriteClassrooms);
    expect(favoritesContainer).toContainElement(favoriteCourses);
    expect(favoritesContainer).toContainElement(favoriteSections);
    expect(favoriteBuildings).toContainElement(noFavorites[0]);
    expect(favoriteClassrooms).toContainElement(noFavorites[1]);
    expect(favoriteCourses).toContainElement(noFavorites[2]);
    expect(favoriteSections).toContainElement(noFavorites[3]);
});

it('Route Popup', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);

    // On page normally
    expect(screen.getByTestId('route_overlay')).toBeInTheDocument();
    expect(screen.getByTestId('route_wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('route_close')).toBeInTheDocument();
    expect(screen.getByTestId('route_container')).toBeInTheDocument();
    expect(screen.getByTestId('route_origin')).toBeInTheDocument();
    expect(screen.getByTestId('route_destination')).toBeInTheDocument();
    expect(screen.getByTestId('route_show')).toBeInTheDocument();
    expect(screen.getByTestId('route_walking')).toBeInTheDocument();
    expect(screen.getByTestId('route_biking')).toBeInTheDocument();
    expect(screen.getByTestId('route_driving')).toBeInTheDocument();

    // Nesting items
    const overlay = screen.getByTestId("route_overlay");
    const wrapper = screen.getByTestId("route_wrapper");
    const close = screen.getByTestId("route_close");
    const container = screen.getByTestId("route_container");
    const origin = screen.getByTestId("route_origin");
    const destination = screen.getByTestId("route_destination");
    const show = screen.getByTestId("route_show");
    const walking = screen.getByTestId("route_walking");
    const biking = screen.getByTestId("route_biking");
    const driving = screen.getByTestId("route_driving");

    // Confirm nesting
    expect(overlay).toContainElement(wrapper);
    expect(overlay).toContainElement(close);
    expect(overlay).toContainElement(container);
    expect(overlay).toContainElement(origin);
    expect(overlay).toContainElement(destination);
    expect(overlay).toContainElement(show);
    expect(overlay).toContainElement(walking);
    expect(overlay).toContainElement(biking);
    expect(overlay).toContainElement(driving);
    expect(wrapper).toContainElement(close);
    expect(close).not.toContainElement(container);
    expect(container).toContainElement(origin);
    expect(container).toContainElement(destination);
    expect(container).not.toContainElement(show);
    expect(container).not.toContainElement(walking);
    expect(container).not.toContainElement(biking);
    expect(container).not.toContainElement(driving);
    expect(show).not.toContainElement(walking);
    expect(walking).not.toContainElement(show);
});

it('Schedule page renders without crashing', () => {
    render(<BrowserRouter><Schedule /></BrowserRouter>);

    // On page normally
    expect(screen.getByTestId("scheduleHeader")).toBeInTheDocument();
    expect(screen.getByTestId("scheduleHome")).toBeInTheDocument();
    expect(screen.getByTestId("hiddenEventsContainer")).toBeInTheDocument();
    expect(screen.getByTestId("hiddenEvents")).toBeInTheDocument();
    expect(screen.getByTestId("scheduleContainer")).toBeInTheDocument();
    expect(screen.getByTestId("eventPopup")).toBeInTheDocument();
    expect(screen.getByTestId("sectionPopup")).toBeInTheDocument();
    expect(screen.getByTestId("meetingPopup")).toBeInTheDocument();
    expect(screen.getByTestId("locationPopup")).toBeInTheDocument();
    expect(screen.getAllByTestId("gridContainer").length).toBe(200);

    // Nesting items
    const header = screen.getByTestId("scheduleHeader");
    const home = screen.getByTestId("scheduleHome");
    const hiddenContainer = screen.getByTestId("hiddenEventsContainer");
    const hiddenEvents = screen.getByTestId("hiddenEvents");
    const scheduleContainer = screen.getByTestId("scheduleContainer");
    const eventPopup = screen.getByTestId("eventPopup");
    const sectionPopup = screen.getByTestId("sectionPopup");
    const meetingPopup = screen.getByTestId("meetingPopup");
    const locationPopup = screen.getByTestId("locationPopup");
    const gridContainers = screen.getAllByTestId("gridContainer");

    // Confirm nesting
    expect(header).toContainElement(home);
    expect(header).toContainElement(hiddenContainer);
    expect(header).not.toContainElement(scheduleContainer);
    expect(hiddenContainer).toContainElement(hiddenEvents);
    expect(eventPopup).toContainElement(sectionPopup);
    expect(eventPopup).toContainElement(meetingPopup);
    expect(eventPopup).toContainElement(locationPopup);
    for (let i = 0; i < gridContainers.length; i++){
        expect(scheduleContainer).toContainElement(gridContainers[i]);
    }
    
});