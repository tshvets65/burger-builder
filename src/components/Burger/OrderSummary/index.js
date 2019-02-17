import React from 'react'
import Button from '../../UI/Button'

const OrderSummary = ({ ingredients, purchaseCancelled, purchaseContinued, price }) => {
    const ingredientSummary = Object.keys(ingredients).map(igKey => (
        <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
        </li>
    ))
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>TotalPrice: {price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='danger' clicked={purchaseCancelled}>CANCEL</Button>
            <Button btnType='success' clicked={purchaseContinued}>CONTINUE</Button>
        </>
    )
}

export default OrderSummary