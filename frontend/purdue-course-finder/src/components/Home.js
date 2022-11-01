import React, { useState } from 'react';
import SideBar from './sideBar.js';
import Map from './Map.js';
import "../App.css";

function Home() {
  const [building, setBuilding] = useState('');

  //force the map to reload to recenter when the same building is selected from the sidebar
  const [mapReload, setmapReload] = useState(false);

  const _handleClick = (e) => {
    setBuilding(e);
    setmapReload(!mapReload);
  }
  
  return (
    <div className="App">
      <div className="MainContent">
        <div className="sideBar" data-testid="sidebar">
          <SideBar 
            onClick = {(e)=>{_handleClick(e)}}
          />
        </div>
        <div className="map" data-testid="map">
          <Map 
            buildingName = {building} 
            mapReload = {mapReload} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;