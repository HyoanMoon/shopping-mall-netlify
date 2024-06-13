import * as types from "../constants/user.constants";
const initialState = {
  loading: false,
  user: null,
  error: "",

};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // 요청 시 오류 초기화
      } //Request 

    case types.LOGIN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        error: null, // 성공 시 오류 초기화
      } //Success

    case types.REGISTER_USER_FAIL:
    case types.LOGIN_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      } //Fail
    case types.LOGIN_WITH_TOKEN_FAIL:
      return {
        ...state,
        loading: false
      }
    case types.LOGOUT:
      return {
        ...state,
        user: null
      };
    case types.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: ""
      };

    default:
      return state;
  }
}
export default userReducer;




