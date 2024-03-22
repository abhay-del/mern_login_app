import React, {useEffect, useState} from 'react';
import Questions from './Questions';


import { MoveNextQuestion , MovePrevQuestion} from '../../hooks/fetchQuestion.hook';
import { PushAnswer } from '../../hooks/setResult';

/** redux store import */
import { useSelector,useDispatch} from 'react-redux';

import '../../styles/App.css';
import { Navigate } from 'react-router-dom';

export default function Quiz(){

   // const state = useSelector(state => state);
    const result = useSelector(state => state.result.result);
    const { queue, trace} = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const [check,setChecked] = useState(undefined);

    useEffect(()=> {
        // console.log(trace);
        // console.log(queue);
        console.log(result);
    })

    /**Next Button Event hanlder */
    function onNext(){
        console.log("On Next Click");
        if(trace < queue.length){
            /** update the trace value by one using MoveNextAction  */
            dispatch(MoveNextQuestion());

            /** insert a new result in the array. */
            if(check && result.length <= trace){
                dispatch(PushAnswer(check));
                setChecked(undefined);
            }
        } 
    }

    /**Prev Button Event hanlder */
    function onPrev(){
        console.log("On Prev Click");
        if(trace>0){
            /** update the trace value by one using MovePrevQuestion  */
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        console.log(check);
        setChecked(check);
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    return(
        <div className='container1'>
            <h1 className='title text-light'>Quiz Application</h1>

           { /** display Questions */}

            <Questions onChecked={onChecked}/>
            
           <div className="grid">
            {trace>0? <button className='btn prev' onClick={onPrev}>Prev</button>: <div></div>}
            {queue.length!= trace?<button className='btn next' onClick={onNext}>Next</button>:<></>}
           </div>

        </div>
    )
}