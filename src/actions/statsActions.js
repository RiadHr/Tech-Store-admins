import axios from "axios";
import {
    USER_STATS_LOADED,
    USER_STATS_UNAVAILABLE,
    PRODUCT_STATS_LOADED,
    PRODUCT_STATS_UNAVAILABLE
} from "../actions/types";
import {clearErrors, returnErrors}from "./errorActions";


export const GetUserStats = () =>(dispatch, getState)=>{
    const token = getState().auth.token;
    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
        }
    }
    axios
    .get("http://localhost:5000/api/user", config)
    .then(res =>{
        dispatch({
            type:USER_STATS_LOADED,
            payload:res.data
        });
        clearErrors();

    })
    .catch(error=>{
        if(error.response){
            dispatch(returnErrors(error.response.data, error.response.status, "USER_STATS_UNAVAILABLE"));
        }
        else if(error.request){
            dispatch(returnErrors("failed to load statistics ", 400, "USER_STATS_UNAVAILABLE"));
        
        }

        dispatch({
            type: USER_STATS_UNAVAILABLE
        });
    });
};



export const GetProductStats = () =>(dispatch, getState)=>{
    const token = getState().auth.token;
    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
        }
    }
    axios
    .get("http://localhost:5000/api/Produit", config)
    .then(res =>{
        dispatch({
            type:PRODUCT_STATS_LOADED,
            payload:res.data
        });
        clearErrors();

    })
    .catch(error=>{
        if(error.response){
            dispatch(returnErrors(error.response.data, error.response.status, "PRODUCT_STATS_UNAVAILABLE"));
        }
        else if(error.request){
            dispatch(returnErrors("failed to load statistics ", 400, "PRODUCT_STATS_UNAVAILABLE"));
        
        }

        dispatch({
            type: PRODUCT_STATS_UNAVAILABLE
        });
    });
};