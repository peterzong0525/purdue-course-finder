import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../index.js';

function Sections() {
    const [sections, setSections] = useState([]);

    // Gets the unique ID for the class from the end of the dynamic URL
    var courseID = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
    );

    useEffect(() => {
        var url = `${serverURL}/sections/${courseID}`;
        const config = {
            headers:{
                "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
            }
        };
        axios.get(url, config).then((response) => {
            const data = response.data;
            setSections(data);
        });
    }, [])

  const displaySections = (sections) => {
    if (!sections.length) {
        return null;
    }

    return sections.map((section, index) => (
        <div key={index}>
            <p>ID: {section.Id}</p>
            <p>CRN: {section.Crn}</p>
            <p>Type: {section.Type}</p>
            <p>Registration Status: {section.RegistrationStatus}</p>
            <p>Capacity: {section.Capacity}</p>
            <p># of Students Enrolled: {section.Enrolled}</p>
            <p>Remaining Space: {section.RemainingSpace}</p>
            <p>-----------</p>
        </div>
    ))
  }

  return (
    <div>
        <div>{displaySections(sections)}</div>
    </div>
  )
}

export default Sections
