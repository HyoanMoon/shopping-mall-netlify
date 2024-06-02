import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
  try{
    dispatch({type: types.LOGIN_WITH_TOKEN_REQUEST})
    const response = await api.get("/user/me")
    if(response.status !== 200)
      throw new Error(response.data.message)
    console.log("rrrrr", response);
    dispatch({type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data})

  }catch(error){
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: error.message })
    dispatch(logout())
  }
};

const loginWithEmail =
  ({ email, password }) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.LOGIN_REQUEST })
        const response = await api.post("/user/login", { email, password });
        if (response.status !== 200)
          throw new Error(response.data.message) //catch에서 에러 잡음
      
        dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
        sessionStorage.setItem("token", response.data.token)

      } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, payload: error.message })
      }
    };

const logout = () => async (dispatch) => {
  dispatch({type: types.LOGOUT})
  sessionStorage.removeItem("token");
  
};

const loginWithGoogle = (token) => async (dispatch) => { };

const registerUser =
  ({ email, name, password }, navigate) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.REGISTER_USER_REQUEST })
        const response = await api.post("/user", { email, name, password });
        if (response.status !== 200)
          throw new Error(response.data.message) //catch에서 에러 잡음

        dispatch({ type: types.REGISTER_USER_SUCCESS });
        dispatch(commonUiActions.showToastMessage("Registration Successful!", "success"));
        navigate("/login")

      } catch (error) {
        dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message })
      }
    };

const clearError = () => async (dispatch) => {
      dispatch({ type: types.CLEAR_ERROR_MESSAGE});
    };



export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  clearError,
};
