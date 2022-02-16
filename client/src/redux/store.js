import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import thunk from 'redux-thunk';

const combinedReducers = combineReducers({
    auth: authReducer
})

const store = createStore(combinedReducers, applyMiddleware(thunk));


export default store;