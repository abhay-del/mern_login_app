import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

import styles from '../styles/Username.module.css'

export default function Recovery(){

    const formik = useFormik({
        initialValues : {
            password : 'admin@123'
        },
        validate : passwordValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async values => {
            console.log(values);
        }
    })

    return (
       <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className='text-5xl font-bold'>Recovery</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Enter OTP to recover password.
                    </span>
                </div>
                <form className="py-20" onSubmit={formik.handleSubmit}>
                    <div className="textbox flex flex-col items-center" >
                        <span className='py-4 text-sm text-left text-gray-500'>
                            Enter 6 digit OTP sent to your email address.
                        </span>
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' style={{marginBottom:'10px'}} />
                        <button className={styles.btn} type='submit'>Sign Up</button>
                    </div>

                    <div className="text-center py-4">
                        <span className='text-grey-500'>
                            Forgot Password? 
                            <u>
                                <Link className='text-red-500' to="/register">Recover Now!</Link>
                            </u>
                        </span>
                    </div>
                </form>
            </div>
        </div>
       </div>  
    )
}   