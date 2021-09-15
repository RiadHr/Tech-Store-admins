import axios from "axios";
import {
    ADDING_ITEM_ERROR,
    ADDING_ITEM_SUCCESS,
    GET_ITEMS_FAILED,
    GET_ITEMS_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED
} from "../actions/types";
import {clearErrors, returnErrors}from "./errorActions";


export const Add = ({nom, description,quantite, prix, photoURI, Category,Tags}) =>(dispatch, getState)=>{
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({nom, description,quantite, prix, photoURI, Category,Tags});
    axios
    .post("http://localhost:5000/api/Produit", body, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type:ADDING_ITEM_SUCCESS
        })
        clearErrors();
    })
    .catch(error=>{
        console.log(error.message);
        dispatch({
            type: ADDING_ITEM_ERROR
        });
    });
};

export const Delete = ({_id})=>(getState, dispatch)=>{
    const token = getState().auth.token;
    const config = {
        headers:{
            "Content-Type":"application/json",
            "x-auth-token":token
        }
    }
    
    const body = JSON.stringify({_id,"ReqType":"Delete"});
    axios.post("http://localhost:5000/api/Produit", body, config)
    .then(res=>{
        clearErrors();
        
        dispatch({
            type: DELETE_PRODUCT_SUCCESS

        })
    })
    
    .catch((error)=>{
        console.log(error.message);
        if(error.response){
            dispatch(returnErrors(error.response.status, error.response.data, "DELETE_CATEGORIES_FAILED"));
        }
        
        dispatch({
            type:  DELETE_PRODUCT_FAILED

        })
    });
}


export const getListProduct  = () => (dispatch, getState)=>{
    const token = getState().auth.token;
    const config = {
        headers:{
            "Content-Type":"application/json",
            'x-auth-token':token
        }
    }
    
    axios
    .get("http://localhost:5000/api/ProductUtils",tokenConfig(getState))
    .then(res =>{
        clearErrors();
        dispatch({
            type:GET_ITEMS_SUCCESS,
            payload:res.data
        })
    })
    .catch(error=>{
        if(error.response){
            dispatch(returnErrors(error.response.status, error.response.data,"GET_ITEMS_FAILED"));
        }
        
        dispatch({
            type: GET_ITEMS_FAILED
        })
        
    });
}


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