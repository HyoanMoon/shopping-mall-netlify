import * as types from "../constants/order.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
  error: "",
  orderNum: "",
  orderList: [],
  totalPageNum: 1,
  selectedOrder: null
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT: {
      return {
        ...state,
        orderList: []
      }
    }
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: true,
        orderNum: payload
      }
    case types.GET_ORDER_SUCCESS:
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: payload.data,
        totalPageNum: payload.totalPageNum
      }
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      }
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
    case types.UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case types.SET_SELECTED_ORDER:
      return {
        ...state,
        loading: false,
        selectedOrder: payload
      }
    default:
      return state;
  }

}
export default orderReducer;
