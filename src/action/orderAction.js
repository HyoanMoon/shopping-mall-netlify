import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";
import { type } from "@testing-library/user-event/dist/type";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST })
    const response = await api.post("/order", payload)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum })
    console.log("response", response)
    dispatch(cartActions.getCartQty());
    navigate("/payment/success")
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST })
    const response = await api.get("/order")
    console.log("getOrder response", response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data })


  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST })
    const response = await api.get("/order/orderAdmin", {
      params: {...query}
    });
    console.log("rrr",response )
    console.log("getOrderList response", response)
    if (response.status !== 200) throw new Error(response.error)
    dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data })

  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

const updateOrder = (id, status) => async (dispatch) => { 
  try{
    dispatch({type: types.UPDATE_ORDER_REQUEST});
    const response = await api.put(`/order/${id}`,{status})
    if (response.status !== 200) throw new Error(response.error)
    dispatch({type: types.UPDATE_ORDER_SUCCESS, payload:response.data.data })
    dispatch(commonUiActions.showToastMessage("Status successfully changed", "success"))
    dispatch(getOrderList({page:1,ordernum: ""}))


  }catch(error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
