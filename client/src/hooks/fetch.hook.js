import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

//axios.defaults.baseURL = 'http://localhost:8070';
const baseURL = 'http://localhost:8070';


/** custom hook */
export default function useFetch(query){
    const [getData,setData] = useState({isLoading : false, apiData: undefined,status: null, serverError: null});

    useEffect(()=> {
        
        const fetchData = async () => {
            try{
                setData(prev => ({...prev,isLoading:true}))
                
                const {username} = !query ? await getUsername() : '';
                console.log("username in hook ", username);
                const {data,status} = !query ? await axios.get(`${baseURL}/api/user/${username}`) : await axios.get(`${baseURL}/api/${query}`)

                if(status === 201){
                    setData(prev => ({...prev, isLoading:false}))
                    setData(prev => ({...prev, apiData:data, status}))
                }else{
                    setData(prev => ({...prev, isLoading:false}))
                }
            }catch(error) {
                setData(prev => ({...prev,isLoading:false,serverError: error}))    
            }
        }
        fetchData();
    },[query])

    return [getData,setData];
}