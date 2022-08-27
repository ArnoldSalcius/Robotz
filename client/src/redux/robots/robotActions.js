import axios from 'axios';
import { ROBOT_REQUEST, ROBOT_FAIL, ROBOT_SUCCESS, CLEAR_ROBOT_ERRORS, CLEAR_ROBOTS, USER_INFO, SET_TIMER, CLEAR_TIMER, USER_INFO_REQUEST, USER_INITIAL, LOADING_MSG, CLEAR_ROBOT_ERROR } from '../robots/robotTypes';
import { loginUserFail } from '../auth/authActions';



const robotRequest = () => {
    return {
        type: ROBOT_REQUEST
    }
}

const robotSuccess = (robots) => {
    return {
        type: ROBOT_SUCCESS,
        payload: robots
    }
}

const userInfo = (payload) => {
    return {
        type: USER_INFO,
        payload
    }
}

export const setUserInitial = () => {
    return {
        type: USER_INITIAL
    }
}

const userInfoRequest = () => {
    return {
        type: USER_INFO_REQUEST
    }
}



const robotFail = (error) => {
    return {
        type: ROBOT_FAIL,
        payload: error
    }
}

export const clearRobotErrors = () => {
    return {
        type: CLEAR_ROBOT_ERRORS
    }
}

export const clearRobots = () => {
    return {
        type: CLEAR_ROBOTS
    }
}

const setTimer = (timer) => {
    return {
        type: SET_TIMER,
        payload: timer
    }
}


export const clearTimer = () => {
    return {
        type: CLEAR_TIMER
    }
}

export const loadingMessage = (message = null) => {
    return {
        type: LOADING_MSG,
        payload: message
    }
}

export const clearRobotError = () => {
    return {
        type: CLEAR_ROBOT_ERROR
    }
}




export const getUserInfo = () => async (dispatch, getState) => {
    dispatch(userInfoRequest());
    try {
        const res = await axios.get('/users/me', { headers: { 'authorization': 'Bearer ' + getState().auth.user.token } });
        dispatch(userInfo(res.data));
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(loginUserFail(e.response.data.error));
        } else {
            dispatch(robotFail('Something horrible happened (to this application)'))
        }
    }
}

//Make Wrapper for this
export const getMyRobots = () => async (dispatch, getState) => {
    dispatch(robotRequest());
    try {
        const res = await axios.get('/robots/my', { headers: { 'authorization': 'Bearer ' + getState().auth.user.token } });
        dispatch(robotSuccess(res.data.robots));
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(loginUserFail(e.response.data.error));
        }
        if (e.response.status === 500) {
            dispatch(robotFail({ message: 'Internal Server error. Try again later' }))
        }
    }
}

export const getStoreRobots = () => async (dispatch, getState) => {
    dispatch(robotRequest());
    try {
        const res = await axios.get('/robots/store', { headers: { 'authorization': 'Bearer ' + getState().auth.user.token } });

        dispatch(robotSuccess(res.data.robots));
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(loginUserFail(e.response.data.error));
        }
        if (e.response.status === 500) {
            dispatch(robotFail({ message: 'Internal Server error. Try again later' }))
        }
    }
}



export const getLotteryRobots = () => async (dispatch, getState) => {
    dispatch(robotRequest());
    try {
        const res = await axios.get('/robots/lottery', { headers: { 'authorization': 'Bearer ' + getState().auth.user.token } });
        if (res.data.timer) {
            return dispatch(setTimer(new Date(res.data.timer)));
        }
        dispatch(robotSuccess(res.data.robots));
        return res.data;
    } catch (e) {
        if (e.response.status === 401) {
            dispatch(loginUserFail(e.response.data.error));
        }
        if (e.response.status === 500) {
            dispatch(robotFail({ message: 'Internal Server error. Try again later' }))
        }
    }
}

export const claimRobotLottery = (robots) => {
    return async (dispatch) => {
        dispatch(robotRequest());
        try {
            dispatch(loadingMessage('Claiming...'));
            const res = await axios.post('/robots/lottery', { selected: robots }, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } });
            dispatch(setTimer(new Date(res.data.timer)));
            dispatch(robotSuccess([]));
        } catch (e) {
            const data = e.response.data;
            if (data) {
                dispatch(robotFail(data.error));
            } else {
                dispatch(robotFail({ message: "Completely unexpected error" }))
            }
            dispatch(clearRobots());
            dispatch(getLotteryRobots());

        } finally {
            dispatch(loadingMessage(null));

        }
    }
}



export const buyRobot = (robot) => async (dispatch, getState) => {
    dispatch(robotRequest());
    try {
        const res = await axios.post('/robots/store/buy', { robot }, { headers: { 'authorization': 'Bearer ' + getState().auth.user.token } });
        //code here to add to array with all the new robots that were acquired

    } catch (e) {
        const data = e.response.data;
        if (data) {
            dispatch(robotFail(data.error));
        } else {
            dispatch(robotFail({ message: "Completely unexpected error" }));
        }
    } finally {
        dispatch(getStoreRobots());
    }

}


export const sellRobot = (robot) => async (dispatch, getState) => {
    dispatch(robotRequest());
    try {
        await axios.post('/robots/store/sell', { robot }, { headers: { 'authorization': 'Bearer ' + getState().auth.user.token } });

    } catch (e) {
        const data = e.response.data;
        if (data) {
            dispatch(robotFail(data.error));
        } else {
            dispatch(robotFail({ message: "Completely unexpected error" }));
        }
    } finally {
        dispatch(getMyRobots());
    }

}