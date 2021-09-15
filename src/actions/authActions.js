import axios from "axios";
import {clearErrors, returnErrors}from "./errorActions";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
  } from './types';

export const login = ({email, password}) => dispatch =>{
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({email, password});
    axios
    .post("http://localhost:5000/api/auth", body, config)
    .then(res => {
        dispatch({
        type: LOGIN_SUCCESS,
        payload:res.data
        });
        clearErrors();
    })
    .catch(error => {
        if(error.response){
            dispatch(returnErrors(error.response.data, error.response.status, "LOGIN_FAIL"));
        }
        else if(error.request){
            dispatch(returnErrors("failed to log in", 400, "LOGIN_FAIL"));
        
        }
        
        dispatch({
            type: LOGIN_FAIL
        });
        
    });
};

export const logout = () =>{
    return{
        type:LOGOUT_SUCCESS
    };
};


  //Vérifer le token et charger l'utilisateur
export const loadUser = ()=> (dispatch, getState)=>{
    // User loading
    dispatch({type:USER_LOADING});

    //Get Token from localstorage
    const token = getState().auth.token;
    

    //Header
    const config = {
        headers:{
            "content-type":"application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"] = token;

    }
    axios
    .get("http://localhost:5000/api/auth", tokenConfig(getState))
    .then(res =>{
        dispatch({
        type: USER_LOADED,
        payload : res.data
        });
        clearErrors();

    })
    .catch(error=>{
        
        if(error.response){
            dispatch(returnErrors(error.response.data, error.response.status, "LOGIN_FAIL"));
        }
        else if(error.request){
            dispatch(returnErrors("failed to log in", 400, "LOGIN_FAIL"));
        
        }
        
        dispatch({
            type: AUTH_ERROR
        });

    });
};

export const tokenConfig = getState => {
    const token =  getState().auth.token;
    const config = {
        headers:{
            'Content-type' : "application/json",
            'x-auth-token':token
        }
    };
    if(token){
        config.headers["x-auth-token"] = token;
    }
    return config;
}