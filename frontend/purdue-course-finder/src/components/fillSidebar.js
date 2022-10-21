import React, { useEffect, useState } from 'react';
import "./fillSidebar.css";
import { serverURL } from '../index.js';
import { ListItem } from './sideBar.js';
import axios from 'axios';

export function populateSidebar(filter_option, search_string) {
    // Copy of local function from sideBar.js
    function setItem(itemHead_in, firstRow_in, secondRow_in) {
        return(
            <ListItem key = {itemHead_in + firstRow_in +secondRow_in}
                    itemHead = {itemHead_in}
                    firstRow = {firstRow_in}
                    secondRow = {secondRow_in}/>
        );
    }

    // Create list of items to be displayed in the sidebar
    let ListofItems = [];

    // Check which filter option is needed
    if (filter_option === 'Building') {
        // Hard-coded test item
        ListofItems.push(setItem(filter_option, search_string, "(Test) See fillSidebar.js"));

        // Create Building list
        const [buildings, setBuildings] = useState([]);

        // Axios Information
        //var url = `${serverURL}/subjects`;
        const config = {
          headers:{
            "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
          }
        };

        // TODO: Finish when /buildings works

    } else if (filter_option === 'Classroom') {
        ListofItems.push(setItem(filter_option, search_string, "(Test) See fillSidebar.js"));

    } else if (filter_option === 'Course') {
        //ListofItems.push(setItem(filter_option, search_string, "(Test) See fillSidebar.js"));

        // Create Building list
        const [courses, setCourses] = useState([]);

        // Axios Information
        var url = `${serverURL}/courses/` + search_string;
        const config = {
          headers:{
            "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
          }
        };

        // Query Backend
        axios.get(url, config).then((response) => {
            const data = response.data;
            setCourses(data);
        });

        // Fill up table with data
        courses.map((course, index) => {
            ListofItems.push(setItem(course.title, course.subjectAbbreviation + course.courseNumber, course.creditHours + " Credit Hours"))
        });


    } else if (filter_option === 'Section') {
        ListofItems.push(setItem(filter_option, search_string, "(Test) See fillSidebar.js"));

    } else {

        console.log("updateSidebar received incorrect filter option!");
    }
    
    return ListofItems;
}

//default export populateSidebar;

