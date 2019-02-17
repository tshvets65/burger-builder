import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient';

const burger = ({ ingredients }) => {
    let transformedIngredients = Object.keys(ingredients).map(igKey => (
        [...Array(ingredients[igKey])].map((_, index) => (
            <BurgerIngredient type={igKey} key={`${igKey}${index}`} />
        ))
    )).reduce((acc, el) => {
        return acc.concat(el)
    }, [])
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger