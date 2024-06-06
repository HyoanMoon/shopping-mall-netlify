import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";
import { type } from "@testing-library/user-event/dist/type";

const getProductList = (query) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_GET_REQUEST})
    const response = await api.get("/product",{
      params : {...query}
    });
    console.log("rrrrr",response);
    if(response.status !== 200) throw new Error(response.error);

    dispatch({type: types.PRODUCT_GET_SUCCESS,payload:response.data.data})
    

  }catch(error){
    dispatch({type:types.PRODUCT_GET_FAIL,payload:error.error})
  }
};
const getProductDetail = (id) => async (dispatch) => {};

const createProduct = (formData) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_CREATE_REQUEST})
    const response = await api.post("/product",formData)
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_CREATE_SUCCESS})
    dispatch(commonUiActions.showToastMessage("Complete","success"))
    dispatch(getProductList()); // 상품생성 요청하고 다시 리스트 보여주기 
    

  }catch(error){
    dispatch({type:types.PRODUCT_CREATE_FAIL,payload:error.error})
    dispatch(commonUiActions.showToastMessage(error.error,"error"))
  }
};
const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
