import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => this.setState(prevState => {
        return { showSideDrawer: !prevState.showSideDrawer }
    })

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    render() {
        return (
            <>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout
