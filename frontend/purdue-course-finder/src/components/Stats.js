import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./stats.css";
import { serverURL } from '../index.js';

function Stats () {
    const [buildingStats, setBuildingStats] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        // Get buildings from the server
        let url = `${serverURL}/buildings`;
        let buildings = [];
        
        await axios.get(url).then((response) => {
            buildings = response.data.sort((a, b) => a.ShortCode.localeCompare(b.ShortCode));
        });

        // Get building stats from the server
        let statStack = [];
        for (let i = 0; i < buildings.length; i++) {
            url = `${serverURL}/statistics/` + buildings[i].ShortCode;

            await axios.get(url).then((response) => {
                statStack.push(response.data);

                // For loading bar
                let myPercent = i / 0.83;
                document.getElementById("spanbar").style.width = myPercent.toString() + "%";
            });
        }

        // Update screen
        setLoaded(true);
        setBuildingStats(statStack);
    }, []);

//<span style={{width: {loadedPercent}}}></span>
    return (
        <div className='statsContainer'>
            {!loaded && "Loading will take a couple of seconds"}
            {!loaded && (
                    <div className="meter">
                        <span id="spanbar" style={{width: "25%"}}></span>
                    </div>
            )}

            {loaded && (
                <div className='listOfItems'>
                    {buildingStats.map((building, index) => (
                        <div className="listItemContainer" key={index}>
                            <div className="displayItemContainer">
                                <div className = "listItemInfo" >
                                    <h2 className = "ItemHead" style={{margin: "0"}}>
                                        {building.building.Name + " (" + building.building.ShortCode + ")"}
                                    </h2>
                                    <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                                        {"Rooms: " + building.rooms}
                                    </p>
                                    <p className = "secondRow" style={{margin: "5px 0 0 0"}}>
                                        {"Courses: " + building.courses}
                                    </p>
                                    <p className = "thirdRow" style={{margin: "5px 0 0 0"}}>
                                        {"Sections: " + building.sections}
                                    </p>
                                    <p className = "fourthRow" style={{margin: "5px 0 0 0"}}>
                                        {"Meetings: " + building.meetings}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
        </div>
    );
}

export default Stats;