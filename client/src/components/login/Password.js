import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../../assets/profile.png';
import { Toaster, toast} from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate';
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store';
import { verifyPassword } from '../../helper/helper.js';

import styles from '../../styles/Username.module.css'

export default function Password(){

    const navigate = useNavigate();
    const {username} = useAuthStore(state => state.auth);
    console.log("password 17 ",username)
    const [{ isLoading, apiData, serverError}]= useFetch(`/user/${username}`)
    console.log(apiData)

    const formik = useFormik({
        initialValues : {
            password : ''
        },
        validate : passwordValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async values => {
            try{
                let loginPromise = verifyPassword({username, password : values.password});
                toast.promise(loginPromise, {
                    loading : 'Checking...',
                    success : <b>Login Successfully...!</b>,
                    error : <b>Password Not Match!</b>
                })
                
                loginPromise.then(res => {
                    let { token } = res.data;
                    localStorage.setItem('token', token);
                    navigate('/profile');
                }).catch(error =>{
                        return {error};
                })
            }catch(error){
                toast.error("Password not match!")
            }
            
        }
    })

    if(isLoading) return <h1 className='text-2xl fint-bold'>Loading</h1>
    if(serverError) return <h1 className='text-2xl fint-bold'>{serverError.message}</h1>

    return (
       <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Explore More By Connecting with us.
                    </span>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
                    </div>
                    <div className="textbox" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' style={{marginBottom:'10px'}} />
                        <button className={styles.btn} type='submit'>Sign Up</button>
                    </div>

                    <div className="text-center py-4">
                        <span className='text-grey-500'>
                            Forgot Password? 
                            <u>
                                <Link className='text-red-500' to="/recovery">Recover Now!</Link>
                            </u>
                        </span>
                    </div>
                </form>
            </div>
        </div>
       </div>  
    )
}   