import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './favorites.css'
import PropTypes from 'prop-types';
import axios from 'axios';
import { serverURL } from '../index.js';


function Favorites() {
    const navigate = useNavigate();

    const [buildings, setBuildings] = useState(null);
    const [classrooms, setClassrooms] = useState(null);
    const [courses, setCourses] = useState(null);
    const [sections, setSections] = useState(null);
    
    useEffect(() => {
        if (window.sessionStorage.getItem("userToken") === null) {
            //user is not logged in, redirect to /login
            navigate('/login');
            return;
        }
        populateFavorites(true, true, true, true);
    }, [])

    function populateFavorites(buildings, classrooms, courses, sections) {
        const config = {
            headers:{
                "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
            }
        };
        
        // Get and set favorite buildings
        if (buildings) {
            let url = `${serverURL}/favorites/buildings`;
            axios.get(url, config).then((response) => {
                let data = response.data.sort((a, b) => a.ShortCode.localeCompare(b.ShortCode));
                setBuildings(displayObjects(data, "Building"));
            }).catch((error) => {
                console.log(error);
            })
        }


        // Get and set favorite classrooms
        /*
        if (classrooms) {
            let url = `${serverURL}/favorites/classrooms`;
            axios.get(url, config).then((response) => {
                let data = response.data
                setClassrooms(displayObjects(data, 'Classroom'));
                console.log(response);

            }).catch((error) => {
                console.log(error);
            })
        }
        */

        // Get and set favorite courses
        if (courses) {
            let url = `${serverURL}/favorites/courses`;
            axios.get(url, config).then((response) => {
                let data = response.data.sort((a, b) => a.courseNumber - b.courseNumber);
                setCourses(displayObjects(data, "Course"));

            }).catch((error) => {
                console.log(error);
            })
        }

        //Get and set favorite sections
        if (sections) {
            let url = `${serverURL}/favorites/sections`;
            axios.get(url, config).then((response) => {
                let data = response.data.sort((a, b) => a.Type.localeCompare(b.Type) || a.Crn - b. Crn);
                setSections(displayObjects(data, 'Section'));

            }).catch((error) => {
                console.log(error);
            })
        }
    }

    function displayObjects(objects, type) {
        if (!objects.length) {
            return null;
        }

        if (type === 'Building') {
            return objects.map((building, index) => (
                <div key={index}>
                    {setItem(building.ShortCode, building.Name, "Building", building.ShortCode)}
                </div>
            ))
        } else if (type === 'Classroom') {
            return objects.map((classroom, index) => (
                <div key={index}>
                    {setItem("Room " + classroom.number, "Building: " + classroom.Building.Name, "Classroom", classroom.classroomId)}
                </div>
            ))
        } else if (type == 'Course') {
            return objects.map((course, index) => (
                <div key={index}>
                    {setItem(course.subjectAbbreviation + " " + course.courseNumber, course.title, "Course", course.courseId)}
                </div>
            ))
        } else if (type === 'Section') {
            return objects.map((section, index) => (
                <div key={index}>
                    {setItem(section.Type + " - " + section.Crn, "Course: " + section.course.subjectAbbreviation + " " + section.course.courseNumber, "Section", section.Id)}
                </div>
            ))
        } else {
            console.log("Error: type does not exist.");
        }
    }


    function setItem(itemHead_in, firstRow_in, dataType, dataID) {
        return(
            <ListItem key = {dataID}
                    itemHead = {itemHead_in}
                    firstRow = {firstRow_in}
                    dataType = {dataType}
                    dataID = {dataID}/>
        );
    }


    function ListItem(props) {
        ListItem.propTypes = {
            itemHead: PropTypes.string,
            firstRow: PropTypes.string,
            dataType: PropTypes.string,
            dataID: PropTypes.string,
        };

        const _handleClick = () => {
            if (props.dataType === "Building") {
                axios({
                    url: `${serverURL}/favorites/buildings/${props.dataID}`,
                    headers:{
                        "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                    },
                    method: "DELETE",
                }).then((response) => {
                    // Parameter order: building, classroom, course, section
                    populateFavorites(true, false, false, false);
                }).catch((error) => {
                    console.log(error)
                });

            } else if (props.dataType === "Classroom") {
                axios({
                    url: `${serverURL}/favorites/classrooms/${props.dataID}`,
                    headers:{
                        "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                    },
                    method: "DELETE",
                }).then((response) => {
                    populateFavorites(false, true, false, false);
                }).catch((error) => {
                    console.log(error)
                });

            } else if (props.dataType === "Course") {
                axios({
                    url: `${serverURL}/favorites/courses/${props.dataID}`,
                    headers:{
                        "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                    },
                    method: "DELETE",
                }).then((response) => {
                    populateFavorites(false, false, true, false);
                }).catch((error) => {
                    console.log(error)
                });

            } else if (props.dataType === "Section") {
                axios({
                    url: `${serverURL}/favorites/sections/${props.dataID}`,
                    headers:{
                        "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                    },
                    method: "DELETE",
                }).then((response) => {
                    populateFavorites(false, false, false, true);
                }).catch((error) => {
                    console.log(error)
                });

            } else {
                console.log("Error: Data type does not exist.")
            }
        }


        return(
            <div className = "listItem" >
                <div className = "listItemInfo" style={{padding: "0 10px 10px 10px"}}>
                    <h2 className = "ItemHead" style={{margin: "0"}}>
                        {props.itemHead}
                    </h2>
                    <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                        {props.firstRow}
                    </p>
                </div>
                <div className = "listItemDelete" onClick={()=>_handleClick()}>
                    <div className = "removeTxt">REMOVE</div>                   
                </div>

            </div>
        );
    }
  
  return (
    <div className = "favoritesPageContainer" data-testid="favoritesPageContainer">
        <div className='returnHomeContainer'>
            <a className='returnHome' href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 6">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                </svg>
                Home
            </a>
        </div>
        <div className = "header">
            <h1>My Favorites</h1>
        </div>
        <div className = "favoritesContainer" data-testid="favoritesContainer">
            <div className = "favList" data-testid="favoriteBuildings">
                <div className = "favListHeader">
                    <h2>Buildings</h2>
                </div>
                <div className = "listItemContainer" >
                    {buildings}
                    {!buildings && (
                        <div className = "noFavorites" data-testid="noFavorites">
                            You have no favorite buildings.
                        </div>
                    )}
                </div>
            </div>
            <div className = "favList" data-testid="favoriteClassrooms">
                <div className = "favListHeader">
                    <h2>Classrooms</h2>
                </div>
                <div className = "listItemContainer">
                    {classrooms}
                    {!classrooms && (
                        <div className = "noFavorites" data-testid="noFavorites">
                            You have no favorite classrooms.
                        </div>
                    )}
                </div>
            </div>
            <div className = "favList" data-testid="favoriteCourses">
                <div className = "favListHeader">
                    <h2>Courses</h2>
                </div>
                <div className = "listItemContainer">
                    {courses}
                    {!courses && (
                        <div className = "noFavorites" data-testid="noFavorites">
                            You have no favorite courses.
                        </div>
                    )}
                </div>
            </div>
            <div className = "favList"  data-testid="favoriteSections">
                <div className = "favListHeader">
                    <h2>Sections</h2>
                </div>
                <div className = "listItemContainer">
                    {sections}
                    {!sections && (
                        <div className = "noFavorites" data-testid="noFavorites">
                            You have no favorite sections.
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Favorites;