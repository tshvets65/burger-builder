import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import Logout from './containers/Auth/Logout'
import * as actions from './store/actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
