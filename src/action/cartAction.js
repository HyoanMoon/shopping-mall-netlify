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
        console.log("rrrrr",response)
        dispatch(commonUiActions.showToastMessage("Add to cart", "success"));

      } catch (error) {
        dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
      }
    };

const getCartList = () => async (dispatch) => { };
const deleteCartItem = (id) => async (dispatch) => { };

const updateQty = (id, value) => async (dispatch) => { };
const getCartQty = () => async (dispatch) => { };
export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
