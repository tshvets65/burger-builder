import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo'
import NavigationItems from '../NavigationItems'

const Toolbar = () => (
    <header className={classes.toolbar}>
        <div>MENU</div>
        <div className={classes.logo}><Logo /></div>
        <nav className={classes.desktoponly}>
            <NavigationItems />
        </nav>
    </header>
)

export default Toolbar