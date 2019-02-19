import React from 'react'
import classes from './Order.module.css'

const Order = ({ ingredients, price }) => {
    const ingrArray = []
    for (let ingredientName in ingredients) {
        ingrArray.push(
            {
                name: ingredientName,
                amount: ingredients[ingredientName]
            }
        )
    }
    const ingredientOutput = ingrArray.map(ig => (
        <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>
            {ig.name} ({ig.amount})
        </span>
    ))
    return (
        <div className={classes.order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order