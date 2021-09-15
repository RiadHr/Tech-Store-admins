import axios from "axios";
import {
  ADDING_CATEGORY_ERROR,
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  DELETE_CATEGORIES_FAILED,
  DELETE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
} from "../actions/types";
import { clearErrors, returnErrors } from "./errorActions";

export const Delete =
  ({ _id }) =>
  (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    console.log("here");
    const body = JSON.stringify({ _id, ReqType: "Delete" });
    axios
      .post("http://localhost:5000/api/Categorie", body, config)
      .then((res) => {
        console.log("here too");
        clearErrors();

        dispatch({
          type: DELETE_CATEGORIES_SUCCESS,
        });
      })

      .catch((error) => {
        console.log(error.message);
        if (error.response) {
          dispatch(
            returnErrors(
              error.response.status,
              error.response.data,
              "DELETE_CATEGORIES_FAILED"
            )
          );
        }

        dispatch({
          type: DELETE_CATEGORIES_FAILED,
        });
      });
  };
 
  
//   export const update = async (request, response) => {
//     let categories = await categories.findById(request.params.id);
//     categorie = request.body;

//     const editCategory = new Category(categorie);
//     try{
//         await Category.updateOne({_id: request.params.id}, editCategory);
//         response.status(201).json(editCategory);
//     } catch (error){
//         response.status(409).json({ message: error.message});     
//     }
// }


export const Add =
  ({ nom, description }) =>
  (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const body = JSON.stringify({ nom, description, ReqType: "Add" });
    axios
      .post("http://localhost:5000/api/Categorie", body, config)
      .then((res) => {
        clearErrors();
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch(returnErrors(error.response.status, error.response.data));
        }

        dispatch({
          type: ADDING_CATEGORY_ERROR,
        });
      });
  };

export const getListCategories = () => (dispatch, getState) => {
  axios
    .get("http://localhost:5000/api/Categorie", tokenConfig(getState))
    .then((res) => {
      clearErrors();
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch(returnErrors(error.response.status, error.response.data));
      }

      dispatch({
        type: GET_CATEGORIES_FAILED,
      });
    });
};
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
