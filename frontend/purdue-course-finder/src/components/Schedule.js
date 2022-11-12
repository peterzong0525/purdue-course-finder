import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../index.js';
import './Schedule.css'

var allSections = [];
var hiddenEvents = [];
function Schedule() {
    const navigate = useNavigate();
    // sch_type = Course/Section/Classroom/null if accessing personal schedule
    // sch_id = course/section/classroom id
    const [searchParams, setSearchParams] = useSearchParams();
    const scheduleType = searchParams.get("sch_type");
    const scheduleId = searchParams.get("sch_id");
    const [headerText, setHeaderText] = useState('');
    //const [allSections, setAllSections] = useState([]);
    const [eventsComplete, setEventsComplete] = useState(false);   
    
    
    useEffect(() => {
        if (!scheduleType && window.sessionStorage.getItem("userToken") === null) {
            //user is not logged in, redirect to /login
            navigate('/login');
            return;
        }
        addAllScheduleEvents();
    }, [])

    useEffect(() => {
        if (eventsComplete){
        console.log("complete")
        console.log(allSections)
        console.log(hiddenEvents)
        displayEvents()
        }
    }, [eventsComplete])

    async function displayEvents() {
        const mapped = allSections.map((section, index) => (
            <div data-hiddenMap = {index} key = {index}>
                {section}
            </div>
        ))
        // setHiddenEvents(allSections.map((section, index) => (
        //     <div className = "hidden-event" data-hiddenmap = {index} key = {index+1000}>
        //         {section}
        //     </div>
        // )))
        console.log(mapped[0].props.children.props.children.props.children[0])
    }

    async function addAllScheduleEvents() {
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
            await axios.get(url, config).then((response) => {
                console.log(response.data)
                for (let i = 0; i < response.data.length; i++) {
                    favoriteSections = favoriteSections.concat(addOneSection(response.data[i]));
                }
                allSections = allSections.concat(favoriteSections)
                
            }).catch((error) => {
                console.log(error);
            });
            setEventsComplete(true);
        } else if (scheduleType === 'Course') {
            await addOneCourse(scheduleId)
            setEventsComplete(true)
           
        } else if (scheduleType === 'Section') {
            // TODO Need new section endpoint that returns only specific section with meetings
            let url = `${serverURL}/section/` + scheduleId;
            await axios.get(url).then((response) => {
                setHeaderText(response.data.Type + " - " + response.data.Crn);
                //setAllSections(addOneSection(response.data));
            }).catch((error) => {
                console.log(error);
            });
            setEventsComplete(true)
        } else if (scheduleType === 'Classroom') {
            console.log("TODO classrooms")
        } else {
            console.log("Error: Invalid schedule type entered: " + scheduleType)
        }
    }

    
    async function addOneCourse(courseID) {
        let courseSections = [];
        let url = `${serverURL}/sections/` + courseID;
        await axios.get(url).then((response) =>{
            setHeaderText("My Schedule");
            for (let i = 0; i < response.data.length; i++) {
                courseSections = courseSections.concat(addOneSection(response.data[i]));
            }

            allSections = allSections.concat(courseSections)
            console.log(allSections)
        }).catch((error) => {
            console.log(error);
        });
        return;
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
            <div className={className} key={sectionData.Meetings[0].Id+index} style={{position: "absolute"}}
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
        let startHour = startTimeDate.getUTCHours() - 1;
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

        // If no meetings for this section/course (some exammples are CS 182, CS 183)
        if (height === 0) {
            return;
        }

        // Temporary random colors
        const map_section_type_to_color = {
            "Distance Learning": "#FFFFFF",
            "Experiential": "#BBBBBB",
            "Individual Study": "#123123",
            "Laboratory": "#63F3CA",
            "Lecture": "#1CD2FF",
            "Practice Study Observation": "#63F393",
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

        let instructors = meetingData.Instructors.map(({Name}) => " " +  Name).toString();

        let refIndex = hiddenEvents.length;        
        
        const _handleHideEventONHiddenEvents = () => {
            let hiddenEvent = document.querySelectorAll('[data-forhideid="' + meetingData.Id + 'hidden"]')[0];
            hiddenEvent.setAttribute('data-hidden',"true");
            let shownScheduleEvent = document.querySelectorAll('[data-forhideid="' + meetingData.Id + 'schedule"]');
            shownScheduleEvent.forEach((element) => element.setAttribute('data-show', "true"));
        }

        hiddenEvents = hiddenEvents.concat(
            <div className="hidden-event" data-forhideid={meetingData.Id+"hidden"} data-hidden="true" onClick={()=> _handleHideEventONHiddenEvents()} key={refIndex}>
                Checking index: {refIndex}
            </div>
        )



        const _handleHideEventOnSchedule = () => {
            let hiddenEvent = document.querySelectorAll('[data-forhideid="' + meetingData.Id + 'hidden"]')[0];
            hiddenEvent.setAttribute('data-hidden', "false");
            let shownScheduleEvent = document.querySelectorAll('[data-forhideid="' + meetingData.Id + 'schedule"]');
            shownScheduleEvent.forEach((element) => element.setAttribute('data-show', "false"));
        }

        // Data displayed is not final
        return (
            <div className="schedule-event" data-forhideid={meetingData.Id+"schedule"} data-show="true" onClick={()=> _handleHideEventOnSchedule()} style={styleString}>
                Instructor(s): {instructors}
                <br></br>
                Meeting type: {meetingData.Type}
                <br></br>
                Length:{hourDisplay}{minuteDisplay}
                Index: {refIndex}
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
                <p className="header-txt">Schedule - {headerText}</p>
                <div className="hidden-events-container">
                    Hidden events:
                    <div className='hidden-events'>
                        {hiddenEvents}
                    </div>
                </div>
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