import "../App.css";
import React, { useState } from 'react';
import SideBar from './sideBar.js';
import Map from './Map.js';

function Home() {
  const [building, setBuilding] = useState('');

  const _handleClick = (e) => {
    setBuilding(e)
  }
  
  return (
    <div className="App">
      <div className="MainContent">
        <div className="sideBar" data-testid="sidebar">
          <SideBar onClick = {(e)=>{_handleClick(e)}}/>
        </div>
        <div className="map" data-testid="map">
          <Map buildingName = {building} />
        </div>
      </div>
    </div>
  );
}

export default Home;