import React, { useState, useEffect, useRef } from 'react'
import { variable } from './Variables';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TransactionDetails() {

    const [transactions, setTransactions] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTransactions();
    }, []);

    const getAllTransactions = () => {
        axios.get(`${variable.API_URL}Transactions?StudentID=${location.state.id}`)
            .then((response) => {
                const allTransactions = response.data;
                setTransactions(allTransactions);
            })
            .catch(error => console.error(`Error : ${error}`));
    }

    if (transactions.length > 0) {
        return (
            <div>
                <table className='table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Student ID</th>
                            <th>Amount</th>
                            <th>Transaction Data-Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(std => {
                            if (std.transaction_StudentID == location.state.id) {
                                return (
                                    <tr key={std.transaction_ID}>
                                        <td>{std.transaction_ID}</td>
                                        <td>{std.transaction_StudentID}</td>
                                        <td>{std.transaction_Amount}</td>
                                        <td>{std.transaction_TimeDate}</td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>

                {/* <button className='btn btn-info' onClick={() => {
                    navigate('/Student', { state: { id: location.state.cid, stid: location.state.id } })
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
                            <th>Transaction ID</th>
                            <th>Student ID</th>
                            <th>Amount</th>
                            <th>Transaction Data-Time</th>
                        </tr>
                    </thead>
                </table>
                <h6>No Transaction History</h6>
                {/* <button className='btn btn-info' onClick={() => {
                    navigate('/Student', { state: { id: location.state.cid, stid: location.state.id } })
                }}> Back </button> */}
            </div >
        )
    }

}

export default TransactionDetails