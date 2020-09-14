import {
    LOGIN_STARTED,
    LOGIN_COMPLETED,
    LOGIN_FAILED
}from '../types'

export const login = () => dispatch => {

};

export const loginStarted = () => ({
    type: LOGIN_STARTED
});

export const loginCompleted = payload => ({
    type: LOGIN_COMPLETED,
    payload
});

export const loginFailed = error => ({
    type: LOGIN_FAILED,
    payload: error
});
