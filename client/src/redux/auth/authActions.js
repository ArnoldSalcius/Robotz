import axios from 'axios';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER } from './authTypes';


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

export const logoutUser = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}


export const loginUser = (data, register) => {
    return async (dispatch) => {

        dispatch(loginUserRequest());
        const endpoint = register ? 'register' : 'login';

        try {
            const res = await axios.post('/auth/' + endpoint, data);
            //Remove timeout
            setTimeout(() => {
                localStorage.setItem('token', res.data.token);
                console.log(res.data);
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
            const res = await axios.post('/auth/verify', {}, { headers: { authorization: token } });

            //Set new returned token 
            localStorage.setItem('token', res.data.token);

            dispatch(loginUserSuccess(res.data));

        } catch (e) {
            localStorage.removeItem('token');
            dispatch(loginUserFail('Please relog'));
        }
    }
}