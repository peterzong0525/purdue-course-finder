import React, { useState } from 'react';
import './sideBar.css';
import PropTypes from 'prop-types';
//import { populateSidebar } from './fillSidebar.js';
import { serverURL } from '../index.js';
import axios from 'axios';
import searchIcon from '../tutorial_images/search-icon.png';

let filter = 'Course';
let curCourse = "";

function SideBar() {
    const [objects, setObjects] = useState([]);
    const [sortOption, setSortOption] = useState("asc");

    function populateSidebar(filter_option, search_string) {
        const config = {
            headers:{
              "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
            }
        };

        let url = "";

        // Check which filter option is needed
        if (filter_option === 'Building') {
            // Axios Information
            url = `${serverURL}/buildings`;
    
        } else if (filter_option === 'Classroom') {
            // Axios Information
            url = `${serverURL}/classrooms`;

        } else if (filter_option === 'Course') {
            // Axios Information
            url = `${serverURL}/courses/` + search_string;

        } else if (filter_option === 'Section') {
            // Axios Information
            url = `${serverURL}/sections/` + search_string;

        } else {
            console.log("updateSidebar received incorrect filter option!");
            return;
        }
        // Query Backend
        axios.get(url, config).then((response) => {
            let data = response.data;
            data.sort((a, b) => a.courseNumber - b.courseNumber);
            if (sortOption === "des")
                data = data.reverse();
            setObjects(data);
        });

    }

    function setItem(itemHead_in, firstRow_in, secondRow_in, dataType, dataID) {
        return(
            <ListItem key = {dataID}
                    itemHead = {itemHead_in}
                    firstRow = {firstRow_in}
                    secondRow = {secondRow_in}
                    dataType = {dataType}
                    dataID = {dataID}/>
        );
    }

    function ListItem(props) {
        ListItem.propTypes = {
            itemHead: PropTypes.string,
            firstRow: PropTypes.string,
            secondRow: PropTypes.string,
            dataType: PropTypes.string,
            dataID: PropTypes.string,
        };
    
        const [itemHead, firstRow, secondRow, dataType, dataID] = [props.itemHead, props.firstRow, props.secondRow, props.dataType, props.dataID];
    
        const handleChange = async (e) => {
           
            if (e.filter === "Course") {
                filter = "Section";
                curCourse = itemHead;
                document.getElementById("section").checked = true;
            }
            populateSidebar(filter, e.searchStr)
        }
    
        return(
            <div className = "listItemContainer" onClick={() => {handleChange({filter: dataType, searchStr: dataID})}}>
                <h2 className = "ItemHead" style={{margin: "0"}}>
                    {props.itemHead}
                </h2>
                <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                    {props.firstRow}
                </p>
                {props.secondRow != "" && (
                    <p className = "secondRow" style={{margin: "5px 0 0 0"}}>
                        {props.secondRow}
                    </p>
                )}
    
            </div>
        );
    }

    const handleChange = async (e) => {
        if (e.key === 'Enter') {
            // Get search string from text field
            let searchStr = document.getElementById('search-input').value;

            // Check if search string is empty
            if (searchStr.trim() !== '') {

                // Get current filter option
                filter = document.querySelector('input[name="filter_option"]:checked');
                if (filter != null) {
                    filter = filter.value;
                } else {
                    filter = 'Course';  // Default filter option because checked="checked" breaks things
                }
                
                // Change sidebar
                await populateSidebar(filter, searchStr);
            }
        }
    }

    const displayObjects = (objects) => {
        if (!objects.length) {
            return null;
        }
    
        if (filter === 'Course') {
            return objects.map((course, index) => (
                <div key={index}>
                    {setItem(course.subjectAbbreviation + course.courseNumber, course.title, course.creditHours + " Credit Hours", "Course", course.courseId)}
                </div>
            ))
        } else if (filter === 'Section') {
            return objects.map((section, index) => (
                <div key={index}>
                    {setItem(curCourse + " - " + section.Crn, "Type: " + section.Type, "Capacity: " + section.Capacity, "Section", section.Id)}
                </div>
            ))
        } else if (filter === 'Building') {
            // TODO: Confirm this works when server can return this data
            return objects.map((building, index) => (
                <div key={index}>
                    {setItem(building.ShortCode, building.Name, building.Rooms.length + " Rooms", "Building", building.buildingId)}
                </div>
            ))
        } else if (filter === 'Classroom') {
            // TODO: Confirm this works when server can return this data
            return objects.map((classroom, index) => (
                <div key={index}>
                    {setItem(classroom.number, classroom.Building.Name, classroom.Meetings.length + " meetings per week", "Classroom", classroom.classroomId)}
                </div>
            ))
        } else {
            console.log('No other filtering option should occur.');
        }
    }

    return(
        <div className = "sideBarContainer" data-testid="sidebarContainer">
            <div className = 'header'>
                <h1 style={{fontSize:'2vw'}}>Purdue Course Finder</h1>
                <div className='searchBar'>
                    <input id = 'search-input' type="text"
                        placeholder="Search"
                        onKeyDown={handleChange}
                        autoComplete='off' />
                    <img className ="searchIcon"
                        src={searchIcon}
                        onClick={() => {handleChange({key: 'Enter'})}} />
                </div>
                <div className='filterAdvanced'>
                    <a href="#SideBarFilter" className="button">
                        <button type='submit'>Filter</button>
                    </a>
                    <button style={{marginLeft: 'auto'}} type='submit'>Advanced Search</button>
                </div>
                <hr></hr>
            </div>
            <div id="sidebar_list" className='listOfItems'>
                {displayObjects(objects)}
            </div>

            <div className="popup_overlay" id="SideBarFilter" data-testid="filter_overlay">
                <div className="popup_wrapper">
                    <h2>Change Filter</h2>
                    {/* eslint-disable-next-line */}
                    <a href="#" className="close" data-testid="filter_close">&times;</a>
                    <div className="content">
                        <div className="popup_container" data-testid="filter_container">
                            <form>
                                <div className="popup_box">
                                    <label className="text">
                                        <input type="radio"
                                                id="building"
                                                name="filter_option"
                                                value="Building"
                                                defaultChecked="True"
                                                data-testid="filter_building" />
                                        Building
                                    </label>
                                    <p>&nbsp;</p>

                                    <label className="text">
                                        <input type="radio"
                                        id="classroom"
                                        name="filter_option"
                                        value="Classroom"
                                        data-testid="filter_classroom" />
                                        Classroom
                                    </label>
                                    <p>&nbsp;</p>

                                    <label className="text">
                                        <input type="radio"
                                        id="course"
                                        name="filter_option"
                                        value="Course"
                                        data-testid="filter_course" />
                                        Course
                                    </label>
                                    <p>&nbsp;</p>

                                    <label className="text">
                                        <input type="radio"
                                        id="section"
                                        name="filter_option"
                                        value="Section"
                                        data-testid="filter_section" />
                                        Section
                                    </label>
                                    <hr></hr>
                                    <div className="sortBy" data-testid="sort_container">
                                        Sort By:
                                        <label className="txt">
                                            <input type="radio"
                                                id="sortAscend"
                                                name="sort_option"
                                                value="Ascending"
                                                defaultChecked="True"
                                                onChange={() => {setSortOption("asc")}}
                                                data-testid="sort_asc" />
                                            Ascending
                                        </label>
                                        <label className="txt">
                                            <input type="radio"
                                                id="sortAscend"
                                                name="sort_option"
                                                value="Descending"
                                                onChange={() => {setSortOption("des")}}
                                                data-testid="sort_des" />
                                            Descending
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;


