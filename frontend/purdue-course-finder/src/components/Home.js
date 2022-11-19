import React, { useState } from 'react';
import SideBar from './sideBar.js';
import Map from './Map.js';
import "../App.css";

function Home() {
  const [buildingName, setBuildingName] = useState('');
  const [searchString, setSearchString] = useState('');
  const [shortCodes, setShortCodes] = useState([]);
  const [Buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);

  //force the map to reload to recenter when the same building is selected from the sidebar
  const [mapReload, setmapReload] = useState(false);

  const _handleBuildingClick = (e) => {
    setBuildingName(e);
    // setSearchString('');
    setmapReload(!mapReload);
  }

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [method, setMethod] = useState('walking');
  const _handleRouteClick = (origin, destination) => {
    setOrigin(origin);
    setDestination(destination);
    setmapReload(!mapReload);
  }
  const _handleRouteMethod = (method) => {
    setMethod(method);
  }
  
  return (
    <div className="App">
      <div className="MainContent">
        <div className="sideBar" data-testid="sidebar">
          <SideBar 
            onClick = {(e)=>{_handleBuildingClick(e)}}
            onRouteClick = {(origin, destination)=>{_handleRouteClick(origin, destination)}}
            onRouteMethodChange = {(route) => {_handleRouteMethod(route)}}
            Buildings = {Buildings}
            setBuildings = {setBuildings}
            filteredBuildings = {filteredBuildings}
            setFilteredBuildings = {setFilteredBuildings}
            searchString = {searchString}
            setSearchString = {setSearchString}
            shortCodes = {shortCodes}
            setShortCodes = {setShortCodes}
          />
        </div>
        <div className="map" data-testid="map">
          <Map 
            buildingName = {buildingName}
            originSC={origin}
            destinationSC={destination}
            routeMethod={method}
            resetRoute={(origin, destination)=>{_handleRouteClick(origin, destination)}}
            mapReload = {mapReload}
            Buildings = {Buildings}
            setBuildings = {setBuildings}
            filteredBuildings = {filteredBuildings}
            setFilteredBuildings = {setFilteredBuildings}
            searchString = {searchString}
            setSearchString = {setSearchString}
            shortCodes = {shortCodes}
            setShortCodes = {setShortCodes}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;