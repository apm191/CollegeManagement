import React, { useState, useEffect, useRef } from 'react'
import { variable } from './Variables';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    const put_id = useRef(null);
    const put_name = useRef(null);
    const put_clgid = useRef(null);
    const put_email = useRef(null);
    const put_fees = useRef(null);
    const put_org = useRef(null);


    const location = useLocation();

    useEffect(() => {
        getAllStudents();
    }, []);


    const putdata = (e) => {

        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        // debugger;
        const data = {
            "student_ID": put_id.current.innerHTML,
            "student_Name": put_name.current.innerHTML,
            "student_CollegeID": put_clgid.current.innerHTML,
            "student_Email": put_email.current.innerHTML,
            "fees": put_org.current.innerHTML - put_fees.current.value
        };

        const transdata = {
            "transaction_StudentID": put_id.current.innerHTML,
            "transaction_Amount": put_fees.current.value,
            "transaction_TimeDate": date
        }
        console.log(transdata.tansaction_Amount);

        axios.post(`${variable.API_URL}Student`, data)
            .then(response => response.json).then(
                axios.post(`${variable.API_URL}Transactions`, transdata)
                    .then(response => response.json)
            ).then(window.location.reload());
    };


    const getAllStudents = () => {
        axios.get(`${variable.API_URL}Student?CourseID=${location.state.id}`)
            .then((response) => {
                const allStudents = response.data;
                setStudents(allStudents);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    return (
        <div>
            <table className='table table-striped table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Student College</th>
                        <th>Student Email</th>
                        <th>Fees</th>
                        <th>Pay Fees</th>
                        <th>Transaction History</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(std => {
                        if (std.student_ID === location.state.stid) {
                            return (
                                <tr key={std.student_ID}>
                                    <td ref={put_id}>{std.student_ID}</td>
                                    <td ref={put_name}>{std.student_Name}</td>
                                    <td ref={put_clgid}>{std.student_CollegeID}</td>
                                    <td ref={put_email}>{std.student_Email}</td>
                                    <td ref={put_org}>{std.fees}</td>
                                    <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Pay Fees
                                    </button>
                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="staticBackdropLabel">Fees Payment Portal</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <h6>Student ID : {std.student_ID}</h6>
                                                        <h6>Student Name : {std.student_Name}</h6>
                                                        <h6>Fees : {std.fees}</h6>
                                                        <label>
                                                            Enter Amount:
                                                            <input type="text" className='inputfees' ref={put_fees} />
                                                        </label>
                                                    </div>
                                                    <div className="modal-footer">
                                                        {/* <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => {
                                                            navigate('/Transaction', { state: { id: std.student_ID } })
                                                        }
                                                        }>All Transactions</button> */}
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Abort</button>
                                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={() => { putdata() }}>Pay</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><button className='btn btn-success' onClick={() => {
                                        navigate('/Transaction', { state: { id: std.student_ID, cid: location.state.id } })
                                    }}>All Transactions</button></td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>

            {/* <button className='btn btn-info' onClick={() => {
                navigate('/Students', { state: { id: location.state.id } })
            }}> Back </button> */}

        </div >
    )
}

export default CourseDetails




