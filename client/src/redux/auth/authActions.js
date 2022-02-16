import axios from 'axios';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from './authTypes';


const loginUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST
    }
}


const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

const loginUserFail = (err) => {
    return {
        type: LOGIN_USER_FAIL,
        payload: err
    }
};


export const loginUser = (data, register) => {
    console.log('i ran');
    return async (dispatch) => {

        dispatch(loginUserRequest());
        const endpoint = register ? 'register' : 'login';

        try {
            const user = await axios.post('/users/' + endpoint, data);
            setTimeout(() => {
                dispatch(loginUserSuccess(user.data));
            }, 1500);
        } catch (e) {

            setTimeout(() => {
                dispatch(loginUserFail('Some kind of ERROR, idk... felt cute, might delete later'));
            }, 1500);
        }

    }
}