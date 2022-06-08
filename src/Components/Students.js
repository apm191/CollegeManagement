import React, { useState, useEffect } from 'react'
import { variable } from './Variables';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Students() {
    const [students, setStudents] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        getAllStudents();
    }, []);

    const getAllStudents = () => {
        // console.log(location.state.clgid)
        axios.get(`${variable.API_URL}Student?CourseID=${location.state.id}`)
            .then((response) => {
                const allStudents = response.data;
                setStudents(allStudents);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    if (students.length > 0) {
        return (
            <div>
                <table className='table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(std => {
                                return (
                                    <tr key={std.student_ID}>
                                        <td>{std.student_ID}</td>
                                        <td>{std.student_Name}</td>
                                        <td><button className='btn btn-success' onClick={() => {
                                            navigate('/Student', { state: { id: location.state.id, stid: std.student_ID } })
                                        }}>Show Details</button></td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>

                {/* <button className='btn btn-info' onClick={() => {
                    console.log(location.state.clgid);
                    navigate('/Courses', { state: { id: location.state.clgid } })
                }}> Back </button> */}
            </div >
        )
    }
    else {
        return (
            <div>
                <table className='table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
                <h6>No Records Found!!</h6>
                {/* <button className='btn btn-info' onClick={() => {
                    console.log(location.state.clgid);
                    navigate('/Courses', { state: { id: location.state.clgid } })
                }}> Back </button> */}
            </div>
        )
    }


}

export default Students