import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useJsApiLoader, Marker, Polyline, Polygon } from '@react-google-maps/api';
import { Fab, makeStyles } from '@material-ui/core';

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
  constructor(buildingName, coordArray) {
    this.buildingName = buildingName;
    this.coordArray = coordArray;
  }
}

let Buildings = [];

function Map(props) {
  Map.propTypes = {
    buildingName: PropTypes.string
  };

  const classes = useStyles();
   
  // console.log("Building Name: " + props.buildingName);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    preventGoogleFontsLoading: true,
  });

  // Fill list Buildings with all building info
  Buildings = [];
  generateBuildings();
  let filtered_Buildings = filterBuildings(props.buildingName);

  // Not sure how to use this object
  const flightPath = new Polyline({
    path: Buildings[0].coordArray,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  
  //<Marker position={{ lat: 40.43066, lng: -86.92358 }} />
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
      >
        

        { /* Child components, such as markers, info windows, etc. */
          // This div is necessary as a parent element
          <div>

            {
              Buildings.map((building, index) => (
                <div key={index}>
                  <Polygon path={building.coordArray} options={{strokeColor: '#000000', fillColor:'#FFF72F' }} />
                </div>
              ))
            }

            {
              filtered_Buildings.map((building, index) => (
                <div key={index}>
                  <Polygon path={building.coordArray} options={{strokeColor: '#000000', fillColor:'#0019FA' }} />
                </div>
              ))
            }

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
            </div>

          </div>
        }
        <></>
      </GoogleMap>
  ) : <div data-testid="mapLoading"></div>
}

function generateBuildings() {  // I'm sorry, this function is just a mess
  // Alphabetical A-G
  Buildings.push(new Building("Agricultural & Biological Engr", 
  [{lat: 40.42195,lng: -86.91692},{lat: 40.42148,lng: -86.91692},{lat: 40.42147,lng: -86.91623},{lat: 40.42193,lng: -86.91617}]));
  Buildings.push(new Building("Beering Hall of Lib Arts & Ed", 
  [{lat:40.425915,lng:-86.91648},{lat:40.42522,lng:-86.91648},{lat:40.42522,lng:-86.91612},{lat:40.42533,lng:-86.91593},
    {lat:40.42555,lng:-86.91600},{lat:40.42555,lng:-86.91555},{lat:40.42574,lng:-86.91555},{lat:40.42574,lng:-86.91612},
    {lat:40.425915,lng:-86.91612}]));
  Buildings.push(new Building("Brown Laboratory of Chemistry",
  [{lat:40.42642,lng:-86.91228},{lat:40.42642,lng:-86.91131},{lat:40.42649,lng:-86.91123},{lat:40.42667,lng:-86.91123},
    {lat:40.42672,lng:-86.91130},{lat:40.42672,lng:-86.91228}]));
  Buildings.push(new Building("Class of 1950 Lecture Hall",
  [{lat:40.42651,lng:-86.91529},{lat:40.42622,lng:-86.91529},{lat:40.42617,lng:-86.91503},{lat:40.42622,lng:-86.91478},
    {lat:40.42651,lng:-86.91479}]));
  Buildings.push(new Building("Ernest C. Young Hall",
  [{lat:40.42338,lng:-86.91077},{lat:40.42233,lng:-86.91077},{lat:40.42233,lng:-86.91061},{lat:40.42338,lng:-86.91061}]));
  Buildings.push(new Building("Felix Haas Hall",
  [{lat:40.42706,lng:-86.91652},{lat:40.42658,lng:-86.91652},{lat:40.42658,lng:-86.91618},{lat:40.42671,lng:-86.91618},
    {lat:40.42671,lng:-86.91605},{lat:40.42693,lng:-86.91605},{lat:40.42693,lng:-86.91618},{lat:40.42706,lng:-86.91618}]));

  // The outline for this doesn't show up on google maps so I just made a box
  Buildings.push(new Building("Flex Lab", 
  [{lat:40.42101,lng:-86.92342},{lat:40.42159,lng:-86.92342},{lat:40.42159,lng:-86.92429},{lat:40.42101,lng:-86.92429}]));
  Buildings.push(new Building("Forestry Building",
  [{lat:40.42253,lng:-86.91399},{lat:40.42301,lng:-86.91400},{lat:40.423015,lng:-86.914245},{lat:40.42253,lng:-86.91426}]));
  Buildings.push(new Building("Forney Hall of Chemical Engr",
  [{lat:40.42913,lng:-86.91399},{lat:40.42947,lng:-86.91345},{lat:40.42992,lng:-86.91396},{lat:40.42960,lng:-86.91450}]));
  Buildings.push(new Building("Grissom Hall",
  [{lat:40.42614,lng:-86.91063},{lat:40.42670,lng:-86.91063},{lat:40.42670,lng:-86.91088},{lat:40.42637,lng:-86.91088},
    {lat:40.42637,lng:-86.91115},{lat:40.42614,lng:-86.91115}]));

  // Alphabetical H-Mate
  Buildings.push(new Building("Hampton Hall of Civil Engnrng",
  [{lat:40.42973,lng:-86.91465},{lat:40.43005,lng:-86.91415},{lat:40.43020,lng:-86.91429},{lat:40.43000,lng:-86.91459},
    {lat:40.43012,lng:-86.91473},{lat:40.43034,lng:-86.91439},{lat:40.43068,lng:-86.91483},{lat:40.43060,lng:-86.91499},
    {lat:40.43073,lng:-86.91515},{lat:40.43056,lng:-86.91538},{lat:40.43044,lng:-86.91526},{lat:40.43036,lng:-86.91534}]));
  Buildings.push(new Building("Heavilon Hall",
  [{lat:40.42633,lng:-86.91133},{lat:40.42633,lng:-86.91234},{lat:40.42615,lng:-86.91234},{lat:40.42615,lng:-86.91133}]));
  Buildings.push(new Building("Hicks Undergraduate Library",
  [{lat:40.42459,lng:-86.91279},{lat:40.42447,lng:-86.91279},{lat:40.42447,lng:-86.91249},{lat:40.42459,lng:-86.91248}]));
  Buildings.push(new Building("Jerry S Rawls Hall",
  [{lat:40.42388,lng:-86.91010},{lat:40.42382,lng:-86.91010},{lat:40.42382,lng:-86.91020},{lat:40.42364,lng:-86.91019},
    {lat:40.42364,lng:-86.91008},{lat:40.42348,lng:-86.91008},{lat:40.42347,lng:-86.90987},{lat:40.42358,lng:-86.90987},
    {lat:40.42354,lng:-86.90984},{lat:40.42366,lng:-86.909335},{lat:40.42372,lng:-86.9093575},{lat:40.42372,lng:-86.90926},
    {lat:40.42388,lng:-86.90927}]));
  Buildings.push(new Building("Knoy Hall of Technology",
  [{lat:40.42738,lng:-86.91088},{lat:40.42762,lng:-86.91089},{lat:40.42772,lng:-86.91101},{lat:40.42780,lng:-86.91101},
    {lat:40.42790,lng:-86.91088},{lat:40.42821,lng:-86.91102},{lat:40.42802,lng:-86.91128},{lat:40.42738,lng:-86.91129}]));
  Buildings.push(new Building("Krannert Building",
  [{lat:40.42384,lng:-86.91053},{lat:40.42384,lng:-86.91126},{lat:40.42347,lng:-86.91125},{lat:40.42347,lng:-86.91100},
    {lat:40.42365,lng:-86.91100},{lat:40.42365,lng:-86.91053}]));
  Buildings.push(new Building("Lawson Computer Science Bldg",
  [{lat:40.42743,lng:-86.91683},{lat:40.42817,lng:-86.91683},{lat:40.42817,lng:-86.91714},{lat:40.42743,lng:-86.91714}]));
  Buildings.push(new Building("Lilly Hall of Life Sciences",
  [{lat:40.42369,lng:-86.91902},{lat:40.42335,lng:-86.91902},{lat:40.42334,lng:-86.91812},{lat:40.42286,lng:-86.91811},
    {lat:40.42286,lng:-86.91768},{lat:40.42335,lng:-86.91768},{lat:40.42335,lng:-86.91748},{lat:40.42362,lng:-86.91748},
    {lat:40.42362,lng:-86.91775},{lat:40.42376,lng:-86.91775},{lat:40.42376,lng:-86.91808},{lat:40.42369,lng:-86.91808}]));
  Buildings.push(new Building("Lynn Hall of Vet Medicine",
  [{lat:40.42009,lng:-86.91389},{lat:40.42009,lng:-86.91519},{lat:40.41949,lng:-86.91520},{lat:40.41949,lng:-86.91571},
    {lat:40.41902,lng:-86.91570},{lat:40.41897,lng:-86.91480},{lat:40.41923,lng:-86.91480},{lat:40.41923,lng:-86.91441},
    {lat:40.41896,lng:-86.91438},{lat:40.41888,lng:-86.91428},{lat:40.41888,lng:-86.91413},{lat:40.41899,lng:-86.91398},
    {lat:40.41972,lng:-86.91409},{lat:40.41972,lng:-86.91389}]));
  Buildings.push(new Building("Materials and Electrical Engr",
  [{lat:40.42970,lng:-86.91272},{lat:40.42950,lng:-86.91305},{lat:40.42897,lng:-86.91248},{lat:40.42917,lng:-86.91217}]));
  

  // Alphabetical Math-Re
  Buildings.push(new Building("Mathematical Sciences Building",
  [{lat:40.42599,lng:-86.91590},{lat:40.42599,lng:-86.91563},{lat:40.42638,lng:-86.91562},{lat:40.42656,lng:-86.91570},
    {lat:40.42656,lng:-86.91581},{lat:40.42638,lng:-86.91589}]));
  Buildings.push(new Building("Matthews Hall",
  [{lat:40.424395,lng:-86.91652},{lat:40.424395,lng:-86.91621},{lat:40.42493,lng:-86.91621},{lat:40.42493,lng:-86.91627},
    {lat:40.42509,lng:-86.91627},{lat:40.42509,lng:-86.91647},{lat:40.42493,lng:-86.91647},{lat:40.42493,lng:-86.91652}]));
  Buildings.push(new Building("Max W & Maileen Brown Hall",
  [{lat:40.42879,lng:-86.91248},{lat:40.42815,lng:-86.91167},{lat:40.42836,lng:-86.91132},{lat:40.42850,lng:-86.91147},
    {lat:40.42839,lng:-86.91165},{lat:40.42847,lng:-86.91174},{lat:40.428665,lng:-86.91146},{lat:40.42913,lng:-86.91196}]));  // This is the EE building
  Buildings.push(new Building("Mechanical Engineering Bldg",
  [{lat:40.42811,lng:-86.91356},{lat:40.42796,lng:-86.91354},{lat:40.42788,lng:-86.91299},{lat:40.42806,lng:-86.91264},
    {lat:40.42799,lng:-86.91254},{lat:40.42799,lng:-86.91238},{lat:40.42812,lng:-86.91238},{lat:40.42823,lng:-86.91218},
    {lat:40.42869,lng:-86.91266}]));
  Buildings.push(new Building("Neil Armstrong Hall of Engr",
  [{lat:40.43116,lng:-86.91590},{lat:40.43102,lng:-86.91576},{lat:40.43091,lng:-86.91593},{lat:40.43064,lng:-86.91564},
    {lat:40.43079,lng:-86.91541},{lat:40.43087,lng:-86.91549},{lat:40.43085,lng:-86.91457},{lat:40.43068,lng:-86.91437},
    {lat:40.43085,lng:-86.91409},{lat:40.43086,lng:-86.91393},{lat:40.43112,lng:-86.91421}]));
  Buildings.push(new Building("Peirce Hall",
  [{lat:40.42674,lng:-86.91528},{lat:40.42657,lng:-86.91528},{lat:40.42657,lng:-86.91480},{lat:40.42674,lng:-86.91480}]));
  Buildings.push(new Building("Physics Building",
  [{lat:40.42952,lng:-86.91329},{lat:40.42986,lng:-86.91276},{lat:40.43064,lng:-86.91361},{lat:40.43036,lng:-86.91405},
    {lat:40.42994,lng:-86.91368},{lat:40.43013,lng:-86.91337},{lat:40.43002,lng:-86.91325},{lat:40.42981,lng:-86.91357}]));
  Buildings.push(new Building("Potter Engineering Center",
  [{lat:40.42772,lng:-86.91264},{lat:40.42723,lng:-86.91264},{lat:40.42723,lng:-86.91245},{lat:40.42732,lng:-86.91245},
    {lat:40.42732,lng:-86.91204},{lat:40.42777,lng:-86.91204},{lat:40.42777,lng:-86.91252},{lat:40.42772,lng:-86.91252}]));
  Buildings.push(new Building("Psychological Sciences Bldg",
  [{lat:40.42714,lng:-86.91537},{lat:40.42693,lng:-86.91537},{lat:40.42693,lng:-86.91451},{lat:40.42714,lng:-86.91451}]));
  Buildings.push(new Building("Recitation Building",
  [{lat:40.42605,lng:-86.91534},{lat:40.42556,lng:-86.91534},{lat:40.42556,lng:-86.91503},{lat:40.42605,lng:-86.91503}]));

  // Alphabetical Ro-Z
  Buildings.push(new Building("Robert Heine Pharmacy Building",
  [{lat:40.42944,lng:-86.91608},{lat:40.42981,lng:-86.91553},{lat:40.43005,lng:-86.91578},{lat:40.42988,lng:-86.91607},
    {lat:40.42985,lng:-86.91637},{lat:40.42954,lng:-86.91637},{lat:40.42954,lng:-86.91628},{lat:40.42946,lng:-86.91628}]));
  Buildings.push(new Building("Seng-Liang Wang Hall",
  [{lat:40.43090,lng:-86.91279},{lat:40.43074,lng:-86.91307},{lat:40.43001,lng:-86.91230},{lat:40.43017,lng:-86.91203}]));
  Buildings.push(new Building("Smith Hall",
  [{lat:40.42376,lng:-86.91722},{lat:40.42368,lng:-86.91722},{lat:40.42368,lng:-86.91728},{lat:40.42307,lng:-86.91730},
    {lat:40.42307,lng:-86.91705},{lat:40.42343,lng:-86.91705},{lat:40.42343,lng:-86.91698},{lat:40.42332,lng:-86.91698},
    {lat:40.42332,lng:-86.91669},{lat:40.42344,lng:-86.91669},{lat:40.42345,lng:-86.91676},{lat:40.42349,lng:-86.91676},
    {lat:40.42349,lng:-86.91662},{lat:40.42342,lng:-86.91662},{lat:40.42342,lng:-86.91644},{lat:40.42350,lng:-86.91644},
    {lat:40.42349,lng:-86.91637},{lat:40.42367,lng:-86.91638},{lat:40.42367,lng:-86.91643},{lat:40.42375,lng:-86.91644},
    {lat:40.42376,lng:-86.91660},{lat:40.42368,lng:-86.91661},{lat:40.42369,lng:-86.91704},{lat:40.42376,lng:-86.91705}]));
  Buildings.push(new Building("Stanley Coulter Hall",
  [{lat:40.42627,lng:-86.91468},{lat:40.42628,lng:-86.91402},{lat:40.42676,lng:-86.91405},{lat:40.42676,lng:-86.91467}]));
  Buildings.push(new Building("Stewart Center",
  [{lat:40.42544,lng:-86.91350},{lat:40.42468,lng:-86.91341},{lat:40.42470,lng:-86.91188},{lat:40.42494,lng:-86.91186},
    {lat:40.42494,lng:-86.91196},{lat:40.42541,lng:-86.91196},{lat:40.42541,lng:-86.91240},{lat:40.42525,lng:-86.91242},
    {lat:40.42525,lng:-86.91249},{lat:40.42530,lng:-86.91249},{lat:40.42530,lng:-86.91274},{lat:40.42545,lng:-86.91276}]));
  Buildings.push(new Building("University Church",
  [{lat:40.42593,lng:-86.91019},{lat:40.42593,lng:-86.90999},{lat:40.42615,lng:-86.90999},{lat:40.42615,lng:-86.90980},
    {lat:40.42628,lng:-86.90980},{lat:40.42628,lng:-86.91003},{lat:40.42632,lng:-86.91003},{lat:40.42632,lng:-86.91019}]));
  Buildings.push(new Building("University Hall",
  [{lat:40.42546,lng:-86.91528},{lat:40.42507,lng:-86.91528},{lat:40.42507,lng:-86.91508},{lat:40.42546,lng:-86.91508}]));
  Buildings.push(new Building("Wilmeth Active Learning Center",
  [{lat:40.42756,lng:-86.91331},{lat:40.42747,lng:-86.91331},{lat:40.42747,lng:-86.91326},{lat:40.42724,lng:-86.91326},
    {lat:40.42724,lng:-86.91319},{lat:40.42701,lng:-86.91318},{lat:40.42700,lng:-86.91354},{lat:40.42681,lng:-86.91354},
    {lat:40.42682,lng:-86.91286},{lat:40.42757,lng:-86.91288}]));
  Buildings.push(new Building("Wetherill Lab of Chemistry",
  [{lat:40.42674,lng:-86.91355},{lat:40.42621,lng:-86.91355},{lat:40.42621,lng:-86.91262},{lat:40.42674,lng:-86.91262}]));
}

function filterBuildings(buildingName) {
  let filtered = [];

  // Find name match from buildingName(props)
  for (let i = 0; i < Buildings.length; i++) {
      if (Buildings[i].buildingName === buildingName) {
        filtered.push(Buildings[i]);
      }
  }

  return filtered;
}

export default React.memo(Map)