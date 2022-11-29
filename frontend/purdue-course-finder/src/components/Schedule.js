import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../index.js';
import './Schedule.css'

var allSections = [];
var hiddenEvents = [];
var hiddenKey = 0;
function Schedule() {
    const navigate = useNavigate();
    // sch_type = Course/Section/Classroom/null if accessing personal schedule
    // sch_id = course/section/classroom id
    const [searchParams, setSearchParams] = useSearchParams();
    const scheduleType = searchParams.get("sch_type");
    const scheduleId = searchParams.get("sch_id");
    const [headerText, setHeaderText] = useState('');
    const [eventsComplete, setEventsComplete] = useState(false);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        if (!scheduleType && window.sessionStorage.getItem("userToken") === null) {
            //user is not logged in, redirect to /login
            navigate('/login');
            return;
        }
        addAllScheduleEvents();
    }, [])

    useEffect(() => {
        let scrollElement = document.querySelector('.schedule-container');
        if (scrollElement)
            scrollElement.scrollTop = 1000;
    }, [eventsComplete])



    async function addAllScheduleEvents() {
        if (!scheduleType) {
            setHeaderText("Schedule of my Favorite Sections");
            const config = {
                headers:{
                    "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                }
            };
            let favoriteSections = [];
            let url = `${serverURL}/favorites/sections`;
            await axios.get(url, config).then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    favoriteSections = favoriteSections.concat(addOneSection(response.data[i]));
                }
                allSections = allSections.concat(favoriteSections)
                
            }).catch((error) => {
                console.log(error);
            });
            setEventsComplete(true);
        } else if (scheduleType === 'Course') {
            let url = `${serverURL}/sections/` + scheduleId;
            await axios.get(url).then(async (response) =>{
                let headerTxt = "";
                let courseSections = [];
                for (let i = 0; i < response.data.length; i++) {
                    await axios.get(`${serverURL}/section/` + response.data[i].Id).then((sectionResponse) => {
                        headerTxt = "Course Schedule: " + sectionResponse.data.course.subjectAbbreviation + " " + sectionResponse.data.course.courseNumber;
                        courseSections = courseSections.concat(addOneSection(sectionResponse.data));
                    }).catch((error) => {
                        console.log(error);
                    });
                    
                }
                setHeaderText(headerTxt);
                allSections = allSections.concat(courseSections)
            }).catch((error) => {
                console.log(error);
            });

            setEventsComplete(true);
           
        } else if (scheduleType === 'Section') {
            let url = `${serverURL}/section/` + scheduleId;
            await axios.get(url).then((response) => {
                let data = response.data;
                setHeaderText("Section Schedule: " + data.course.subjectAbbreviation + " " + data.course.courseNumber + " - " + data.Type + " " + data.Crn);
                allSections = addOneSection(response.data);
            }).catch((error) => {
                console.log(error);
            });
            setEventsComplete(true);

        } else if (scheduleType === 'Classroom') {
            let url = `${serverURL}/schedule/room/` + scheduleId;
            await axios.get(url).then(async (response) => {
                let classroomSections = [];
                if (response.data[0].Meetings[0].Room)
                    setHeaderText("Room Schedule: " + response.data[0].Meetings[0].Room.Building.ShortCode + " " + response.data[0].Meetings[0].Room.Number)
                for (let i = 0; i < response.data.length; i++) {
                    await axios.get(`${serverURL}/section/` + response.data[i].Id).then((sectionResponse) => {
                       classroomSections = classroomSections.concat(addOneSection(sectionResponse.data));
                    }).catch((error) => {
                        console.log(error);
                    });
                }

                allSections = allSections.concat(classroomSections);
            }).catch((error) => {
                console.log(error);
            });
            setEventsComplete(true);
        } else {
            console.log("Error: Invalid schedule type entered: " + scheduleType)
        }
    }


    function addOneSection(sectionData) {
        let sectionMeetings = [];
        let daysOfWeek = sectionData.Meetings[0].DaysOfWeek.split(", ");
        daysOfWeek.forEach(day => {
            sectionMeetings.push(addOneMeeting(day, sectionData));
        });
        let className = "meeting-container " + sectionData.Meetings[0].Id;

        function setHover(className, enterOrExit /*true on enter, false on exit */) {
            let elements = document.getElementsByClassName(className)
            if (enterOrExit) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].setAttribute('selected', '1');
                    elements[i].children[0].children[1].style.opacity = '1';
                }
            } else {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].removeAttribute('selected');
                    elements[i].children[0].children[1].style.opacity = '0';
                }
            }

        }

        return sectionMeetings.map((meeting) => (
            <div className={className} key={sectionData.Meetings[0].Id+hiddenKey++} style={{position: "absolute"}}
                onMouseEnter={()=>{setHover(className, true)}}
                onMouseLeave={()=>{setHover(className, false)}}>
                {meeting}
            </div>
        ))
    }
    

    function addOneMeeting(dayOfWeek, sectionData) {   
        let meetingData = sectionData.Meetings[0];
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
        let startHour = startTimeDate.getHours();
        let startMinute = startTimeDate.getMinutes();

        let endTimeDate = new Date(startTimeDate);

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

        endTimeDate.setMinutes(startMinute + durationMinutes)

        let height = durationMinutes * 2;

        // If no meetings for this section/course (some exammples are CS 182, CS 183)
        if (height === 0) {
            return;
        }

        const map_section_type_to_color = {
            "Clinic": "#E83E8B",
            "Clinic 1": "#E83E8B",
            "Clinic 2": "#E83E8B",
            "Clinic 3": "#E83E8B",
            "Clinic 4": "#E83E8B",
            "Distance Learning": "#AAF979",
            "Experiential": "#E9A013",
            "Individual Study": "#DBDD25",
            "Lab 1": "#4778E9",
            "Laboratory": "#63F3CA",
            "Laboratory Preparation": "#52E348",
            "Lecture": "#1CD2FF",
            "Lecture 1": "#1CD2FF",
            "Practice Study Observation": "#F17938",
            "Presentation": "#BDDD25",
            "Presentation 1": "#BDDD25",
            "Recitation": "#F9C879",
            "Research": "#6B3BE4",
            "Studio": "#933BE4",
            "Studio 1": "#933BE4",
            "Travel Time": "#BD3BE4",
            "Travel Time 1": "#BD3BE4",
            "Travel Time 2": "#BD3BE4"
        }

        const map_section_type_to_abbr = {
            "Clinic": "CLN",
            "Clinic 1": "CLN1",
            "Clinic 2": "CLN2",
            "Clinic 3": "CLN3",
            "Clinic 4": "CLN4",
            "Distance Learning": "DIS",
            "Experiential": "EX",
            "Individual Study": "IND",
            "Lab 1": "LAB1",
            "Laboratory": "LAB",
            "Laboratory Preparation": "LBP",
            "Lecture": "LEC",
            "Lecture 1": "LEC1",
            "Practice Study Observation": "PSO",
            "Presentation": "PRS",
            "Presentation 1": "PRS1",
            "Recitation": "REC",
            "Research": "RES",
            "Studio": "SD",
            "Studio 1": "SD1",
            "Travel Time": "TT",
            "Travel Time 1": "TT1",
            "Travel Time 2": "TT2"
        }

        let styleString = {
            transform: "translate(" + posFromLeft + ", " + posFromTop + "px)",
            height: height + "px",
            backgroundColor: map_section_type_to_color[sectionType]
        }
     
        const _handleShowEventOnSchedule = () => {
            for (let i = 0; i < hiddenEvents.length; i++) {
                if (hiddenEvents[i].props["data-forhideid"] == meetingData.Id + "hidden") {
                    hiddenEvents.splice(i, 1);
                    break;
                }
            }
            
            let shownScheduleEvent = document.querySelectorAll('[data-forhideid="' + meetingData.Id + 'schedule"]');
            shownScheduleEvent.forEach((element) => element.setAttribute('data-show', "true"));
            setRefresh((refresh)=>!refresh);
        }

        const _handleHideEventOnSchedule = () => {
            hiddenEvents = hiddenEvents.concat(
                <div className="hidden-event" data-forhideid={meetingData.Id+"hidden"} 
                    onClick={(e)=> _handleShowEventOnSchedule(e)} key={hiddenKey++}
                    style={{backgroundColor: map_section_type_to_color[sectionType]}}>
                    {sectionData.course.subjectAbbreviation} {sectionData.course.courseNumber} {" - "}
                    {map_section_type_to_abbr[sectionType]} {sectionData.Crn}
                </div>
            )

            let shownScheduleEvent = document.querySelectorAll('[data-forhideid="' + meetingData.Id + 'schedule"]');
            shownScheduleEvent.forEach((element) => element.setAttribute('data-show', "false"));
            setRefresh((refresh)=>!refresh);
        }

        const _openPopup = async () => {
            document.getElementById("classTitle").innerHTML = sectionData.course.subjectAbbreviation + 
                " " + sectionData.course.courseNumber + " - " + sectionData.course.title;
            document.getElementById("courseDesc").innerHTML = sectionData.course.description;

            document.getElementById("sectionTypeCrn").innerHTML = "Section: " + sectionData.Type + " - " + sectionData.Crn;
            document.getElementById("sectionCapacity").innerHTML = "<b>Capacity:</b> " + sectionData.Capacity;
            document.getElementById("sectionEnrolled").innerHTML = "<b>Enrolled:</b> " + sectionData.Enrolled;
            document.getElementById("sectionRemaining").innerHTML = "<b>Remaining space:</b> " + sectionData.RemainingSpace;
            document.getElementById("sectionStartDate").innerHTML = "<b>Start Date:</b> " + (new Date(sectionData.StartDate)).toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})
            document.getElementById("sectionEndDate").innerHTML = "<b>End Date:</b> " + (new Date(sectionData.EndDate)).toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})        
        
            document.getElementById("meetingDaysOfWeek").innerHTML = "<b>Meeting Days:</b> " + meetingData.DaysOfWeek;
            document.getElementById("meetingTime").innerHTML = "<b>Meeting Time:</b> " + 
                startTimeDate.toLocaleTimeString('en-US', {hour:'numeric', minute: '2-digit'}) +
                " - " + endTimeDate.toLocaleTimeString('en-US', {hour:'numeric', minute: '2-digit', timeZoneName: 'short'});
            let minuteDisplay = (parseInt(durationMinutes) > 0) ? " " + (durationMinutes - durationHours*60) + " Minutes": " ";
            let hourDisplay = " ";
            if (parseInt(durationHours) > 1) {
                hourDisplay =  " " + durationHours + " Hours"
            } else if (parseInt(durationHours) == 1) {
                hourDisplay =  " " + durationHours + " Hour"
            }
            document.getElementById("meetingDuration").innerHTML = "<b>Duration:</b> " + hourDisplay + " " + minuteDisplay;
            document.getElementById("meetingInstructors").innerHTML = "<b>Instructors:</b> " + meetingData.Instructors.map(({Name}) => Name);
        
            document.getElementById("locationBuilding").innerHTML = "<b>Building:</b> " + meetingData.Room.Building.Name + " (" + meetingData.Room.Building.ShortCode + ")";
            document.getElementById("locationRoom").innerHTML = "<b>Room:</b> " + meetingData.Room.Number;
        
            if (document.getElementsByClassName("event-popup")[0].style.scale == "1") {
                document.getElementsByClassName("event-popup")[0].style.scale = "0";
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            document.getElementsByClassName("event-popup")[0].style.scale = "1";
        }

        return (
            <div className="schedule-event" onClick={()=>{_openPopup()}} data-forhideid={meetingData.Id+"schedule"} data-show="true" style={styleString}>
                <div className="event-details">
                    <div><u>{sectionData.course.subjectAbbreviation} {sectionData.course.courseNumber}</u></div>
                    <div>{meetingData.Type} - {sectionData.Crn}</div>
                    <div>
                        {startTimeDate.toLocaleTimeString('en-US', {hour:'numeric', minute: '2-digit'})} - {endTimeDate.toLocaleTimeString('en-US', {hour:'numeric', minute: '2-digit'})}
                    </div>
                    <div>{meetingData.Room.Building.ShortCode} {meetingData.Room.Number}</div>
                </div>
                <div className="close" onClick={(e) => {e.stopPropagation(); _handleHideEventOnSchedule()}}>
                    &times;
                </div>
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
            <div className="grid-container" key={index} data-testid="gridContainer">
                {grid}
            </div>
        ))
    }



    
  
    return (
        <div className="schedule-page-container">
            <div className="header-container" data-testid="scheduleHeader">
                <a className="return-home" href="/" data-testid="scheduleHome">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 5">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>
                </a>
                <p className="header-txt">{headerText}</p>
                <div className="hidden-events-container" data-testid="hiddenEventsContainer">
                    {hiddenEvents.length > 0 ? "Hidden events:": ""}
                    <div className='hidden-events' data-testid="hiddenEvents">
                        {hiddenEvents}

                    </div>
                </div>
            </div>
            <div className="schedule-container" data-testid="scheduleContainer">
                {generateGrids()}
                {allSections}
            </div>
            <Popup/>
        </div>
    );
}

export default Schedule;



function Popup() {
    const _closePopup = () => {
        document.getElementsByClassName("event-popup")[0].style.scale = "0";
        
    }
    return (
        <div className="event-popup">
            <div className="popup-details" style={{width:"100%"}} data-testid="eventPopup">
                <h1 id="classTitle" style={{textAlign: "center", marginTop: "-10px"}}></h1>
                <hr></hr>
                <p id="courseDesc"></p>
                <h2 id="sectionTypeCrn" style={{marginBlockEnd: "5px"}}></h2>
                <div className="popup-section-details" data-testid="sectionPopup">
                    <p id="sectionCapacity"></p>
                    <p id="sectionEnrolled"></p>
                    <p id="sectionRemaining"></p>
                    <p id="sectionStartDate"></p>
                    <p id="sectionEndDate"></p>
                </div>
                <div className="popup-meeting-details" data-testid="meetingPopup">
                    <p id="meetingDaysOfWeek"></p>
                    <p id="meetingTime"></p>
                    <p id="meetingDuration"></p>
                </div>
                <p id="meetingInstructors" style={{margin: "0 0 30px 0"}}></p>
                <div className="popup-location-details" data-testid="locationPopup">
                    <p id="locationBuilding"></p>
                    <p id="locationRoom"></p>
                </div>
            </div>
            <div className="popup-close" style={{marginLeft: "auto"}}>
                <div className="nav-cancel is-active" id="nav-cancel">
                    <svg style={{cursor: "pointer"}} onClick={()=>{_closePopup()}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                </div>
            </div>
        </div>
    );
}