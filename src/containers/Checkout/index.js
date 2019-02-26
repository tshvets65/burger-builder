import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from './ContactData'

const Checkout = ({ ingredients, purchased, history, match }) => {

    const checkoutCancelledHandler = () => {
        history.goBack()
    }

    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data')
    }

    if (!ingredients || purchased) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Route path={`${match.path}/contact-data`} component={ContactData} />
        </div>
    )

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)