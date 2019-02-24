import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import * as authSagas from './auth'
import * as burgerBuilderSagas from './burgerBuilder'
import * as orderSagas from './order'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSagas.authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authSagas.authCheckStateSaga)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, burgerBuilderSagas.initIngredients)
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, orderSagas.purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, orderSagas.fetchOrdersSaga)
}