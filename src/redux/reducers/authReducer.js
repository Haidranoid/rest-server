import {
    LOGIN_STARTED,
    LOGIN_COMPLETED,
    LOGIN_FAILED
} from '../types'
import * as localStorageService from '../../lib/utils/localStorageService'

const initialState = localStorageService.loadReducer('authReducer', {
    user: '',
    token: '',
    refreshToken: '',

    loading: null,
    error: null,
    
}, state => {
    localStorage.setItem("token", state.token);
});

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_STARTED:
            return {
                ...state,

                loading: true,
                error: false,
            };

        case LOGIN_COMPLETED:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,

                loading: false,
                error: false,
            };

        case LOGIN_FAILED:
            return {
                ...state,

                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default authReducer;
