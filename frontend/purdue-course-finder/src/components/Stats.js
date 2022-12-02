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
                let myPercent = i / 83 * 100;   // divide by total number of buildings, convert to percent
                document.getElementById("spanbar").style.width = myPercent.toString() + "%";
            });
        }

        // Update screen
        setLoaded(true);
        setBuildingStats(statStack);
    }, []);

    return (
        <div className='statsContainer'>
            {!loaded && "Loading will take a couple of seconds"}
            {!loaded && (
                    <div className="meter">
                        <span id="spanbar" style={{width: "0%"}}></span>
                    </div>
            )}

            <table>
                <tr className='navbar'>
                    <th className='tableHeader'>Building</th>
                    <th className='tableHeader'>Shortcode</th>
                    <th className='tableHeader'>Rooms</th>
                    <th className='tableHeader'>Courses</th>
                    <th className='tableHeader'>Sections</th>
                    <th className='tableHeader'>Meetings</th>
                </tr>
                {loaded && buildingStats.map((building, index) => (
                            <tr key={index}>
                                <td className='tableData'>{building.building.Name}</td>
                                <td className='tableData'>{building.building.ShortCode}</td>
                                <td className='tableData'>{building.rooms}</td>
                                <td className='tableData'>{building.courses}</td>
                                <td className='tableData'>{building.sections}</td>
                                <td className='tableData'>{building.meetings}</td>
                            </tr>
                        ))
                    }
            </table>
        </div>
    );
}

export default Stats;