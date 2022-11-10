import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../index.js';
import './Schedule.css'

function Schedule() {
    const navigate = useNavigate();
    // sch_type = Course/Section/Classroom/null if accessing personal schedule
    // sch_id = course/section/classroom id
    const [searchParams, setSearchParams] = useSearchParams();
    const scheduleType = searchParams.get("sch_type");
    const scheduleId = searchParams.get("sch_id");
    const [headerText, setHeaderText] = useState('');
    const [allSections, setAllSections] = useState([]);
    
    useEffect(() => {
        if (/*!*/scheduleType && window.sessionStorage.getItem("userToken") === null) {
            //user is not logged in, redirect to /login
            navigate('/login');
            return;
        }
        addAllScheduleEvents();
    }, [])

    function addAllScheduleEvents() {
        if (!scheduleType) {
            // TODO Need Meeting data and item keys to be capitalized
            setHeaderText("My Favorite Sections");
            const config = {
                headers:{
                    "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                }
            };
            let favoriteSections = [];
            let url = `${serverURL}/favorites/sections`;
            axios.get(url, config).then((response) => {
                console.log(response.data)
                for (let i = 0; i < response.data.length; i++) {
                    favoriteSections.push(addOneSection(response.data[i]));
                }
                setAllSections(
                    favoriteSections.map((section, index) => (
                        <div className={section.Id} key={index} style={{position: "absolute"}}>
                            {section}
                        </div>
                    ))
                )

            }).catch((error) => {
                console.log(error);
            });
        } else if (scheduleType === 'Course') {
            addOneCourse(scheduleId)
           
        } else if (scheduleType === 'Section') {
            // TODO Need new section endpoint that returns only specific section with meetings
            let url = `${serverURL}/section/` + scheduleId;
            axios.get(url).then((response) => {
                setHeaderText(response.data.Type + " - " + response.data.Crn);
                setAllSections(addOneSection(response.data));
            }).catch((error) => {
                console.log(error);
            });
        } else if (scheduleType === 'Classroom') {
            console.log("TODO classrooms")
        } else {
            console.log("Error: Invalid schedule type entered: " + scheduleType)
        }
    }

    
    function addOneCourse(courseID) {
        let courseSections = [];
        let url = `${serverURL}/sections/` + courseID;
        axios.get(url).then((response) =>{
            setHeaderText("My Schedule");
            for (let i = 0; i < response.data.length; i++) {
                courseSections.push(addOneSection(response.data[i]));
            }
            let currentSections = allSections;
            console.log(currentSections)
            setAllSections(
                currentSections.concat(
                    courseSections.map((section, index) => (
                        <div className={section.Id} key={index} style={{position: "absolute"}}>
                            {section}
                        </div>
                    ))
                )
            )
            console.log(currentSections)
        }).catch((error) => {
            console.log(error);
        });
    }

    function addOneSection(sectionData) {
        let sectionMeetings = [];
        let daysOfWeek = sectionData.Meetings[0].DaysOfWeek.split(", ");
        daysOfWeek.forEach(day => {
            sectionMeetings.push(addOneMeeting(day, sectionData.Meetings[0]));
        });
        let className = "meeting-container " + sectionData.Meetings[0].Id;

        function setHover(className, enterOrExit /*true on enter, false on exit */) {
            let elements = document.getElementsByClassName(className)
            if (enterOrExit) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].setAttribute('selected', '1');
                }
            } else {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].removeAttribute('selected');
                }
            }

        }
        return sectionMeetings.map((meeting, index) => (
            <div className={className} key={index} style={{position: "absolute"}}
                onMouseEnter={()=>{setHover(className, true)}}
                onMouseLeave={()=>{setHover(className, false)}}>
                {meeting}
            </div>
        ))
    }
    

    function addOneMeeting(dayOfWeek, meetingData) {     
        let startTime = meetingData.StartTime;
        let durationLength = meetingData.Duration;
        let sectionType = meetingData.Type;        
        /*  Expected formats:  
              dayOfWeek: Sunday/Monday/Tuesday...
              startTime: 2022-11-04T15:30:00.000+00:00
              durationLength: PT1H50M
              sectionType: Lecture, Practice Study Observation, Distance Learning...
        */
        const baseLeftLoc = "52";
        const map_DofW_to_number = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6
        }
        let posFromLeft = "calc(" + baseLeftLoc + "px + " + map_DofW_to_number[dayOfWeek] + " * ((100vw - 67px) / 7))";

        const baseTopLoc = 27.5;
        let startTimeDate = new Date(startTime);
        let startHour = startTimeDate.getUTCHours();
        let startMinute = startTimeDate.getUTCMinutes();
        let posFromTop = baseTopLoc + (((startHour * 61) + startMinute) * 2);

        let durationObject = durationLength.substring(2);
        let durationHours = 0;
        if (durationObject.indexOf('H') !== -1) {
            durationHours = durationObject.substring(0, durationObject.indexOf('H'));
            durationObject = durationObject.substring(durationObject.indexOf('H') + 1);
        }
        let durationMinutes = 0;
        if (durationObject.indexOf('M') !== -1) {
            durationMinutes = durationObject.substring(0, durationObject.indexOf('M'));
        }
        let minuteDisplay = (parseInt(durationMinutes) > 0) ? " " + durationMinutes + " Minutes": " ";
        durationMinutes = parseInt(durationMinutes) + parseInt(durationHours * 60);
        let height = durationMinutes * 2;

        // Temporary random colors
        const map_section_type_to_color = {
            "Distance Learning": "#FFFFFF",
            "Experiential": "#BBBBBB",
            "Individual Study": "#123123",
            "Laboratory": "#63F3CA",
            "Lecture": "#1CD2FF",
            "Practice Study Observation": "#000000",
            "Recitation": "#A40101"
        }

        let styleString = {
            transform: "translate(" + posFromLeft + ", " + posFromTop + "px)",
            height: height + "px",
            backgroundColor: map_section_type_to_color[sectionType]
        }

        let hourDisplay = " ";
        if (parseInt(durationHours) > 1) {
            hourDisplay =  " " + durationHours + " Hours"
        } else if (parseInt(durationHours) == 1) {
            hourDisplay =  " " + durationHours + " Hour"
        }
        
        

        // Data displayed is not final
        return (
            <div className="schedule-event" style={styleString}>
                Instructor(s): {meetingData.Instructors.map(({Name}) => Name)}
                <br></br>
                Meeting type: {meetingData.Type}
                <br></br>
                Length:{hourDisplay}{minuteDisplay}
            </div>
        )
    }

    


    const generateGrids = () => {
        let grids = [<div key="none"/>];
        let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let times = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            grids.push(
                <div className="grid-day">
                    {weekdayNames[dayOfWeek]}
                </div>
            )
        }
        for (let row = 0; row < 24; row++) {
            grids.push(
                <div className="grid-time">
                    {times[row]}
                </div>
            )
            for (let col = 0; col < 7; col++) {
                grids.push(
                    <div className="grid-item"></div>
                )
            }
        }

        return grids.map((grid, index) => (
            <div className="grid-container" key={index}>
                {grid}
            </div>
        ))
    }

    let scrollElement = document.querySelector('.schedule-container');
    if (scrollElement)
        scrollElement.scrollTop = 950;

    
  
    return (
        <div className="schedule-page-container">
            <div className="header-container">
                <a className="return-home" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 5">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>
                </a>
                <p className="header-txt">Class Schedule - {headerText}</p>
            </div>
            <div className="schedule-container">
                {generateGrids()}
                {allSections}
                
                {/* {addOneSection("Tuesday", "2022-11-04T01:55:00.000+00:00", "PT2H30M", "Lecture")}
                {addOneSection("Sunday", "2022-11-04T05:25:00.000+00:00", "PT1H15M", "Recitation")}
                {addOneSection("Saturday", "2022-11-04T15:30:00.000+00:00", "PT50M", "Laboratory")} */}
            </div>
        </div>
    );
}

export default Schedule;