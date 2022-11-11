import React, { useState } from 'react';
import SideBar from './sideBar.js';
import Map from './Map.js';
import "../App.css";

function Home() {
  const [building, setBuilding] = useState('');

  //force the map to reload to recenter when the same building is selected from the sidebar
  const [mapReload, setmapReload] = useState(false);

  const _handleBuildingClick = (e) => {
    setBuilding(e);
    setmapReload(!mapReload);
  }

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const _handleRouteClick = (origin, destination) => {
    setOrigin(origin);
    setDestination(destination);
    setmapReload(!mapReload);
  }
  
  return (
    <div className="App">
      <div className="MainContent">
        <div className="sideBar" data-testid="sidebar">
          <SideBar 
            onClick = {(e)=>{_handleBuildingClick(e)}}
            onRouteClick = {(origin, destination)=>{_handleRouteClick(origin, destination)}}
          />
        </div>
        <div className="map" data-testid="map">
          <Map 
            buildingName = {building}
            originSC={origin}
            destinationSC={destination}
            resetRoute={(origin, destination)=>{_handleRouteClick(origin, destination)}}
            mapReload = {mapReload}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;