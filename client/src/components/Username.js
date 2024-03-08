import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store.js';

import styles from '../styles/Username.module.css'

export default function Username(){

    const navigate = useNavigate();

    const setUsername = useAuthStore(state => state.setUsername);
    //const username = useAuthStore(state => state.auth.username);

    
    const formik = useFormik({
        initialValues : {
            username : 'example1234'
        },
        validate : usernameValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async values => {
            console.log(values);
            setUsername(values.username);
            navigate('/password');
        }
    })

    return (
       <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className='text-5xl font-bold'>Hello Again</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Explore More By Connecting with us.
                    </span>
                </div>
                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        <img src={avatar} className={styles.profile_img} alt="avatar" />
                    </div>
                    <div className="textbox" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' style={{marginBottom:'10px'}}/>
                        <button className={styles.btn} type='submit'>Let's Go</button>
                    </div>

                    <div className="text-center py-4">
                        <span className='text-grey-500'>
                            Not a Member 
                            <u>
                                <Link className='text-red-500' to="/register">Update Now 2</Link>
                            </u>
                        </span>
                    </div>
                </form>
            </div>
        </div>
       </div>  
    )
}   