import React, {useEffect} from 'react';
import Questions from './Questions';


import { MoveNextQuestion , MovePrevQuestion} from '../../hooks/fetchQuestion.hook';
import { PushAnswer } from '../../hooks/setResult';

/** redux store import */
import { useSelector,useDispatch} from 'react-redux';

import '../../styles/App.css';

export default function Quiz(){

    const state = useSelector(state => state);
    const { queue, trace} = useSelector(state => state.questions);
    const dispatch = useDispatch();

    useEffect(()=> {
        console.log(trace);
        console.log(queue);
        console.log(state);
    })


    /**Next Button Event hanlder */
    function onNext(){
        console.log("On Next Click");
        if(trace < queue.length){
            /** update the trace value by one using MoveNextAction  */
            dispatch(MoveNextQuestion());

            dispatch(PushAnswer(1));
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



    return(
        <div className='container1'>
            <h1 className='title text-light'>Quiz Application</h1>

           { /** display Questions */}

            <Questions></Questions>
            
           <div className="grid">
            <button className='btn prev' onClick={onPrev}>Prev</button>
            <button className='btn next' onClick={onNext}>Next</button>
           </div>

        </div>
    )
}