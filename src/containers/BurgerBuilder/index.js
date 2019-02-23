import React, { Component } from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/burgerBuilder'
import * as orderActions from '../../store/actions/order'
import * as authActions from '../../store/actions/auth'
import axios from '../../axios-orders'


export class BurgerBuilder extends Component {
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
        if (this.props.isAuth) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const { purchasing } = this.state
        const { totalPrice, ingredients, onIngredientAdded, onIngredientRemoved, error, isAuth } = this.props

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
                    isAuth={isAuth}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: name => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved: name => dispatch(burgerBuilderActions.removeIngredient(name)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(orderActions.purchaseInit()),
        onSetRedirectPath: path => dispatch(authActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))