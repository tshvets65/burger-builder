import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer'

const Layout = ({ children, isAuth }) => {

    const [showSideDrawer, setSideDrawer] = useState(false)

    const sideDrawerToggleHandler = () => setSideDrawer(!showSideDrawer)

    const sideDrawerClosedHandler = () => setSideDrawer(false)

    return (
        <>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={isAuth}
            />
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuth={isAuth}
            />
            <main className={classes.content}>
                {children}
            </main>
        </>
    )

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
