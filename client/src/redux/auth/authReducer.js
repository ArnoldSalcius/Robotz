import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER, CLEAR_AUTH_ERRORS } from './authTypes';


const initialState = {
    loading: true,
    user: null,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                user: null
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: null
            }
        case LOGOUT_USER:
            return {
                //Keep state for something maybe
                ...state,
                user: null,
                ...initialState,
                loading: false
            }
        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return {
                ...state
            }
    }
}

export default authReducer;