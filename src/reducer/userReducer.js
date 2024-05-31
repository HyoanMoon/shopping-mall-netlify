import * as types from "../constants/user.constants";
const initialState = {
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    // 기타 케이스...
    default:
      return state;
  }
};

export default userReducer;
