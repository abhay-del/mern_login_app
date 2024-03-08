import axios from 'axios';

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.baseURL = 'http://localhost:8070';




/** authenticate function */
export async function authenticate(username){
    try{
        console.log(process.env.REACT_APP_SERVER_DOMAIN);
        return await axios.post('/api/authenticate',{username})
    } catch (error){
        return {error : "Username doesn't exist...!"}
    }
}


/** get user details */
export async function getUser({ username }){
    try{
        const { data } = await axios.get(`http://localhost:8070/api/user/${username}`);

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
        const {data : {code},status}= await axios.get('http://localhost:8070/api/generateOTP',{params : {username}});

        if(status === 201){
            let {data : {email}} = await getUser({username});
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', {username, userEmail : email, text, subject : "Password Recovery Email"});
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