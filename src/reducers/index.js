// ./reducers/index.js

import { combineReducers } from 'redux';

// Import your individual reducers here
import authReducer from './authReducers';
// import otherReducer from './otherReducer';

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
//   other: otherReducer,
  // Add more reducers as needed
});

export default rootReducer;
