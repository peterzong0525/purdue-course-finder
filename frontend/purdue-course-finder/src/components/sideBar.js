import React, { useEffect, useState } from 'react';
import './sideBar.css';
import PropTypes from 'prop-types';
import { serverURL } from '../index.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../tutorial_images/search-icon.png';

let filter = 'Building';
let prevDesc = "";
var searchString = "";
function SideBar(props) {
    SideBar.propTypes = {
        onClick: PropTypes.func,
        onRouteClick: PropTypes.func,
        onRouteMethodChange: PropTypes.func,
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const [objects, setObjects] = useState([]);
    const [sortOption, setSortOption] = useState("asc");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.sessionStorage.getItem("userToken") != null) {
            setLoggedIn(true);
        }
        handleChange({key: 'Enter'});
    }, [loggedIn]);
    
    function populateSidebar(filter_option) {
        let url = "";
        let getFavUrl = "";

        console.log("Filter: " + filter_option)
        console.log("Search string: " + searchString)

        // Check which filter option is needed
        if (filter_option === 'Building') {
            url = `${serverURL}/buildings`;
            getFavUrl = `${serverURL}/favorites/buildings`;
    
        } else if (filter_option === 'Classroom') {
            url = `${serverURL}/classrooms`;
            getFavUrl = `${serverURL}/favorites/classrooms`;
            setLoading(false);
            setObjects([]);
            return;

        } else if (filter_option === 'Course') {
            if (searchString.trim() === '') {
                setLoading(false);
                setObjects([]);
                return;
            }

            url = `${serverURL}/courses/` + searchString;
            getFavUrl = `${serverURL}/favorites/courses`;
        
        } else if (filter_option === 'Section') {
            if (searchString.trim() === '') {
                setLoading(false);
                setObjects([]);
                return;
            }

            url = `${serverURL}/sections/` + searchString;
            getFavUrl = `${serverURL}/favorites/sections`;

        } else {
            console.log("updateSidebar received incorrect filter option!");
            return;
        }

        // Query Backend        
        console.log("Url: " + url);
        axios.get(url).then((response) => {
            let data = response.data;
            //console.log(data);
            if (!loggedIn) {
                if (filter_option === 'Building') {
                    data.sort((a, b) => a.ShortCode.localeCompare(b.ShortCode));
    
                } else if (filter_option === 'Classroom') {
                    console.log("todo");
                } else if (filter_option === 'Course') {
                    data.sort((a, b) => a.courseNumber - b.courseNumber);
                }
                else if (filter_option === 'Section') {
                    data.sort((a, b) => a.Type.localeCompare(b.Type) || a.Crn - b. Crn);
                }
    
                if (sortOption === "des") 
                    data = data.reverse();

                setObjects(data);
                setLoading(false);
            }
            

            // If user is logged in, get their favorites
            if (loggedIn) {
                const config = {
                    headers:{
                        "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                    }
                };
                axios.get(getFavUrl, config).then((response) => {
                    let favorites = response.data;
                    let allFavorites = [];
                    let allNonFavorites = [];
                    console.log("Favorites:" );
                    console.log(favorites);

                    for (let i = 0; i < data.length; i++) {
                        if (filter_option === 'Building') {
                            if (favorites.some(e => e.ShortCode === data[i].ShortCode)) {
                                data[i]['isFavorite'] = true;
                                allFavorites.push(data[i]);
                            } else {
                                data[i]['isFavorite'] = false;
                                allNonFavorites.push(data[i]);
                            }
                        } else if (filter_option === 'Classroom') {
                            console.log("classrooms");
                        } else if (filter_option === 'Course') {
                            if (favorites.some(e => e.courseId === data[i].courseId)) {
                                data[i]['isFavorite'] = true;
                                allFavorites.push(data[i]);
                            } else {
                                data[i]['isFavorite'] = false;
                                allNonFavorites.push(data[i]);
                            }
                        } else if (filter_option === 'Section') {
                            if (favorites.some(e => e.id === data[i].Id)) {
                                data[i]['isFavorite'] = true;
                                allFavorites.push(data[i]);
                            } else {
                                data[i]['isFavorite'] = false;
                                allNonFavorites.push(data[i]);
                            }
                        }
                    }

                    if (filter_option === 'Building') {
                        allFavorites.sort((a, b) => a.ShortCode.localeCompare(b.ShortCode));
                        allNonFavorites.sort((a, b) => a.ShortCode.localeCompare(b.ShortCode));
                    } else if (filter_option === 'Classroom') {
                        console.log("todo");
                    } else if (filter_option === 'Course') {
                        allFavorites.sort((a, b) => a.courseNumber - b.courseNumber);
                        allNonFavorites.sort((a, b) => a.courseNumber - b.courseNumber);
                    }
                    else if (filter_option === 'Section') {
                        allFavorites.sort((a, b) => a.Type.localeCompare(b.Type) || a.Crn - b. Crn);
                        allNonFavorites.sort((a, b) => a.Type.localeCompare(b.Type) || a.Crn - b. Crn);
                    }

                    if (sortOption === "des") {
                        allFavorites = allFavorites.reverse()
                        allNonFavorites = allNonFavorites.reverse()
                    }

                    data = allFavorites.concat(allNonFavorites);


                    //console.log(data)
                    setObjects(data);
                    setLoading(false);
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
            }    
        }).catch((error) => {
            // console.log(error);
            setLoading(false);
        });



    }


    function setItem(itemHead_in, firstRow_in, secondRow_in, thirdRow_in, dataType, dataID, isFavorite) {
        return(
            <ListItem key = {dataID}
                    itemHead = {itemHead_in}
                    firstRow = {firstRow_in}
                    secondRow = {secondRow_in}
                    thirdRow = {thirdRow_in}
                    dataType = {dataType}
                    dataID = {dataID}
                    isFavorite = {isFavorite}
                    onClick = {(e)=> {props.onClick(e)}}/>
        );
    }

    function ListItem(props) {
        ListItem.propTypes = {
            itemHead: PropTypes.string,
            firstRow: PropTypes.string,
            secondRow: PropTypes.string,
            thirdRow: PropTypes.string,
            dataType: PropTypes.string,
            dataID: PropTypes.string,
            isFavorite: PropTypes.bool,
            onClick: PropTypes.func,
        };
    
        let [itemHead, firstRow, secondRow, thirdRow, dataType, dataID, isFavorite] = [props.itemHead, props.firstRow, props.secondRow, props.thirdRow, props.dataType, props.dataID, props.isFavorite];
    
        const handleChange = (e) => {
            setLoading(true);
            if (e.filter === "Course") {
                filter = "Section";
                prevDesc = itemHead;
                searchString = e.searchStr;
                
                // Following two lines are for testing sending user to schedule page
                //navigate('/schedule?sch_type='+e.filter+'&sch_id='+searchString);
                //return;
            } else if (e.filter === "Building") {
                filter = "Classroom";
                prevDesc = itemHead;
                searchString = e.searchStr;
                // document.getElementById("classroom").checked = true;
                props.onClick(firstRow);
            } else if (e.filter === "Section") {
                //props.onClick(thirdRow.substring(10));
            }
            
            populateSidebar(filter)
        }

        const changeFavorite = (e) => {
            console.log(e)
            let method = "";
            let url = "";
            if (e.category === "Building") {
                url = `${serverURL}/favorites/buildings/${e.id}`;
                if (e.isFavorite) {
                    method = "DELETE";
                } else {
                    method = "POST";
                }
                
            }
            else if (e.category === "Classroom") {
                // url = `${serverURL}/favorites/rooms/${e.id}`;
                // if (e.isFavorite) {
                //     method = "DELETE";
                // } else {
                //     method = "POST";
                // }
            }
            else if (e.category === "Course") {
                url = `${serverURL}/favorites/courses/${e.id}`;
                if (e.isFavorite) {
                    method = "DELETE";
                } else {
                    method = "POST";
                }
            }
            else if (e.category === "Section"){
                url = `${serverURL}/favorites/sections/${e.id}`;
                if (e.isFavorite) {
                    method = "DELETE";
                } else {
                    method = "POST";
                }
            }

            axios({
                url: url,
                headers:{
                    "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                },
                method: method,
            }).then((response) => {
                isFavorite = !e.isFavorite;
                //console.log(response)
            }).catch((error) => {
                console.log(error);
            });

        }

    
    
        return(
            <div className = "listItemContainer" onClick={() => {handleChange({filter: dataType, searchStr: dataID})}}>
                <div className = "listItemInfo" >
                    <h2 className = "ItemHead" style={{margin: "0"}}>
                        {itemHead}
                    </h2>
                    <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                        {firstRow}
                    </p>
                    <p className = "secondRow" style={{margin: "5px 0 0 0"}}>
                        {secondRow}
                    </p>
                    <p className = "thirdRow" style={{margin: "5px 0 0 0"}}>
                        {thirdRow}
                    </p>
                </div>
                {loggedIn && (
                    <div className = "favoriteStar" >
                        {isFavorite && (
                            <input className = "star" type="checkbox" defaultChecked = "checked" onClick={(e) => {e.stopPropagation(); changeFavorite({category: dataType, id: dataID, isFavorite: isFavorite})}}></input>
                        )}
                        {!isFavorite && (
                            <input className = "star" type="checkbox" onClick={(e) => {e.stopPropagation(); changeFavorite({category: dataType, id: dataID, isFavorite: isFavorite})}}></input>
                        )}
                    </div>
                )}

            </div>
        );
    }

    const handleChange = (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            // Get search string from text field
            var searchStr = null;
            if (document.getElementById('search-input') !== null) {
                searchStr = document.getElementById('search-input').value;
            }            

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
            if (filter === "Building") {
                props.onClick('');
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
                    {setItem(course.subjectAbbreviation + " " + course.courseNumber, 
                        course.title, 
                        course.creditHours + " Credit Hours", 
                        "Description: " + ((course.description.length > 0) ? course.description : "None"), 
                        "Course",
                        course.courseId,
                        course.isFavorite)}
                </div>
            ))
        } else if (filter === 'Section') {
            return objects.map((section, index) => (
                <div key={index}>
                    {setItem(prevDesc + " - " + section.Type + " - " + section.Crn, 
                    "Meeting day(s): " + section.Meetings[0].DaysOfWeek, 
                    "Instructor: " + section.Meetings[0].Instructors[0].Name, 
                    "Location: " + section.Meetings[0].Room.Building.ShortCode + " " + section.Meetings[0].Room.Number, 
                    "Section", 
                    section.Id,
                    section.isFavorite)}
                </div>
            ))
        } else if (filter === 'Building') {
            let filtered = [];
            
            // Filter for buildings with name or shortcode containing search string
            for (let i = 0; i < objects.length; i++) {
                if (searchString !== null && searchString !== undefined && objects[i].Name !== undefined && objects[i].ShortCode !== undefined) {
                    // console.log(searchString, objects[i].Name, objects[i].ShortCode)
                    if (objects[i].Name.toLowerCase().includes(searchString.toLowerCase()) || 
                        objects[i].ShortCode.toLowerCase().includes(searchString.toLowerCase())) {
                        filtered.push(objects[i]);
                    }
                }
            }

            if (filtered.length === 0) {
                return null;
            }

            return filtered.map((building, index) => (
                <div key={index}>
                    {setItem(building.ShortCode, 
                        building.Name, 
                        "", 
                        "",
                        "Building", 
                        building.ShortCode,
                        building.isFavorite)}
                        {/* TODO: Need rooms to also be returned */}
                </div>
            ))
        } else if (filter === 'Classroom') {
            // TODO: Confirm this works when server can return this data
            return objects.map((classroom, index) => (
                <div key={index}>
                    {setItem(classroom.number, 
                        classroom.Building.Name, 
                        classroom.Meetings.length + " meetings per week", 
                        "",
                        "Classroom", 
                        classroom.classroomId,
                        classroom.isFavorite)}
                </div>
            ))
        } else {
            console.log('No other filtering option should occur.');
        }
        
    }

    // Used to display all buildings on route choosing
    const [buildings, setBuildings] = useState([]);
    useEffect(() => {
        var url = `${serverURL}/buildings`;
        axios.get(url).then((response) => {
            setBuildings(response.data.sort((a, b) => a.ShortCode.localeCompare(b.ShortCode)));
        });
    }, []);


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

            <div className="popup_overlay" id="Map_Routing">
                  <div className="popup_wrapper">
                      <h1>Routing</h1>
                      <a href="#" className="close">&times;</a>
                      <div className="content">
                          <div className="popup_container">
                              <form>
                                    <h5>Choose Your Starting and Ending Locations</h5>
                                    <div className="popup_box">
                                        <label>Start:</label>
                                        <select id="origin_building">
                                            {buildings.map((building, index) => (
                                                <option key={index} value={building.ShortCode}>{building.ShortCode}</option>
                                            ))}
                                        </select>
                                        <br/>

                                        <label>End:</label>
                                        <select id="destination_building">
                                            {buildings.map((building, index) => (
                                                <option key={index} value={building.ShortCode}>{building.ShortCode}</option>
                                            ))}
                                        </select>
                                    </div>
                              </form>
                          </div>
                      </div>
                        <a href="#" className="close2">
                            <button className="showRoute" onClick={() => props.onRouteClick(document.getElementById('origin_building').value, document.getElementById('destination_building').value)}>Show Route</button>
                        </a>
                        <hr></hr>
                        <label className="txt">
                            <input type="radio"
                                id="routeMethod_w"
                                name="route_option"
                                value="walking"
                                defaultChecked="True"
                                onChange={() => {props.onRouteMethodChange('walking')}} />
                            Walking
                        </label>
                        <label className="txt">
                            <input type="radio"
                                id="routeMethod_b"
                                name="route_option"
                                value="biking"
                                onChange={() => {props.onRouteMethodChange('biking')}} />
                            Biking
                        </label>
                        <label>
                            <input type="radio"
                                id="routeMethod_d"
                                name="route_option"
                                value="driving"
                                onChange={() => {props.onRouteMethodChange('driving')}} />
                            Driving
                        </label>
                  </div>
              </div>
        </div>
    );
}

export default SideBar;


