import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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


    // On page load, scroll to scpeific starting time
    window.addEventListener('load', () => {
        let scrollElement = document.querySelector('.scheduleContainer');
        scrollElement.scrollTop = 700;
    });

    
  
    return (
        <div className="schedulePageContainer">
            <div className="headerContainer">
                <a className="returnHome" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 5">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>
                </a>
                <p className="header-txt">Class Schedule - {headerText}</p>
            </div>
            <div className="scheduleContainer">
                {generateGrids()}
                <div className="test">
                    Hola
                </div>
            </div>
        </div>
    );
}

export default Schedule;