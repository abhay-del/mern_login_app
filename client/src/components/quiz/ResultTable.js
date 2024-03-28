import React from 'react';

export default function ResultTable({earnPoints,attempts,isPassed}){
    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attempts</td>
                        <td>Earn Points</td>
                        <td>Results</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-body'> 
                        <td>Abhay</td>
                        <td>{attempts}</td>
                        <td>{earnPoints}</td>
                        <td style={{ color : `${isPassed? "green" : "red"}`}}>{isPassed ? "Passed":"Failed"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}