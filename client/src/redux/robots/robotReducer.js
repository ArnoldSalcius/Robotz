import { ROBOT_FAIL, ROBOT_SUCCESS, ROBOT_REQUEST, CLEAR_ROBOT_ERRORS, CLEAR_ROBOTS, USER_INFO, SET_TIMER, CLEAR_TIMER, USER_INFO_REQUEST, USER_INITIAL, LOADING_MSG, CLEAR_ROBOT_ERROR } from "./robotTypes";



const initialState = {
    loading: false,
    errors: [],
    robots: [],
    credits: 0,
    robotNum: 0,
    timer: null,
    userInfoLoading: false,
    loadingMessage: null
}


const robotReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROBOT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ROBOT_SUCCESS:
            return {
                ...state,
                loading: false,
                robots: action.payload
            }
        case USER_INFO:
            return {
                ...state,
                credits: action.payload.credits,
                robotNum: action.payload.robots,
                userInfoLoading: false
            }
        case ROBOT_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...state.errors, action.payload],
            }
        case SET_TIMER:
            return {
                ...state,
                loading: false,
                robots: [],
                timer: action.payload
            }
        case CLEAR_TIMER:
            return {
                ...state,
                timer: null
            }
        case CLEAR_ROBOT_ERRORS:
            return {
                ...state,
                errors: []
            }
        case CLEAR_ROBOT_ERROR:
            //always clears the last one, basically a queue
            return {
                ...state,
                errors: state.errors.slice(1)
            }
        case CLEAR_ROBOTS:
            return {
                ...state,
                robots: []
            }
        case USER_INFO_REQUEST:
            return {
                ...state,
                userInfoLoading: true
            }
        case USER_INITIAL:
            return {
                ...initialState,

            }
        case LOADING_MSG:
            return {
                ...state,
                loadingMessage: action.payload
            }
        default:
            return state;
    }
}

export default robotReducer;