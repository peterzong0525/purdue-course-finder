import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../index.js';

function Courses() {
  const [courses, setCourses] = useState([]);

    useEffect(() => {
        var url = `${serverURL}/courses/CS`;
        axios.get(url).then((response) => {
            const data = response.data;
            setCourses(data);
        });
    }, [])

  const displayCourses = (courses) => {
    if (!courses.length) {
        return null;
    }

    return courses.map((course, index) => (
        <div key={index}>
            <p>ID: {course.id}</p>
            <p>Name: {course.subject.abbreviation} {course.courseNumber}</p>
            <p>Title: {course.title}</p>
            <p>Credits: {course.creditHours}</p>
            <p>Description: {course.description}</p>
            <a href={`./sections/${course.id}`}>Sections</a>
            <p>-----------</p>
        </div>
    ))
  }

  return (
    <div>
        <div>{displayCourses(courses)}</div>
    </div>
  )
}

export default Courses
