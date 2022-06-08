import React, { useState, useEffect } from 'react'
import { variable } from './Variables';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CourseDetails() {
    const [courses, setCourses] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

    // function navigateTo(cid) {
    //     navigate('/Students', { state: { id: cid } })
    // };

    useEffect(() => {
        getAllCourses();
    }, []);

    const getAllCourses = () => {
        axios.get(`${variable.API_URL}Course?CollegeID=${location.state.id}`)
            .then((response) => {
                const allCourses = response.data;
                setCourses(allCourses);
            })
            .catch(error => console.error(`Error : ${error}`));
    }


    return (
        <div>
            <table className='table table-striped table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(cou => {
                        return (
                            <tr key={cou.course_ID}>
                                <td>{cou.course_ID}</td>
                                <td>{cou.course_Name}</td>
                                <td> <button className='btn btn-success' onClick={() => {
                                    navigate('/Students', { state: { id: cou.course_ID, clgid: location.state.id } })
                                }}>Show Details</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* <button className='btn btn-info' onClick={() => {
                navigate('/');
            }}> Back </button> */}
        </div>
    )
}

export default CourseDetails