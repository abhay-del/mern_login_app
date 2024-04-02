import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/** redux actions */
import * as Action from '../store/question_reducer';
import { getServerData } from "../helper/helper";

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
                
                const [{questions,answers}] = await getServerData('http://localhost:8070/api/questions',(data)=>data)
                console.log({questions,answers})
                //console.log(question)
                if(questions.length > 0){
                    setGetData(prev => ({...prev,isLoading : false}));
                    setGetData(prev => ({...prev,apiData : {question : questions,answers}}));
                    console.log("inside async 2")
                    /** dispatch an action*/
                    dispatch(Action.startExamAction({question : questions,answers}))
                }else{
                    throw new Error("No Question Available"); 
                }
            } catch (error) {
                setGetData(prev => ({...prev,isLoading : false}));
                setGetData(prev => ({...prev,serverError : error}));
            }
        })();
    },[dispatch]);

    return [getData,setGetData];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch)=>{
    try{
        dispatch(Action.moveNextAction())
    } catch (error){
        console.log(error);
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch)=>{
    try{
        dispatch(Action.movePrevAction())
    } catch (error){
        console.log(error);
    }
}