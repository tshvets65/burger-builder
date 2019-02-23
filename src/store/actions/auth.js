import * as actionTypes from './actionTypes'
import axios from '../../axios-auth'
// import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ({ idToken, localId }) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        localId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, expirationTime * 1000)
}

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart())
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    let url = `/signupNewUser?key=${process.env.REACT_APP_FIREBASE_AUTH_KEY}`
    if (!isSignup) {
        url = `/verifyPassword?key=${process.env.REACT_APP_FIREBASE_AUTH_KEY}`
    }
    axios.post(url, authData)
        .then(response => {
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userId', response.data.localId)
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))
        });
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => dispatch => {
    const idToken = localStorage.getItem('token')
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const localId = localStorage.getItem('userId')
    if (!idToken || !localId || !expirationDate || expirationDate < new Date()) {
        dispatch(logout())
    } else {
        dispatch(authSuccess({ idToken, localId }))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
}