import axios from 'axios';
import * as types from './types';

const API_BASE_URL = 'http://localhost:5000/api';

export const adminLogin = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    
    const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
    
    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: error.response?.data?.message || 'Login failed'
    });
    throw error;
  }
};

export const doctorLogin = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_DOCTOR_REQUEST });
    
    const response = await axios.post(`${API_BASE_URL}/doctor/login`, credentials);
    
    dispatch({
      type: types.LOGIN_DOCTOR_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_DOCTOR_ERROR,
      payload: error.response?.data?.message || 'Login failed'
    });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
};