import React, { Component } from 'react'
import { variable } from './Variables.js';
import axois from 'axios'

export class Colleges extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colleges: []
        }
    }

    refreshList() {
        fetch(variable.API_URL + 'College', { mode: 'no-cors' })
            .then(response => { const colleges = response.json(); this.setState({ colleges: colleges }); })
            .catch(err => { console.log(err); });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            colleges
        } = this.state;
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>College ID</th>
                            <th>College Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colleges.map(clg => {
                            return (
                                <tr key={clg.CollegeID}>
                                    <td>{clg.CollegeID}</td>
                                    <td>{clg.CollegeName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { variable } from './Variables';

export default function Colleges() {

    const [colleges, getColleges] = useState([]);

    useEffect(() => {
        getAllColleges();
    }, []);

    const getAllColleges = () => {
        axios.get(`${variable.API_URL}College`)
            .then((response) => {
                const allColleges = response.data;
                getColleges(allColleges);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    return (
        <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>College ID</th>
                        <th>College Name</th>
                    </tr>
                </thead>
                <tbody>
                    {colleges.map(clg => {
                        return (
                            <tr key={clg.CollegeID}>
                                <td>{clg.CollegeID}</td>
                                <td>{clg.CollegeName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}





import React, { Component } from 'react'
import { variable } from './Variables.js';
import CourseDetails from './CourseDetails.js';

export class Colleges extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colleges: []
        }
    }

    refreshList() {
        fetch(variable.API_URL + 'College')
            .then(response => {
                const colleges = response.json();
                this.setState({ colleges: response });
                console.log(colleges[0]);
            })
            .catch(err => { console.log(err); });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            colleges
        } = this.state;
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>College ID</th>
                            <th>College Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colleges.map(clg => {
                            return (
                                <tr key={clg.collegeID}>
                                    <td>{clg.collegeID}</td>
                                    <td>{clg.collegeName}</td>
                                    <button type="button" class="btn btn-success" onClick={<CourseDetails id={clg.collegeID} />}>Show Details</button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}