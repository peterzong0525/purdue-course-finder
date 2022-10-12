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
        // var url = `${serverURL}/sections/${courseID}`;
        // axios.get(url).then((response) => {
        //     const data = response.data;
        //     setSections(data);
        // });
        setSections([
            {
                id: 0,
                crn: "LE1",
                status: "NotAvailable",
                capacity: 108,
                enrolled: 108,
                remainingSpace: 0
            },
            {
                id: 1,
                crn: "LE2",
                status: "Open",
                capacity: 110,
                enrolled: 109,
                remainingSpace: 1
            }
        ])
    }, [])

  const displaySections = (sections) => {
    if (!sections.length) {
        return null;
    }

    return sections.map((section, index) => (
        <div key={index}>
            <p>ID: {section.id}</p>
            <p>CRN: {section.crn}</p>
            <p>Registration Status: {section.status}</p>
            <p>Capacity: {section.capacity}</p>
            <p># of Students Enrolled: {section.enrolled}</p>
            <p>Remaining Space: {section.remainingSpace}</p>
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
