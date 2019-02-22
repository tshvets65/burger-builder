import React from 'react'
import NavigationItem from './NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = ({ isAuth }) => (
    <ul className={classes.navigationitems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {isAuth && <NavigationItem link='/orders'>Orders</NavigationItem>}
        {isAuth ?
            <NavigationItem link='/logout'>Log Out</NavigationItem>
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>
        }
    </ul>
)

export default NavigationItems