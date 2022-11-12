import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useJsApiLoader, Marker, Polygon, DirectionsRenderer } from '@react-google-maps/api';
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
    buildingName: PropTypes.string,
    originSC: PropTypes.string,
    routeMethod: PropTypes.string,
    resetRoute: PropTypes.func,
    destinationSC: PropTypes.string,
  };

  const [map, setMap] = useState(null);
  const [Buildings, setBuildings] = useState([]);
  const [FilteredBuildings, setFilteredBuildings] = useState([]);
  const [directions, setDirections] = useState([]);
  const [labelSize, setLabelSize] = useState(9);

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

  // zoom & pan to selected building
  useEffect(() => {
    if (map && FilteredBuildings[0] && FilteredBuildings[0].coordArray[0] && props.buildingName) {
      console.log(FilteredBuildings[0], props.buildingName)
      map.panTo(FilteredBuildings[0].coordArray[0]);
      map.setZoom(18);
    }
  }, [FilteredBuildings]);

  // Setting directions (mock up)
  //https://github.com/trulymittal/google-maps-directions-tutorial/blob/master/src/App.js
  const [routeVisible, setRouteVisible] = useState(false);
  function toggleRouteVisible() {
    if (routeVisible) {
      setDirections(null);
      setRouteVisible(false);
      props.resetRoute(null, null);
      return;
    }
    setRouteVisible(true);
  }

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();

    // Iterate through buildings to find starting and ending locations
    let origin;// = { lat: 40.41997, lng: -86.93049 };
    let destination;// = { lat: 40.43137, lng: -86.91402 };
    for (let i = 0; i < Buildings.length; i++) {
      if (Buildings[i].shortCode === props.originSC) {
        origin = Buildings[i].shortCodeLocation;
      }

      if (Buildings[i].shortCode === props.destinationSC) {
        destination = Buildings[i].shortCodeLocation;
      }
    }

    let travelType;
    if (props.routeMethod === 'walking') {
      travelType = window.google.maps.TravelMode.WALKING;
    } else if (props.routeMethod === 'biking') {
      travelType = window.google.maps.TravelMode.BICYCLING;
    } else if (props.routeMethod === 'driving') {
      travelType = window.google.maps.TravelMode.DRIVING;
    } else {
      travelType = window.google.maps.TravelMode.WALKING;
    }
    
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: travelType,
    });

    setDirections(results);
  }

  // Generate Route
  useEffect(() => {
    calculateRoute();
  }, [props.originSC, props.destinationSC, props.routeMethod]);
  
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onZoomChanged={() => {
          if (map) {
            let z = map.getZoom();
            if (z < 15) {
              setLabelSize(0);
            } else {
              setLabelSize((3*(z-12)));
            }
          }
        }}
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
                  { labelSize !== 0 &&
                    <Marker label={{text:building.shortCode, fontSize:labelSize.toString()+"px", fontWeight: 'bold'}} position={{lat:(building.shortCodeLocation.lat-0.00005-(labelSize===12?(labelSize)/100000:0)-(labelSize===9?(labelSize*4)/100000:0)), lng:building.shortCodeLocation.lng}} icon="../map_images/BlankPNG.png" />
                  }
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

            {/*routeVisible && */directions != undefined && <DirectionsRenderer directions={directions} />}

            <div className={classes.homeFABdiv}>

              { 
                  <Fab variant="extended" className={classes.homeFAB} onClick={() => { toggleRouteVisible() }}>
                    {routeVisible && "Hide Route"}
                    <a style={{textDecoration: 'none', color:'#000000'}} href="#Map_Routing">
                      {!routeVisible && "Route"}
                    </a>
                  </Fab>
              }

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

            </div>
          </div>
        }
        <></>
      </GoogleMap>
  ) : <div data-testid="mapLoading"></div>
}

export default React.memo(Map)