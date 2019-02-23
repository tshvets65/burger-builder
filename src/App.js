import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout'
import * as actions from './store/actions/auth'
import asyncComponent from './hoc/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    const { isAuth } = this.props
    return (
      <Layout>
        {isAuth ? (
          <Switch>
            <Route path='/checkout' component={asyncCheckout} />
            <Route path='/orders' component={asyncOrders} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' component={asyncAuth} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        ) : (
            <Switch>
              <Route path='/auth' component={asyncAuth} />
              <Route path='/' component={BurgerBuilder} />
            </Switch>
          )}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
