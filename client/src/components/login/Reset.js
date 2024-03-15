import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate';
import { resetPassword } from '../../helper/helper';
import { useAuthStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';

import styles from '../../styles/Username.module.css'

export default function Password(){

    const { username } = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const [{isLoading,apiData, status,serverError}] = useFetch('createResetSession')


    const formik = useFormik({
        initialValues : {
            password : 'admin@123',
            confirm_pwd : 'admin@123'
        },
        validate : resetPasswordValidation,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async values => {
            let resetPromise = resetPassword( {username, password : values.password})

            toast.promise(resetPromise,{
                loading : "Updateing...",
                success : <b>Reset Successfully...!</b>,
                error : <b>Could not Reset!</b>
            })

            resetPromise.then(function(){navigate("/password")})
        }
    })

    if(isLoading) return <h1 className='text-2xl fint-bold'>Loading</h1>
    if(serverError) return <h1 className='text-2xl fint-bold'>{serverError.message}</h1>
    if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

    return (
       <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className='text-5xl font-bold'>Reset</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Enter new password.
                    </span>
                </div>
                <form className="py-20" onSubmit={formik.handleSubmit}>
                    <div className="textbox" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' style={{marginBottom:'10px'}} />
                        <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Confirm Password' style={{marginBottom:'10px'}} />
                        <button className={styles.btn} type='submit'>Reset</button>
                    </div>
                </form>
            </div>
        </div>
       </div>  
    )
}   