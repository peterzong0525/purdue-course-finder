import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { serverURL } from '../index.js';

function Courses() {
  const [courses, setCourses] = useState([]);

    useEffect(() => {
        // var url = `${serverURL}/courses`;
        // axios.get(url).then((response) => {
        //     const data = response.data;
        //     setCourses(data);
        // });
        setCourses([
            {
                CourseId: 0, 
                Number: 307, 
                Title: 'Software Engineering I', 
                CreditHours: 3.0, 
                Description: 'Description for CS307', 
                Subject: 'CS',
            },
            {
                CourseId: 1, 
                Number: 354, 
                Title: 'Operating Systems', 
                CreditHours: 3.0, 
                Description: 'Description for CS354', 
                Subject: 'CS',
        }]);
    }, [])

  const displayCourses = (courses) => {
    if (!courses.length) {
      return null;
    }

    return courses.map((course, index) => (
        <div key={index}>
            <p>ID: {course.CourseId}</p>
            <p>Name: {course.Subject} {course.Number}</p>
            <p>Title: {course.Title}</p>
            <p>Credits: {course.CreditHours}</p>
            <p>Description: {course.Description}</p>
            <a href={`./sections/${course.CourseId}`}>Sections</a>
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
