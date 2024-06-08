import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";
import { type } from "@testing-library/user-event/dist/type";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";

const getProductList = (query) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_GET_REQUEST})
    const response = await api.get("/product",{
      params : {...query}
    });
    if(response.status !== 200) throw new Error(response.error);
    
    const filterData = response.data.data.filter((product)=> !product.isDeleted);
    dispatch({type: types.PRODUCT_GET_SUCCESS,   payload: {data: filterData,totalPageNum: response.data.totalPageNum}})
    // dispatch({type: types.PRODUCT_GET_SUCCESS,payload:response.data})
  
  }catch(error){
    dispatch({type:types.PRODUCT_GET_FAIL,payload:error.error})
  }
};
const getProductDetail = (id) => async (dispatch) => {
  try{
    dispatch({type: types.GET_PRODUCT_DETAIL_REQUEST});
    const response = await api.get(`/product/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.data});
    console.log("response!!!!", response.data.data)

  }catch(error){
    dispatch({type:types.PRODUCT_GET_FAIL,payload:error.error})
    dispatch(commonUiActions.showToastMessage(error.error,"error"))
  }
};

const createProduct = (formData) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_CREATE_REQUEST})
    const response = await api.post("/product",formData)
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_CREATE_SUCCESS})
    dispatch(commonUiActions.showToastMessage("Complete","success"))
    dispatch(getProductList({page:1,name:""})); // 상품생성 요청하고 다시 리스트 보여주기 
    

  }catch(error){
    dispatch({type:types.PRODUCT_CREATE_FAIL,payload:error.error})
    dispatch(commonUiActions.showToastMessage(error.error,"error"))
  }
};
const deleteProduct = (id) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_DELETE_REQUEST});
    const response = await api.patch(`/product/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type: types.PRODUCT_DELETE_SUCCESS});
    dispatch(commonUiActions.showToastMessage("Delete Success","success"));
    dispatch(getProductList({page:1,name:""}));

  }catch(error){
    dispatch({type:types.PRODUCT_DELETE_FAIL, payload:error.error})
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_EDIT_REQUEST})
    const response = await api.put(`/product/${id}`,formData)
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_EDIT_SUCCESS,payload:response.data.data})
    dispatch(commonUiActions.showToastMessage("Complete","success"))
    dispatch(getProductList({page:1,name:""}));
  }catch(error){
    dispatch({type:types.PRODUCT_EDIT_FAIL,payload:error.error});
    dispatch(commonUiActions.showToastMessage(error.error,"error"));
    
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
