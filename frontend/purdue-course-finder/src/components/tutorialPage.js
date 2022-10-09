import React from 'react';
import './tutorialPage.css'

function tutorialPage() {
    return(
        <div className='tutorialPageContainer'>
            <div className='returnHomeContainer'>
                <a className='returnHome' href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="Black" class="bi bi-arrow-left" viewBox="0 0 20 6">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>
                    Home
                </a>
            </div>
            <div className='mainContentContainer'>
                <h1 align='center'>How To Use The Purdue Course Finder</h1>
                <div className='contentsContainer'>
                    <h2>Contents</h2>
                    <ol className='contentsList'>
                        <li>
                            <a href='#User_Accounts'>User Accounts</a>
                            <ul>
                                <li>
                                    <a href='#Signing_Up'>Signing Up</a>
                                </li>
                                <li>
                                    <a href='#Logging_In'>Logging In</a>
                                </li>
                                <li>
                                    <a href='#Modifying_Account_Info'>Modifying Account Info</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href='#Favoriting_System'>Favoriting System</a>
                        </li>
                        <li>
                            <a href='#Personal_Shedules'>Personal Schedules</a>
                        </li>
                        <li>
                            <a href='#Navigation'>Navigation</a>
                            <ul>
                                <li>
                                    <a href='#Map'>Map</a>
                                </li>
                                <li>
                                    <a href='#Sidebar'>Sidebar</a>
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <div id='About'>
                    <h2>About</h2>
                    <p>
                        Many students see their schedule at the beginning of the year and must go 
                        searching for their classes. Making this process harder, Google Maps often 
                        doesn’t recognize building acronyms, making it even more difficult to find 
                        classroom locations. Our product will eliminate that issue by providing a map 
                        of Purdue which outlines buildings, classrooms, the courses in those classrooms, 
                        the time slots of those courses, and more. This map will also be searchable 
                        using the names or acronyms of buildings, or by using course numbers or titles. 
                        This will help students to find exactly where their classes are, find more 
                        information about the classrooms and buildings, and see the locations of other 
                        sections for their courses.
                    </p>
                    <p>
                        Currently, the only method of looking up classes is going to the Purdue course 
                        look-up page. Although this provides users with information about courses and 
                        who teaches them, the location is an abstraction. For example, room BHEE 129 
                        is a well-known room for many upperclassmen, but for new students, this might 
                        be a challenge to navigate to. Our software provides a map and building layout 
                        so students can visually see exactly where their classes are and don’t wander 
                        around on the first few days of the semester.  
                    </p>
                </div>
                <div id='User_Accounts'>
                    <hr></hr>
                    <h2>User Accounts</h2>
                    <p>Text Here</p>
                    <div className='subSection'>
                        <h3 id='Signing_Up'>Signing Up</h3>
                        <p>Text Here</p>
                        <h3 id='Logging_In'>Logging In</h3>
                        <p>Text Here</p>
                        <h3 id='Modifying_Account_Info'>Modifying Account Info</h3>
                        <p>Text Here</p>
                    </div>
                </div>
                <div id='Favoriting_System'>
                    <hr></hr>
                    <h2>Favoriting System</h2>
                    <p>Text Here</p>
                </div>
                <div id='Personal_Shedules'>
                    <hr></hr>
                    <h2>Personal Schedules</h2>
                    <p>Text Here</p>
                </div>
                <div id='Navigation'>
                    <hr></hr>
                    <h2>Navigation</h2>
                    <p>Text Here</p>
                    <div className='subSection'>
                        <h3 id='Map'>Map</h3>
                        <p>Text Here</p>
                        <h3 id='Sidebar'>Sidebar</h3>
                        <p>Text Here</p>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default tutorialPage;