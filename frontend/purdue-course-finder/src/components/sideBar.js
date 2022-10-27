import React, { useEffect, useState } from 'react';
import './sideBar.css';
import PropTypes from 'prop-types';
import { serverURL } from '../index.js';
import axios from 'axios';
import searchIcon from '../tutorial_images/search-icon.png';

let filter = 'Building';
let prevDesc = "";
var searchString = "";
function SideBar(props) {
    SideBar.propTypes = {
        onClick: PropTypes.func,
    };

    const [objects, setObjects] = useState([]);
    const [sortOption, setSortOption] = useState("asc");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleChange({key: 'Enter'})
    }, []);
    
    function populateSidebar(filter_option) {
        const config = {
            headers:{
              "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
            }
        };

        let url = "";
        console.log("Filter: " + filter_option)
        console.log("Search string: " + searchString)
        // Check which filter option is needed
        if (filter_option === 'Building') {
            // Axios Information
            url = `${serverURL}/buildings/`;
    
        } else if (filter_option === 'Classroom') {
            // Axios Information
            url = `${serverURL}/classrooms`;

        } else if (filter_option === 'Course') {
            if (searchString.trim() === '') {
                setLoading(false);
                return;
            }
            // Axios Information
            url = `${serverURL}/courses/` + searchString;

        } else if (filter_option === 'Section') {
            if (searchString.trim() === '') {
                setLoading(false);
                return;
            }
            // Axios Information
            url = `${serverURL}/sections/` + searchString;

        } else {
            console.log("updateSidebar received incorrect filter option!");
            return;
        }
        // Query Backend
        axios.get(url, config).then((response) => {
            let data = response.data;
            
            if (filter_option === 'Building') 
                data.sort((a, b) => a.Name.localeCompare(b.Name));
            else if (filter_option === 'Classroom')
                ;
            else if (filter_option === 'Course')
                data.sort((a, b) => a.courseNumber - b.courseNumber);
            else if (filter_option === 'Section')
                ;
               
            if (sortOption === "des")
                data = data.reverse();
            console.log(data)
            setObjects(data);
            setLoading(false);
            
        }).catch((error) => {
            console.log(error);
        });

    }


    function setItem(itemHead_in, firstRow_in, secondRow_in, dataType, dataID) {
        return(
            <ListItem key = {dataID}
                    itemHead = {itemHead_in}
                    firstRow = {firstRow_in}
                    secondRow = {secondRow_in}
                    dataType = {dataType}
                    dataID = {dataID}
                    onClick = {(e)=> {props.onClick(e)}}/>
        );
    }

    function ListItem(props) {
        ListItem.propTypes = {
            itemHead: PropTypes.string,
            firstRow: PropTypes.string,
            secondRow: PropTypes.string,
            dataType: PropTypes.string,
            dataID: PropTypes.string,
            onClick: PropTypes.func,
        };
    
        const [itemHead, firstRow, secondRow, dataType, dataID] = [props.itemHead, props.firstRow, props.secondRow, props.dataType, props.dataID];
    
        const handleChange = (e) => {
            setLoading(true);
            if (e.filter === "Course") {
                filter = "Section";
                prevDesc = itemHead;
                searchString = e.searchStr;
                document.getElementById("section").checked = true;
            }
            if (e.filter === "Building") {
                //filter = "Classroom";
                prevDesc = itemHead;
                searchString = e.searchStr;
                document.getElementById("classroom").checked = true;
                props.onClick(firstRow);
            }
            
            populateSidebar(filter)
        }

        const changeFavorite = (e) => {
            console.log(e)
        }

    
    
        return(
            <div className = "listItemContainer" onClick={() => {handleChange({filter: dataType, searchStr: dataID})}}>
                <div className = "listItemInfo" >
                    <h2 className = "ItemHead" style={{margin: "0"}}>
                        {props.itemHead}
                    </h2>
                    <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                        {props.firstRow}
                    </p>
                    <p className = "secondRow" style={{margin: "5px 0 0 0"}}>
                        {props.secondRow}
                    </p>
                </div>
                <div className = "favoriteStar" >
                    <input className = "star" type="checkbox" onClick={(e) => {e.stopPropagation(); changeFavorite(e)}}></input>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            // Get search string from text field
            let searchStr = document.getElementById('search-input').value;

            // Get current filter option
            filter = document.querySelector('input[name="filter_option"]:checked');
            if (filter != null) {
                filter = filter.value;
            } else {
                filter = 'Building';  // Default filter option because checked="checked" breaks things
            }
            
            // Change sidebar
            searchString = searchStr;
            populateSidebar(filter);
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
                    {setItem(prevDesc + " - " + section.Crn, "Type: " + section.Type, "Capacity: " + section.Capacity, "Section", section.Id)}
                </div>
            ))
        } else if (filter === 'Building') {
            let filtered = [];
            
            // Filter for buildings with name or shortcode containing search string
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].Name.includes(searchString) || 
                    objects[i].ShortCode.includes(searchString)) {
                    filtered.push(objects[i]);
                }
            }

            if (filtered.length === 0) {
                return null;
            }

            return filtered.map((building, index) => (
                <div key={index}>
                    {setItem(building.ShortCode, building.Name, "", "Building", building.Id)}
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
                {!loading && displayObjects(objects)}
                {!loading && !displayObjects(objects) && (
                    <h1>No Results.</h1>
                )}
                {loading && (
                    <div className="loaderContainer">
                        <div className="loader"></div>
                    </div>
                )}
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


