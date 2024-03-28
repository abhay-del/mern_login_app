import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { element } from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.baseURL = 'http://localhost:8070';


/** to get username from token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    //console.log(token)
    let decode = jwtDecode(token)
    console.log("decode ", decode)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try{
        console.log(process.env.REACT_APP_SERVER_DOMAIN);
        return await axios.post('http://localhost:8070/api/authenticate',{username})
    } catch (error){
        return {error : "Username doesn't exist...!"}
    }
}


/** get user details */
export async function getUser({ username }){
    try{
        const { data } = await axios.get(`http://localhost:8070/api/user/${username}`);
        console.log("user ", data);
        return {data};
    } catch(error){
        return {error : "Password don't match...!"}
    }
}


/** register user function */
export async function registerUser(credentials){
    try{
        const {data : {msg}, status} = await axios.post(`http://localhost:8070/api/register`,credentials);
        let {username,email} = credentials;

        /** send email */
        if(status === 201){
            await axios.post('http://localhost:8070/api/registerMail',{username,userEmail : email,text : msg})
        }
        return Promise.resolve(msg);
    }catch(error){
        return Promise.reject({error});
    }
}

/** login function */
export async function verifyPassword({username,password}){
    try{
        if(username){
           const { data } = await axios.post('http://localhost:8070/api/login',{username,password});
           console.log("data ",data)
           return Promise.resolve({data});
        }
    }catch(error){
        return Promise.reject({ error : "Password doesn't Match...!"});
    }
}

/** update user profile function */
export async function updateUser(response){
    try{

        const token = await localStorage.getItem('token');
        const data = await axios.put('http://localhost:8070/api/updateUser',response,{headers : {"Authorization" : `Bearer ${token}`}});

        return Promise.resolve({data});
    }catch(error){
        return Promise.reject({error : "Could't Update Profile...!"});
    }
}

/** generate otp */
export async function generateOTP(username){
    try{
        console.log("generateOTP ",username)
        const {data : {code},status}= await axios.get('http://localhost:8070/api/generateOTP',{params : {username}});
       
        if(status === 201){
            
            const {data : {email}} = await getUser({username});
            //console.log(obj);
            //let email = data?.data?.email;
            console.log(email);
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('http://localhost:8070/api/registerMail', {username, userEmail : email || "wrong@gmail.com", text, subject : "Password Recovery Email"});
            
        }
        return Promise.resolve(code);
    }catch(error){
        return Promise.reject({error});
    }
}

/** verify OTP */
export async function verifyOTP({username, code}){
    try{
        const {data, status} = await axios.get('http://localhost:8070/api/verifyOTP',{params: {username,code}});
        return {data,status};
    }catch(error){
        return Promise.reject({error});
    }
}

/** reset password*/
export async function resetPassword({username, password}){
    try{
        const {data,status} = await axios.put('http://localhost:8070/api/resetPassword', {username,password});
        return Promise.resolve({data,status});
    }catch(error){
        return Promise.reject({error});
    }
}

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result,answers,point){
    return result.map((element,i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev,curr) => prev + curr,0);
}

export function flagResult_String(totalPoints,earnPoints){
    return ((totalPoints * 0.5) < earnPoints);
}

export function CheckUserExist({children}){
    const auth = useSelector(state => state.result.userId);
    return auth ? children : <Navigate to="/root" replace={true}></Navigate>
}