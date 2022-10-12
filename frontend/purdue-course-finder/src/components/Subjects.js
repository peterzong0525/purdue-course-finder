import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../index.js';

function Subjects() {
  const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // var url = `${serverURL}/subjects`;
        // axios.get(url).then((response) => {
        //     const data = response.data;
        //     setSubjects(data);
        // });
        setSubjects(['CS', 'MA', 'EAPS', 'STAT', 'CHM']);
    }, [])

  const displaySubjects = (subjects) => {
    if (!subjects.length) {
        return null;
    }

    return subjects.map((subject, index) => (
        <div key={index}>
            {/* <p>ID: {subject.id}</p>
            <p>Abbreviation: {subject.abbreviation}</p>
            <p>Name: {subject.name}</p> */}
            <p>{subject}</p>
            <a href={`./courses/${subject}`}>Courses</a>
            <p>-----------</p>
        </div>
    ))
  }

  return (
    <div>
        <div>{displaySubjects(subjects)}</div>
    </div>
  )
}

export default Subjects
