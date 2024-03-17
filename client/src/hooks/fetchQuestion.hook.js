import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data from "../database/data";

/** redux actions */
import * as Action from '../store/question_reducer';

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading : false,
        apiData : [],
        serverError : null
    });
    console.log("inside hooks")
    useEffect(() => {
        setGetData(prev => ({...prev,isLoading : true}));

        /** async function for fetching data from backend */
        (async () => {
            console.log("inside async 1")
            try{
                let question = await data;
                if(question.length > 0){
                    setGetData(prev => ({isLoading : true}));
                    setGetData(prev => ({apiData : question}));
                    console.log("inside async 2")
                    /** dispatch an action*/
                    dispatch(Action.startExamAction(question))
                }else{
                    throw new Error("No Question Available"); 
                }
            } catch (error) {
                setGetData(prev => ({isLoading : false}));
                setGetData(prev => ({serverError : error}));
            }
        })();
    },[dispatch]);

    return [getData,setGetData];
}