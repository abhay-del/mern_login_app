import React, { useEffect } from 'react';

import '../../styles/Result.css';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number,earnPoints_Number, flagResult_String } from '../../helper/helper';

/** import actions */
import { resetAllAction } from '../../store/question_reducer';
import { resetResultAction } from '../../store/result_reducer';
import { usePublishResult } from '../../hooks/setResult';


export default function Result(){

    const dispatch = useDispatch();
    const {questions:{queue,answers}, result : {result, userId}} = useSelector(state => state);


    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result,answers,10); 
    const isPassed = flagResult_String(totalPoints,earnPoints);
    
    console.log({ result, username : userId, attempts, points : earnPoints, achived : isPassed ? "Passed":"Failed"})
    usePublishResult({ 
        result, 
        username : userId, 
        attempts, points : earnPoints,
         achived : isPassed ? "Passed":"Failed"
    })
    
    function onRestart(){
        console.log("on Restart");
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }


    return (
        <div className='container1'>
            <h1 className="title text-light">Quiz Application</h1>

            <div className='result flex-center'>
                <div className="flex">
                    <span>Username</span>
                    <span className="bold">Abhay </span>
                </div>
                <div className="flex">
                    <span>Total Quiz Points</span>
                    <span className="bold">{totalPoints || 0} </span>
                </div>
                <div className="flex">
                    <span>Total Questions : </span>
                    <span className="bold">{queue.length || 0} </span>
                </div>
                <div className="flex">
                    <span>Total Attempts : </span>
                    <span className="bold">{attempts || 0} </span>
                </div>
                <div className="flex">
                    <span>Total Earn Points</span>
                    <span className="bold">{earnPoints || 0} </span>
                </div>
                <div className="flex">
                    <span>Quiz Result</span>
                    <span style={{ color : `${isPassed? "green" : "red"}`}} className="bold ">{isPassed ? "Passed":"Failed"} </span>
                </div>
            </div>

            <div className="start">
                <Link className='btn' to={'/root'} onClick={onRestart}>Restart</Link>
            </div>

            <div className='container1'>
                {/** Data Table */}
                <ResultTable></ResultTable>
            </div>

        </div>
    )
}