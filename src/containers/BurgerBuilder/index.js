import React, { Component } from 'react'
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = type => {
        this.setState(prevState => {
            const updatedIngredients = { ...prevState.ingredients }
            updatedIngredients[type] = prevState.ingredients[type] + 1
            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type]
            return { ...prevState, ingredients: updatedIngredients, totalPrice: newPrice }
        })
    }

    removeIngredientHandler = type => {
        this.setState(prevState => {
            const updatedIngredients = { ...prevState.ingredients }
            updatedIngredients[type] = prevState.ingredients[type] - 1
            const newPrice = prevState.totalPrice - INGREDIENT_PRICES[type]
            return { ...prevState, ingredients: updatedIngredients, totalPrice: newPrice }
        })
    }

    render() {
        const { ingredients, totalPrice } = this.state
        const disabledInfo = { ...ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={totalPrice}
                />
            </>
        )
    }
}

export default BurgerBuilder