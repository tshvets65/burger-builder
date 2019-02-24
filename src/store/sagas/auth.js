import { put, call, delay } from 'redux-saga/effects'
import * as actions from '../actions/auth'
import axios from '../../axios-auth'

export function* logoutSaga(action) {
    // yield localStorage.removeItem('token')
    // yield localStorage.removeItem('userId')
    // yield localStorage.removeItem('expirationDate')
    // call makes generators testable
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'userId')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    yield put(actions.logoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = `/signupNewUser?key=${process.env.REACT_APP_FIREBASE_AUTH_KEY}`
    if (!action.isSignup) {
        url = `/verifyPassword?key=${process.env.REACT_APP_FIREBASE_AUTH_KEY}`
    }
    try {
        const response = yield axios.post(url, authData)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('userId', response.data.localId)
        yield localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))
        yield put(actions.authSuccess(response.data));
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const idToken = yield localStorage.getItem('token')
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
    const localId = yield localStorage.getItem('userId')
    if (!idToken || !localId || !expirationDate || expirationDate < new Date()) {
        yield put(actions.logout())
    } else {
        yield put(actions.authSuccess({ idToken, localId }))
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
}