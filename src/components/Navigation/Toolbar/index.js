import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo'
import NavigationItems from '../NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle'

const Toolbar = ({ drawerToggleClicked, isAuth }) => (
    <header className={classes.toolbar}>
        <DrawerToggle clicked={drawerToggleClicked} />
        <div className={classes.logo}><Logo /></div>
        <nav className={classes.desktoponly}>
            <NavigationItems isAuth={isAuth} />
        </nav>
    </header>
)

export default Toolbar