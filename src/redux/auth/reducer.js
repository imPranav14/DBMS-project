import * as types from './types';

const TOKEN = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!TOKEN,
  token: TOKEN,
  user: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case types.LOGIN_ADMIN_REQUEST:
    case types.LOGIN_DOCTOR_REQUEST:
    case types.LOGIN_NURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case types.LOGIN_ADMIN_SUCCESS:
    case types.LOGIN_DOCTOR_SUCCESS:
    case types.LOGIN_NURSE_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: payload.token,
        user: payload.user,
        loading: false,
        error: null
      };
      
    case types.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null
      };
      
    default:
      return state;
  }
};

export default authReducer;