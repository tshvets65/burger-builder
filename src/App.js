import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import Logout from './containers/Auth/Logout'

class App extends Component {
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

export default App;
