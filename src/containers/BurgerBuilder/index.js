import React, { Component } from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger'
import BuildControls from '../../components/Burger/BuildControls'
import Modal from '../../components/UI/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios-orders'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
    state = {
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
        const { purchasing, loading, error } = this.state
        const { totalPrice, ingredients, onIngredientAdded, onIngredientRemoved } = this.props
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
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: ingName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))