import axios from 'axios';
import { setUserInitial } from '../robots/robotActions';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, CLEAR_AUTH_ERRORS } from './authTypes';
import { browserHistory } from 'react-router-dom';


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

export const loginUserFail = (err, leaveToken) => {
    if (!leaveToken) {
        localStorage.removeItem('token');
    }
    return {
        type: LOGIN_USER_FAIL,
        payload: err
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    return (dispatch) => {

        //dispatch to clean robot state
        dispatch(setUserInitial());
        //

        dispatch({
            type: LOGOUT_USER
        });

    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_AUTH_ERRORS
    }
}


export const loginUser = (data, register) => {
    return async (dispatch) => {

        dispatch(loginUserRequest());
        const endpoint = register ? 'register' : 'login';

        try {
            const res = await axios.post('/auth/' + endpoint, data);
            localStorage.setItem('token', res.data.user.token);
            dispatch(loginUserSuccess(res.data.user));
        } catch (e) {

            if (e.response.status === 500) {
                return dispatch(loginUserFail({ message: 'Unexpected Server Error. Try again later.' }))
            }

            dispatch(loginUserFail(e.response.data.error));
        }

    }
}



export const verifyToken = () => {
    return async (dispatch) => {

        dispatch(loginUserRequest());
        if (!localStorage.getItem('token')) {
            return dispatch(loginUserFail(null));
        }


        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/auth/verify', {}, { headers: { 'authorization': 'Bearer ' + token } });

            localStorage.setItem('token', res.data.token);

            dispatch(loginUserSuccess(res.data));

        } catch (e) {
            if (e.response.status === 500) {
                //leave token so if the server comes back up, the session is still usable
                return dispatch(loginUserFail({ message: 'Server appears to be down refresh, or come back later.' }, true))
            }
            if (e.response.status === 401) {
                dispatch(loginUserFail(e.response.data.error));
                localStorage.removeItem('token');

            }

        }
    }
}