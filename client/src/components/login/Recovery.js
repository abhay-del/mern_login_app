import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { generateOTP,verifyOTP } from '../helper/helper';
import {useNavigate} from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

import styles from '../styles/Username.module.css'

export default function Recovery(){

    const navigate = useNavigate();
    const {username} = {username:"admin123"};//useAuthStore(state => state.auth);
    console.log("username ",username)
    const [OTP,setOTP] = useState();
    
    
    useEffect(() => {
        console.log("username ", username)
        if(!username) return navigate('/password');
        generateOTP(username).then((OTP) => {
            console.log(OTP)
            if(OTP) return toast.success("OTP has been sent to your email");
            return toast.error("Problem while generating OTP!");
        })
    },[username]);
    
    async function onSubmit(e){
        e.preventDefault();
        try{
            let {status} = await verifyOTP({username, code : OTP});
            if(status === 201){
                toast.success("Verify Successfully!");
                return navigate('/reset');
            }
        }catch(error){
            return  toast.error("Wrong OTP! Check Email Again!")
        }
    }
    // handler function of resend OTP
    function resendOTP(){
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise, {
            loading : "Loading...",
            success : <b>OTP has been send to your email!</b>,
            error : <b>Could not send it!</b>
        });

        sendPromise.then(OTP => {
            console.log(OTP)
        })
    }
    

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
                <form className="py-20" onSubmit={onSubmit}>
                    <div className="textbox flex flex-col items-center gap-6" >
                        <div className='input text-center'>
                            <span className='py-4 text-sm text-left text-gray-500'>
                                Enter 6 digit OTP sent to your email address.
                            </span>
                            <input onChange={e => setOTP(e.target.value)} className={styles.textbox} type="number" placeholder='OTP' style={{marginBottom:'10px'}} />
                        </div>
                        <button className={styles.btn} type='submit'>Recover</button>
                    </div>
                </form>
                <div className="text-center py-4">
                    <span className='text-grey-500'>
                        Can't get OTP? 
                        <button onClick={resendOTP} className='text-red-500'>Resend</button>
                    </span>
                </div>
            </div>
        </div>
       </div>  
    )
}   