import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../index.js';
import './Schedule.css'

function Schedule() {
    const navigate = useNavigate();
    // sch_type = course/section/classroom/null if accessing personal schedule
    // sch_id = course/section/classroom id
    const [searchParams, setSearchParams] = useSearchParams();
    const scheduleType = searchParams.get("sch_type");
    const scheduleId = searchParams.get("sch_type");
    const [headerText, setHeaderText] = useState('');
    
    useEffect(() => {
        setHeaderText("My Schedule");
        if (/*!*/scheduleType && window.sessionStorage.getItem("userToken") === null) {
            //user is not logged in, redirect to /login
            navigate('/login');
            return;
        }
    }, [])

    function addAllScheduleEvents() {

    }

    function addOneCourse() {

    }

    function addOneSection(/*sectionData*/dayOfWeek, startTime, durationLength, sectionType) {
        let sectionMeetings = [];
        let daysOfWeek = ['Sunday', 'Tuesday', 'Wednesday', 'Saturday']/*sectionData.Meetings.DaysOfWeek.split(", ")*/;
        daysOfWeek.forEach(day => {
            sectionMeetings.push(addOneMeeting(day, startTime, durationLength, sectionType));
        });
        let className = "meeting-container " + dayOfWeek//" section-id"

        function setSpecial(className, enterOrExit /*true on enter, false on exit */) {
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
                onMouseEnter={()=>{setSpecial(className, true)}}
                onMouseLeave={()=>{setSpecial(className, false)}}>
                {meeting}
            </div>
        ))
    }
    

    function addOneMeeting(dayOfWeek, startTime, durationLength, sectionType) {     
        /*  Expected formats:  
              dayOfWeek: Sunday/Monday/Tuesday...
              startTime: 2022-11-04T15:30:00.000+00:00
              durationLength: PT1H50M
              sectionType: Lecture, Practice Study Observation, Distance Learning...
        */

        const baseLeftLoc = "51.5";
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
        durationMinutes = parseInt(durationMinutes) + parseInt(durationHours * 60);
        let height = durationMinutes * 2;

        // Temporary random colors
        const map_section_type_to_color = {
            "Distance Learning": "#FFFFFF",
            "Experiential": "#BBBBBB",
            "Individual Study": "#123123",
            "Laboratory": "#321312",
            "Lecture": "#1CD2FF",
            "Practice Study Observation": "#000000",
            "Recitation": "#A40101"
        }

        let styleString = {
            transform: "translate(" + posFromLeft + ", " + posFromTop + "px)",
            height: height + "px",
            backgroundColor: map_section_type_to_color[sectionType]
        }

        return (
            <div className="schedule-event" style={styleString}>
                Details
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


    // On page load, scroll to specific starting time
    window.addEventListener('load', () => {
        let scrollElement = document.querySelector('.schedule-container');
        scrollElement.scrollTop = 950;
    });

    
  
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
                {addOneSection("Tuesday", "2022-11-04T01:55:00.000+00:00", "PT2H30M", "Lecture")}
                {addOneSection("Sunday", "2022-11-04T05:25:00.000+00:00", "PT1H15M", "Recitation")}
                {addOneSection("Saturday", "2022-11-04T15:30:00.000+00:00", "PT50M", "Laboratory")}
            </div>
        </div>
    );
}

export default Schedule;