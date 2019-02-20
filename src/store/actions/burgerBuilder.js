import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const initIngredients = () => dispatch => {
    axios.get(`${process.env.REACT_APP_FIREBASEDB_URL}/ingredients.json`)
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(setIngredietnsFailed())
        })
}

export const setIngredietnsFailed = error => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}