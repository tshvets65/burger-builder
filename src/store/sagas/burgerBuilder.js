import { put } from 'redux-saga/effects'

import axios from '../../axios-orders'
import * as actions from '../actions/burgerBuilder'

export function* initIngredients(action) {
    try {
        const response = yield axios.get(`${process.env.REACT_APP_FIREBASEDB_URL}/ingredients.json`)
        yield put(actions.setIngredients(response.data))
    } catch (error) {
        yield put(actions.setIngredietnsFailed())
    }
}