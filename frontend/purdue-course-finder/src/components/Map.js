import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useJsApiLoader, Marker, Polygon, DirectionsRenderer } from '@react-google-maps/api';
import { Fab, makeStyles, SvgIcon } from '@material-ui/core';
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
  upperFABdiv: {
    position: 'fixed',
    right: theme.spacing(0),
    top: theme.spacing(0),
  },
  lowerFABdiv: {
    position: 'fixed',
    right: theme.spacing(7),
    bottom: theme.spacing(0),
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
    routeVisible: PropTypes.bool,
    destinationSC: PropTypes.string,
    mapReload: PropTypes.bool,
    Buildings: PropTypes.array,
    setBuildings: PropTypes.func,
    filteredBuildings: PropTypes.array,
    setFilteredBuildings: PropTypes.func,
    searchString: PropTypes.string,
    setSearchString: PropTypes.func,
    shortCodes: PropTypes.array,
    setShortCodes: PropTypes.func,
    setBuildingName: PropTypes.func,
    filter: PropTypes.bool,
    filterString: PropTypes.string,
    setFilterString: PropTypes.func,
  };

  const [map, setMap] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState([]);
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
    props.setBuildings(buildings);
  }

  function selectBuilding(buildingName) {
    let filtered = [];
  
    // Find name or shortcode match from buildingName (props)
    for (let i = 0; i < props.Buildings.length; i++) {
      if (props.Buildings[i].buildingName === buildingName || props.Buildings[i].shortCode === buildingName) {
        filtered.push(props.Buildings[i]);
      }
    }
  
    setSelectedBuilding(filtered);
  }

  // Fill list Buildings with all building info
  useEffect(() => {
    generateBuildings();
  }, []);

  // Filter for specific building
  useEffect(() => {
    selectBuilding(props.buildingName);
  }, [props.buildingName]);

  // zoom & pan to selected building
  useEffect(() => {
    if (map && selectedBuilding[0] && selectedBuilding[0].shortCodeLocation && props.buildingName) {
      map.panTo({ lat: selectedBuilding[0].shortCodeLocation.lat, lng: selectedBuilding[0].shortCodeLocation.lng-0.001 });
      map.setZoom(18);
    }
  }, [selectedBuilding, props.mapReload]);

  //filter buildings using props.searchString
  useEffect(() => {
    if (!props.searchString) {
      //searchString undefined or empty
      props.setFilteredBuildings([]);

    } else {
      //filter map building objects
      let filteredBuildingObjs = [];
      for (let i = 0; i < props.Buildings.length; i++) {
          if (props.Buildings[i].buildingName.toLowerCase().includes(props.searchString.toLowerCase()) || 
          props.Buildings[i].shortCode.toLowerCase().includes(props.searchString.toLowerCase())) {
            filteredBuildingObjs.push(props.Buildings[i]);
          }
      }
      props.setFilteredBuildings(filteredBuildingObjs);
    }
  }, [props.searchString]);

  //filter buildings using props.shortCodes
  useEffect(() => {
    if (!props.shortCodes) {
      //shortCodes undefined or empty
      props.setFilteredBuildings([]);

    } else {
      //filter map building objects
      let filteredBuildingObjs = [];
      for (let i = 0; i < props.shortCodes.length; i++) {
        for (let j = 0; j < props.Buildings.length; j++) {
          if (props.Buildings[j].shortCode === props.shortCodes[i]) {
            filteredBuildingObjs.push(props.Buildings[j]);
          }
        }
      }
      props.setFilteredBuildings(filteredBuildingObjs);
    }
  }, [props.shortCodes]);

  // Setting directions
  //https://github.com/trulymittal/google-maps-directions-tutorial/blob/master/src/App.js
  
  function hideRouteVisible() {
    setDirections(null);
    props.resetRoute(null, null);
  }

  async function calculateRoute() {
    if (!window.google) {
      return;
    }
    
    const directionsService = new window.google.maps.DirectionsService();

    // Iterate through buildings to find starting and ending locations
    let origin;// = { lat: 40.41997, lng: -86.93049 };
    let destination;// = { lat: 40.43137, lng: -86.91402 };
    for (let i = 0; i < props.Buildings.length; i++) {
      if (props.Buildings[i].shortCode === props.originSC) {
        origin = props.Buildings[i].shortCodeLocation;
      }

      if (props.Buildings[i].shortCode === props.destinationSC) {
        destination = props.Buildings[i].shortCodeLocation;
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
        onLoad={(map) => {setMap(map);}}
      >
        
        { /* Child components, such as markers, info windows, etc. */
          // This div is necessary as a parent element
          <div className="mapContainer">
            { props.filteredBuildings.length === 0 && 
              props.Buildings.map((building, index) => (
                <div key={index}>
                  <Polygon 
                    path={building.coordArray} 
                    options={{
                      strokeColor: '#000000', 
                      fillColor:'#FFF72F', 
                      clickable: true,
                    }}
                    onClick={() => {
                      props.setBuildingName(building.shortCode);
                      props.setFilterString(building.shortCode);
                    }}
                  />
                  { labelSize !== 0 &&
                    <Marker 
                      label={{text:building.shortCode, fontSize:labelSize.toString()+"px", fontWeight: 'bold'}} 
                      position={{lat:(building.shortCodeLocation.lat-0.00005-(labelSize===12?(labelSize)/100000:0)-(labelSize===9?(labelSize*4)/100000:0)), lng:building.shortCodeLocation.lng}} 
                      icon="../map_images/BlankPNG.png" 
                      clickable={true}
                      onClick={() => {
                        props.setBuildingName(building.shortCode);
                        props.setFilterString(building.shortCode);
                      }}
                    />
                  }
                </div>
              ))
            }

            {
              selectedBuilding.map((building, index) => (
                <div key={index}>
                  <Polygon 
                    path={building.coordArray} 
                    options={{strokeColor: '#000000', fillColor:'#0000FF' }} 
                    onClick={() => {
                      props.setBuildingName(building.shortCode);
                      props.setFilterString(building.shortCode);
                    }}
                  />
                </div>
              ))
            }

            {
              props.filteredBuildings.map((building, index) => (
                <div key={index}>
                  <Polygon 
                    path={building.coordArray} 
                    options={{
                      strokeColor: '#000000', 
                      fillColor:'#FFF72F', 
                      clickable: true,
                    }}
                    onClick={() => {
                      props.setBuildingName(building.shortCode);
                      props.setFilterString(building.shortCode);
                    }}
                  />
                  { labelSize !== 0 &&
                    <Marker 
                    label={{text:building.shortCode, fontSize:labelSize.toString()+"px", fontWeight: 'bold'}} 
                    position={{lat:(building.shortCodeLocation.lat-0.00005-(labelSize===12?(labelSize)/100000:0)-(labelSize===9?(labelSize*4)/100000:0)), lng:building.shortCodeLocation.lng}} 
                    icon="../map_images/BlankPNG.png" 
                    clickable={true}
                    onClick={() => {
                      props.setBuildingName(building.shortCode);
                      props.setFilterString(building.shortCode);
                    }}
                  />
                  }
                </div>
              ))
            } 

            {directions != undefined && <DirectionsRenderer directions={directions} />}

            <div className={classes.upperFABdiv}>

              {
                !props.routeVisible &&
                <a style={{textDecoration: 'none', color:'#000000'}} href="#Map_Routing">
                  <Fab variant="extended" className={classes.homeFAB}>
                    Route
                  </Fab>
                </a>
              }
              {
                props.routeVisible &&
                  <Fab variant="extended" className={classes.homeFAB} onClick={() => { hideRouteVisible() }}>
                    Hide Route
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

            <div className={classes.lowerFABdiv}>
              <Fab className={classes.homeFAB} href='/suggestions'>
                <SvgIcon>
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
                </SvgIcon>
              </Fab>
              <Fab className={classes.homeFAB} href='/tutorial'>
                <SvgIcon>
                  <path d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44.91-1.29.4-3.7-2.18-3.7-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41.7 1.15 1.11 3.3.03 4.9-1.2 1.77-2.35 2.31-2.97 3.45-.25.46-.35.76-.35 2.24h-2.89c-.01-.78-.13-2.05.48-3.15zM14 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                </SvgIcon>
              </Fab> 
            </div>
          </div>
        }
        <></>
      </GoogleMap>
  ) : <div data-testid="mapLoading"></div>
}

export default React.memo(Map)