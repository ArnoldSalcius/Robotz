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
    return async (dispatch) => {

        dispatch(loginUserRequest());
        const endpoint = register ? 'register' : 'login';

        try {
            const res = await axios.post('/users/' + endpoint, data);
            //Remove timeout
            setTimeout(() => {
                localStorage.setItem('token', res.data.token);
                dispatch(loginUserSuccess(res.data));
            }, 1500);
        } catch (e) {

            setTimeout(() => {
                dispatch(loginUserFail('Some kind of ERROR, idk... felt cute, might delete later'));
            }, 1500);
        }

    }
}


export const verifyToken = () => {
    return async (dispatch) => {

        dispatch(loginUserRequest());

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/users/verify', {}, { headers: { authorization: token } });

            //Set new returned token 
            localStorage.setItem('token', res.data.token);

            dispatch(loginUserSuccess(res.data));

        } catch (e) {
            dispatch(loginUserFail('Please relog'));
        }
    }
}