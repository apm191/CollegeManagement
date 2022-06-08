import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { variable } from './Variables';
import { useNavigate } from "react-router-dom";

function Colleges() {

    const [colleges, setColleges] = useState([]);

    const navigate = useNavigate();

    // function navigateTo(cid) {
    //     navigate('/Courses', { state: { id: cid } })
    // };

    useEffect(() => {
        getAllColleges();
    }, []);

    const getAllColleges = () => {
        axios.get(`${variable.API_URL}College`)
            .then((response) => {
                const allColleges = response.data;
                setColleges(allColleges);
            })
            .catch(error => console.error(`Error : ${error}`));
    }


    return (
        <div>
            <table className='table table-striped table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th>College ID</th>
                        <th>College Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {colleges.map(clg => {
                        return (
                            <tr key={clg.college_ID}>
                                <td>{clg.college_ID}</td>
                                <td>{clg.college_Name}</td>
                                <td> <button className='btn btn-success' onClick={() => {
                                    navigate('/Courses', { state: { id: clg.college_ID } })
                                }}>Show Details</button></td>
                                {/* <button type="button" class="btn" onClick={<CourseDetails id={clg.college_ID} />}>Show Details</button> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default Colleges