// ./reducers/authReducer.js
import { getUserData, isAuthenticated } from "src/utils/auth";

const initialState = {
  isAuthenticated: isAuthenticated(),
  user: getUserData() ? getUserData() : null, // user now includes role
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'SIGNUP_SUCCESS':
      return { ...state, isAuthenticated: true, user: { ...action.payload, role: action.payload.type }, loading: false };
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: { ...action.payload, role: action.payload.type }, loading: false };      
    case 'LOGIN_FAILURE':
      return { ...state, loading: false };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, loading: false };
    default:
      return state;
  }
};

export default authReducer;
