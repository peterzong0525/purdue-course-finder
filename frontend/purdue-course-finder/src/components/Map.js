import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useJsApiLoader, Marker, Polyline, Polygon, DirectionsRenderer } from '@react-google-maps/api';
//import { withGoogleMap, withScriptjs, DirectionsService } from "@react-google-maps/api";   //unsure if these are needed
import { Fab, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { serverURL } from '../index.js';

const useStyles = makeStyles((theme) => ({
  homeFAB: {
    backgroundColor: '#9D8446',
    '&:hover': {
      backgroundColor: '#9D8446',
    },
    margin: theme.spacing(1),
    padding: 20,
  },
  homeFABdiv: {
    position: 'fixed',
    right: theme.spacing(0),
    top: theme.spacing(0),
  },
}));

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 40.426, 
  lng: -86.93
};

class Building {
  constructor(buildingName, shortCode, shortCodeLocation, coordArray) {
    this.buildingName = buildingName;
    this.shortCode = shortCode;
    this.shortCodeLocation = shortCodeLocation;
    this.coordArray = coordArray;
  }
}

function Map(props) {
  Map.propTypes = {
    buildingName: PropTypes.string
  };

  const [map, setMap] = useState(null);
  const [Buildings, setBuildings] = useState([]);
  const [FilteredBuildings, setFilteredBuildings] = useState([]);
  const [directions, setDirections] = useState([]);

  const classes = useStyles();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    preventGoogleFontsLoading: true,
  });

  async function generateBuildings() {
    let responseData = [];
    var url = `${serverURL}/buildings`;
    await axios.get(url).then((response) => {
      responseData = response.data;
    });

    let buildings = [];
    for (let i = 0; i < responseData.length; i++) {
      let currBuilding = responseData[i];
      buildings.push(new Building(currBuilding.Name, 
                                  currBuilding.ShortCode, 
                                  currBuilding.ShortCode_Location, 
                                  currBuilding.OutlineCoords));
    }
    setBuildings(buildings);
  }

  function filterBuildings(buildingName) {
    let filtered = [];
  
    // Find name match from buildingName (props)
    for (let i = 0; i < Buildings.length; i++) {
        if (Buildings[i].buildingName === buildingName) {
          filtered.push(Buildings[i]);
        }
    }
  
    setFilteredBuildings(filtered);
  }

  // Fill list Buildings with all building info
  useEffect(() => {
    generateBuildings();
  }, []);

  // Filter for specific building
  useEffect(() => {
    filterBuildings(props.buildingName);
  }, [props.buildingName]);


  

  // Setting directions (mock up)
  //https://github.com/trulymittal/google-maps-directions-tutorial/blob/master/src/App.js
  const [routeVisible, setRouteVisible] = useState(false);
  async function calculateRoute() {
    if (routeVisible) {
      setDirections(null);
      setRouteVisible(false);
      return;
    }
    setRouteVisible(true);

    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: 40.41997, lng: -86.93049 };
    const destination = { lat: 40.43137, lng: -86.91402 };

    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
  }

  // Generate Route
  useEffect(() => {
    //calculateRoute();
  }, []);
  // https://stackblitz.com/edit/react-5cuf9v?file=Map.js


  if (map && FilteredBuildings[0] && FilteredBuildings[0].coordArray[0] && props.buildingName) {
    console.log(FilteredBuildings[0], props.buildingName)
    map.panTo(FilteredBuildings[0].coordArray[0]);
    map.setZoom(18);
  }
  
  // This is for displaying only text 
  //<Marker label="Some_Label" position={{lat:40.43041,lng:-86.91246}} icon="../map_images/BlankPNG.png" />
  //<Marker label={building.shortCode} position={{lat:(building.shortCodeLocation.lat-0.0001), lng:building.shortCodeLocation.lng}} icon="../map_images/BlankPNG.png" />
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        clickableIcons={false}
        tilt={0}
        mapTypeId={"ROADMAP"}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
        }}
        onLoad={map=>setMap(map)}
      >
        

        { /* Child components, such as markers, info windows, etc. */
          // This div is necessary as a parent element
          <div className="mapContainer">

            {
              Buildings.map((building, index) => (
                <div key={index}>
                  <Polygon path={building.coordArray} options={{strokeColor: '#000000', fillColor:'#FFF72F' }} />
                  <Marker label={{text:building.shortCode, fontSize:"15px", fontWeight: 'bold'}} position={{lat:(building.shortCodeLocation.lat-0.00005), lng:building.shortCodeLocation.lng}} icon="../map_images/BlankPNG.png" />
                </div>
              ))
            }

            {
              FilteredBuildings.map((building, index) => (
                <div key={index}>
                  <Polygon path={building.coordArray} options={{strokeColor: '#000000', fillColor:'#0019FA' }} />
                </div>
              ))
            }

            {directions!=undefined && <DirectionsRenderer directions={directions} />}

            <div className={classes.homeFABdiv}>
              { window.sessionStorage.getItem("userToken") === null && 
                <Fab variant="extended" className={classes.homeFAB} href='/login'>
                  Log In
                </Fab> 
              }

              { window.sessionStorage.getItem("userToken") !== null && 
                <Fab variant="extended" className={classes.homeFAB} href='/schedule'>
                  My Schedule
                </Fab> 
              }

              { window.sessionStorage.getItem("userToken") !== null && 
                <Fab variant="extended" className={classes.homeFAB} href='/favorites'>
                  Favorites
                </Fab> 
              }

              { window.sessionStorage.getItem("userToken") !== null && 
                <Fab variant="extended" className={classes.homeFAB} href='/modifyAccount'>
                  Account Settings
                </Fab> 
              }

              { window.sessionStorage.getItem("userToken") !== null && 
                <Fab variant="extended" className={classes.homeFAB} onClick={() => { window.sessionStorage.removeItem("userToken");}} href='/'>
                  Sign Out
                </Fab> 
              }
              
              {/*<a href="#Map_Routing" className="button">
                <button type='submit'>Route</button>
              </a>*/}
            </div>
              {
                /* // This is a test for directions. Will add popup window soon
                <Fab variant="extended" className={classes.homeFAB} onClick={() => { calculateRoute() }}>
                  {routeVisible && "Hide Route"}{!routeVisble && "Route"}
                </Fab>*/ /*
                <div className="popup_overlay" id="Map_Routing">
                  <div className="popup_wrapper">
                      <h2>Change Filter</h2>
                      <a href="#" className="close">&times;</a>
                      <div className="content">
                          <div className="popup_container">
                              <form>
                                  <div className="popup_box">
                                      <select name="origin_building" id="origin_building">
                                        <option value="WALC">WALC</option>
                                        <option value="CHAS">CHAS</option>
                                      </select>
                                      <select name="destination_building" id="destination_building">
                                        <option value="WALC">WALC</option>
                                        <option value="CHAS">CHAS</option>
                                      </select>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>*/
              }
            
          </div>
        }
        <></>
      </GoogleMap>
  ) : <div data-testid="mapLoading"></div>
}

export default React.memo(Map)