import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
import { type } from "@testing-library/user-event/dist/type";
const addToCart =
  ({ id, size }) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.ADD_TO_CART_REQUEST })
        const response = await api.post("/cart", { productId: id, size, qty: 1 }); //id, 사이즈, 수량 (기본으로 1개)를 백엔드로 보낸다.
        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty });
        dispatch(commonUiActions.showToastMessage(`Size ${size.toUpperCase()} added to your cart`, "success"));

      } catch (error) {
        dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
      }
    };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST })
    const response = await api.get("/cart") // 쿼리 조건 없음
    console.log("rrrrr", response)
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data });


  } catch (error) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
  }
};

const deleteCartItem = (id, qty) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const response = await api.delete(`/cart/${id}`);
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.DELETE_CART_ITEM_SUCCESS,
      payload: response.data.cartItemQty,
    });
    dispatch(commonUiActions.showToastMessage(`${qty} product(s) was deleted`, "success"));
    dispatch(getCartList());

  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put(`/cart/${id}`, { qty: value });
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};

const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const response = await api.get("/cart/qty");
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (error) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }
};
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
