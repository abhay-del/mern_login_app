import React, { useEffect, useState } from 'react';
import data from '../../database/data';
import { useSelector } from 'react-redux';

/** custom hooks */
import { useFetchQuestion } from '../../hooks/fetchQuestion.hook';

export default function Questions(){

    const [checked, setChecked] = useState(undefined);
    const [{ isLoading, apiData , serverError }] = useFetchQuestion();
    const question = data[0]; 
    const  questions  = useSelector(state => state.questions.queue[state.questions.trace]);
   

    useEffect(() => {
        console.log(questions)
    })

    function onSelect(){
       // setChecked(true);
        //console.log('radio button change')
    }

    if(isLoading) return <h3 className='text-light'> Loading...</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error..."}</h3>

    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q,i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={checked}
                            name="options"
                            id={`q${i}-option`}
                            onChange={onSelect()}
                        />
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className="check "></div>
                    </li> 
                    ))
                }

                
            </ul>
        </div>
    )
}