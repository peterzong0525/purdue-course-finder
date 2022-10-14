import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../index.js';

function Subjects() {
  const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        var url = `${serverURL}/subjects`;
        const config = {
          headers:{
            "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
          }
        };
        axios.get(url, config).then((response) => {
            const data = response.data;
            setSubjects(data);
        });
    }, [])

  const displaySubjects = (subjects) => {
    if (!subjects.length) {
        return null;
    }

    return subjects.map((subject, index) => (
        <div key={index}>
            <p>ID: {subject.Id}</p>
            <p>Abbreviation: {subject.Abbreviation}</p>
            <p>Name: {subject.Name}</p>
            <a href={`./courses/${subject.Abbreviation}`}>Courses</a>
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
