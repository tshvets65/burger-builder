import React, { Component } from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/burgerBuilder'
import axios from '../../axios-orders'


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const { purchasing } = this.state
        const { totalPrice, ingredients, onIngredientAdded, onIngredientRemoved, error } = this.props

        if (error) {
            return <p>Ingredients can't be loaded.</p>
        }

        if (!ingredients) {
            return <Spinner />
        }

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
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={totalPrice}
                    purchasable={this.updatePurchaseState(ingredients)}
                    ordered={this.purchaseHandler}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: name => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved: name => dispatch(burgerBuilderActions.removeIngredient(name)),
        onInitIngredients: name => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))