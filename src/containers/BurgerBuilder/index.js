import React, { Component } from 'react'
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_FIREBASEDB_URL}/ingredients.json`)
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
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

        const { ingredients, totalPrice } = this.state
        const queryParams = []
        for (let i in ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]))
        }
        queryParams.push(`price=${totalPrice}`)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        const { ingredients, totalPrice, purchasable, purchasing, loading, error } = this.state
        if (!ingredients) {
            return error ? <p>Ingredients can't be loaded.</p> : <Spinner />
        }
        const disabledInfo = { ...ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                    {loading ?
                        <Spinner />
                        :
                        <OrderSummary
                            ingredients={ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price={totalPrice}
                        />
                    }
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

export default withErrorHandler(BurgerBuilder, axios)