import { saveAuthenticated, deleteAuthentication } from "src/utils/auth";

export const signin = (saveData) => (dispatch) => {
  saveAuthenticated(saveData);
  // Dispatch login success action with payload
  dispatch({ type: 'LOGIN_SUCCESS', payload: saveData.data });

  // Make API call to authenticate user
  // Upon successful authentication, dispatch login success action
  // Else, dispatch login failure action
};

export const signup = (credentials) => (dispatch) => {
  // Dispatch login request action
  dispatch({ type: 'LOGIN_REQUEST' });

  // Make API call to authenticate user
  // Upon successful authentication, dispatch login success action
  // Else, dispatch login failure action
};

export const verified = (saveData) => (dispatch) => {
  saveAuthenticated(saveData);
  // Dispatch signup success action with payload
  dispatch({ type: 'SIGNUP_SUCCESS', payload: saveData.data });

  // Make API call to authenticate user
  // Upon successful authentication, dispatch login success action
  // Else, dispatch login failure action
};

export const logout = (saveData) => (dispatch) => {
  deleteAuthentication();
  // Dispatch signup success action with payload
  dispatch({ type: 'LOGOUT' });

  // Make API call to authenticate user
  // Upon successful authentication, dispatch login success action
  // Else, dispatch login failure action
};
