import "../App.css";
import React from 'react';
import SideBar from './sideBar.js';
import Map from './Map.js';

function Home() {
  return (
    <div className="App">
      <div className="MainContent">
        <div className="sideBar">
          <SideBar data-testid="sidebar"/>
        </div>
        <div className="map">
          <Map data-testid="map"/>
        </div>
      </div>
    </div>
  );
}

export default Home;