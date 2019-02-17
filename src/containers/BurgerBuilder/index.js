import React, { Component } from 'react'
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = () => {
        const ingredients = { ...this.state.ingredients }
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = type => {
        this.setState(prevState => {
            const updatedIngredients = { ...prevState.ingredients }
            updatedIngredients[type] = prevState.ingredients[type] + 1
            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type]
            return { ...prevState, ingredients: updatedIngredients, totalPrice: newPrice }
        }, this.updatePurchaseState)
    }

    removeIngredientHandler = type => {
        this.setState(prevState => {
            const updatedIngredients = { ...prevState.ingredients }
            updatedIngredients[type] = prevState.ingredients[type] - 1
            const newPrice = prevState.totalPrice - INGREDIENT_PRICES[type]
            return { ...prevState, ingredients: updatedIngredients, totalPrice: newPrice }
        }, this.updatePurchaseState)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        console.log('continue')
    }

    render() {
        const { ingredients, totalPrice, purchasable, purchasing } = this.state
        const disabledInfo = { ...ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={totalPrice}
                    />
                </Modal>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={totalPrice}
                    purchasable={purchasable}
                    ordered={this.purchaseHandler}
                />
            </>
        )
    }
}

export default BurgerBuilder