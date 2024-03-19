import React, {useEffect} from 'react';
import Questions from './Questions';


import { MoveNextQuestion } from '../../hooks/fetchQuestion.hook';

/** redux store import */
import { useSelector,useDispatch} from 'react-redux';

import '../../styles/App.css';

export default function Quiz(){

    const state = useSelector(state => state.questions.trace);
    const dispatch = useDispatch();



    /**Next Button Event hanlder */
    function onNext(){
        console.log("On Next Click");
        /** update the trace value by one using MoveNextAction  */
        dispatch(MoveNextQuestion())
    }

    /**Prev Button Event hanlder */
    function onPrev(){
        console.log("On Prev Click");
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