import React from 'react'
import BurgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const Logo = () => (
    <div className={classes.logo}>
        <img src={BurgerLogo} alt='Logo' />
    </div>
)

export default Logo