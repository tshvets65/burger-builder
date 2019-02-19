import React from 'react'
import Burger from '../../Burger'
import Button from '../../UI/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => (
    <div className={classes.checkoutsummary}>
        <h1>We hope it tastes delicious!</h1>
        {ingredients && <Burger ingredients={ingredients} />}
        <Button btnType='danger' clicked={checkoutCancelled}>CANCEL</Button>
        <Button btnType='success' clicked={checkoutContinued}>CONTINUE</Button>
    </div>
)

export default CheckoutSummary