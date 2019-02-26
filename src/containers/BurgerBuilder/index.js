import React, { useState, useEffect } from 'react'
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


const BurgerBuilder = ({ onInitIngredients, onInitPurchase, totalPrice, ingredients, onIngredientAdded, onIngredientRemoved, error, isAuth, onSetRedirectPath, history }) => {

    const [purchasing, setPurchasing] = useState(false)


    useEffect(() => {
        onInitIngredients()
    }, [])

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true)
        } else {
            onSetRedirectPath('/checkout')
            history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        history.push('/checkout')
    }

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
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>

                <OrderSummary
                    ingredients={ingredients}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler}
                    price={totalPrice}
                />

            </Modal>
            <Burger ingredients={ingredients} />
            <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabledInfo={disabledInfo}
                price={totalPrice}
                purchasable={updatePurchaseState(ingredients)}
                ordered={purchaseHandler}
                isAuth={isAuth}
            />
        </>
    )

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