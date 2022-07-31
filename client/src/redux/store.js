import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import authReducer from './auth/authReducer';
import robotReducer from './robots/robotReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    auth: authReducer,
    robots: robotReducer
})

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)));


export default store;