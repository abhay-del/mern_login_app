import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useFormik } from 'formik';

import '../../styles/Main.css'
import '../../styles/App.css';
import { setUserId } from '../../store/result_reducer';
import {useAuthStore} from '../../store/store';
import { usernameValidate } from '../../helper/validate';

export default function Main(){

    const inputRef = useRef(null);
    const {username} = useAuthStore(state => state.auth);
    const dispatch = useDispatch();
console.log(username)
    const formik = useFormik({
        initialValues : {
            username : username
        },
        validate : usernameValidate,
        validateOnBlur : false,
        validateOnChange : false,
    })

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

    return(
        <div className='container1'>
            <h1 className='title text-light'>Quiz Application</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id="form">
                <input {...formik.getFieldProps('username')} ref={inputRef} className='userid' type="text" placeholder='Username' />
            </form>

            <div className='start'>
                <Link className='btn' to={'/quiz'} onClick={startQuiz}>Start Quiz</Link>
            </div>

        </div>
    )
}