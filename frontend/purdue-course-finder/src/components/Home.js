import "../App.css";
import React from 'react';
import SideBar from './sideBar';

function Home() {
  return (
    <div className="App">
      <div className="MainContent">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="map">
          map
        </div>
      </div>
      <header className="App-header">
        <h2>This is the default home page, it will be replaced when the maps tasks are implemented.</h2>
        <h4>Quick links to some pages:</h4>
        <form action="/login">
          <input style={{fontSize:"17px"}} type="submit" value="Login Page" />
        </form>
        <form action="/signup">
          <input style={{fontSize:"17px"}} type="submit" value="Signup Page" />
        </form>
        <form action="/tutorial">
          <input style={{fontSize:"17px"}} type="submit" value="Tutorial Page" />
        </form>
        <form action="/deleteacct">
          <input style={{fontSize:"17px"}} type="submit" value="Delete Account Page" />
        </form>
        <form action="/modifyAccount">
          <input style={{fontSize:"17px"}} type="submit" value="Modify Account Page" />
        </form>
        <form action="/subjects">
          <input style={{fontSize:"17px"}} type="submit" value="Subjects" />
        </form>
        <form action="/courses/CS">
          <input style={{fontSize:"17px"}} type="submit" value="CS Courses" />
        </form>
        <form action="/sections/00161777-8518-4597-94cf-1db2d6304ed0">
          <input style={{fontSize:"17px"}} type="submit" value="CS 590 Sections" />
        </form>
      </header>
    </div>
  );
}

export default Home;