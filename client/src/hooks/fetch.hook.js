import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = 'http://localhost:8070';

export default function useFetch(query){
    const [getData,setData] = useState({isLoading : false, apiData: undefined,status: null, serverError: null})
}