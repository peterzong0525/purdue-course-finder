import React from 'react';
import './tutorialPage.css'

import signupImg from '../tutorial_images/signup_page.PNG'
import loginImg from '../tutorial_images/login_page.PNG'
import modifyNoeditImg from '../tutorial_images/modify_page_noedit.PNG'
import modifyEmaileditImg from '../tutorial_images/modify_page_emailedit.PNG'
import modifyPasseditImg from '../tutorial_images/modify_page_passedit.PNG'
import favoriteImg from '../tutorial_images/favoriting.PNG'
import homeImg from '../tutorial_images/home page.PNG'
import homeBuildingImg from '../tutorial_images/home page building selection.PNG'
import homeCourseImg from '../tutorial_images/home page course selection.PNG'
import courseScheduleImg from '../tutorial_images/course schedule page.PNG'
import filteringImg from '../tutorial_images/filtering.png'
import statisticsImg from '../tutorial_images/statistics.png'
import suggestionsImg from '../tutorial_images/suggestions.png'
import routingImg from '../tutorial_images/routing.png'

function Tutorial() {
    return(
        <div className='tutorialPageContainer'>
            <div className='returnHomeContainer'>
                <a className='returnHome' href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 6">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>
                    Home
                </a>
            </div>
            <div className='mainContentContainer'>
                <h1 style={{textAlign: "center"}}>How To Use The Purdue Course Finder</h1>
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
                        <li>
                            <a href='#Filtering'>Filtering</a>
                        </li>
                        <li>
                            <a href='#Statistics'>Statistics</a>
                        </li>
                        <li>
                            <a href='#Suggestions'>Suggestions</a>
                        </li>
                        <li>
                            <a href='#Routing'>Routing</a>
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
                        using the names or acronyms of buildings, or by using course subjects. 
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
                    <p>
                        To use this tool, you are not required to create an account. However, if you&#39;d like
                        to <a href='#Favoriting_System'>favorite items</a> or <a href='#Personal_Shedules'>build your class schedule</a>, you must be logged in to do so.
                        Creating an account takes less than a minute to do and you can do so <a href='./signup'>here</a>.
                    </p>
                    <div className='subSection'>
                        <h3 id='Signing_Up'>Signing Up</h3>
                        <img className="signupImg" src={signupImg} alt='Signup Page'></img>
                        <p>
                            If you do not already have an account, you may create one by clicking the Sign Up button on the home page. 
                            Please enter your email address, password, and re-enter your password to create a new account.
                            If you recieve an error upon hitting the Sign Up button, either your email/password does not match
                            the required format or the email you entered is already registered to an account. 
                            Your password must contain at least 8 characters including at least 1 uppercase character, 1 lowercase character, and 1 number.
                        </p>
                        <p>
                            To log in instead, click the log in link at the bottom of the form, bringing you to the <a href='./login'>login</a> page.
                        </p>
                        <h3 id='Logging_In'>Logging In</h3>
                        <img className="loginImg" src={loginImg} alt='Login Page'></img>
                        <p>
                            If you already have an account, you may log in by clicking the Log In button on the home page. 
                            Please enter your email address and password to log in. 
                            If you receive an error, the email address or password you entered is incorrect. 
                            To reset your password, click the <a href='./'>Forgot Password?</a> link. 
                            To create an account, click the <a href='./signup'>Create an Account</a> link.
                        </p>
                        <h3 id='Modifying_Account_Info'>Modifying Account Info</h3>
                        <div className="modifyImages">
                            <img src={modifyNoeditImg} alt='Modify Page No Edit'></img>
                            <img src={modifyEmaileditImg} alt='Modify Page Email Edit'></img>
                            <img src={modifyPasseditImg} alt='Modify Page Password Edit'></img>
                        </div>
                        <p>
                            When logged in, you can visit <a href='./modifyAccount'>this</a>  page to change your email address or password.
                            Click the respective buttons depending on whether you want to change your email or password,
                            and upon hitting Confirm, either read the error message to see what went wrong or you will be
                            greeted with a Success message. Keep in mind that each email address can only be associated with one account.
                        </p>
                        <p>
                            If you&#39;d instead like to delete your account, you can press the Delete Account button
                            to go to the <a href='./deleteAcct'>Delete Account</a> page.
                        </p>
                    </div>
                </div>
                <div id='Favoriting_System'>
                    <hr></hr>
                    <h2>Favoriting System</h2>
                    <img className="unimplemented" src = {favoriteImg} alt=''></img>
                    <p>
                        To favorite items when logged in, click on the Star next to the item of interest in the sidebar, which will turn yellow once favorited.
                        The stars will not appear if you are not logged in. You can favorite courses, buildings, rooms, and sections, and
                        you can manage or view all your favorites on the <a href='./favorites'>favorites</a> page.
                    </p>
                </div>
                <div id='Personal_Shedules'>
                    <hr></hr>
                    <h2>Personal Schedules</h2>
                    <img className="unimplemented" src={courseScheduleImg} alt=''></img>
                    <p>
                        If you are logged in, you can create a personal schedule displaying a weekly schedule of your courses by selecting favorites on the home page.
                        Use the <a href='./schedule'>schedule</a> page to view your personal schedule.
                        To view more details for a course on the schedule, click the course on the calendar. In the event that two courses overlap,
                        you can use the x button to hide an overlapping course.
                    </p>
                </div>
                <div id='Navigation'>
                    <hr></hr>
                    <h2>Navigation</h2>
                    <p>
                        This tool syncs the map and sidebar for easy navigability and is intuitive to use. Explore the following sections to
                        get a more in-depth understand of how to navigate around the map and sidebar.
                    </p>
                    <div className='subSection'>
                        <h3 id='Map'>Map</h3>
                        <div className="mapImages">
                            {/* eslint-disable-next-line */}
                            <img className="unimplemented" src={homeImg} alt='No image yet'></img>
                            {/* eslint-disable-next-line */}
                            <img className="unimplemented" src={homeBuildingImg} alt='No image yet'></img>
                        </div>
                        <p>
                            To move around the map, simply drag along the map. All buildings currently registered in the system will be clickable on the map.
                            When you click on a building on a map, relevant information will appear in the sidebar.
                        </p>
                        <h3 id='Sidebar'>Sidebar</h3>
                        {/* eslint-disable-next-line */}
                        <img className="unimplemented" src={homeCourseImg} alt='No image yet'></img>
                        <p>
                            The sidebar, by default, contains all the buildings registered in the system. 
                            To search for a course, building, room, or section, you can use the search bar located at
                            the top of the sidebar which will search based on the selected filter.
                        </p>
                        <br></br><br></br><br></br>
                    </div>    
                </div>
                <div id='Filtering'>
                    <hr></hr>
                    <h2>Filtering</h2>
                    <img className="unimplemented" src={filteringImg} alt='No image yet'></img>
                    <p>
                        In order to find a particular building or course you will want to use the Filter button on the sidebar.
                        Click this button and select the item you wish to search for and press the &ldquo;x&rdquo; button in the top right
                        corner. Now you can search in the search box for that type of item.
                    </p>
                </div>
                <div id='Statistics'>
                    <hr></hr>
                    <h2>Statistics</h2>
                    <img className="unimplemented" src={statisticsImg} alt='No image yet'></img>
                    <p>
                        The statistics page is useful for analyzing which buildings get the most use. After navigating to the
                        statistics page through the floating button on the home page a loading bar will appear until all of the
                        information has been retrieved from the backend. After this you will see a list with every building and
                        the various statistics relating to each building.
                    </p>
                </div>
                <div id='Suggestions'>
                    <hr></hr>
                    <h2>Suggestions</h2>
                    <img className="unimplemented" src={suggestionsImg} alt='No image yet'></img>
                    <p>
                        To leave feedback or offer suggestions for new features you can navigate to the suggestion
                        floating button on the home screen in the bottom right corner of the screen. This will take
                        you to a page where you can write your feedback into a textbox and submit it to be read
                        later by developers.
                    </p>
                </div>
                <div id='Routing'>
                    <hr></hr>
                    <h2>Routing</h2>
                    <img className="unimplemented" src={routingImg} alt='No image yet'></img>
                    <p>
                        To find the optimal route between two buildings, click the route button towards the top of the map.
                        It will open a menu, in this menu put the building short codes for where you are beginning and ending
                        and also select your means of transportation at the bottom. Then select show route and it will show the
                        route on the map.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Tutorial;