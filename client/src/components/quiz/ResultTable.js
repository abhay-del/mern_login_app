import React, { useEffect, useState } from 'react';
import { getServerData } from '../../helper/helper';

export default function ResultTable(){
    
    const [data,setData] = useState([]);

    useEffect(() => {
        console.log("inside ResultTsable")
        getServerData(`${process.env.REACT_APP_SERVER_DOMAIN}/api/result`,(res) => {
            //console.log("inside getServerData ", res)
            setData(res);
        });
    },[])
    //console.log(data)
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
                    
                    {!data ?? <div>No Data Found!</div>}
                    {
                        data.map((v,i) => (
                            <tr className='table-body' key={i}> 
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td style={{ color : `${v?.achived === "Passed"? "green" : "red"}`}}>{v?.achived || ''}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}