import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import dataReducer from './data/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));