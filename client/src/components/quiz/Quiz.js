import React from 'react';
import Questions from './Questions';



import '../../styles/App.css';

export default function Quiz(){

    /**Next Button Event hanlder */
    function onNext(){
        console.log("On Next Click");
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