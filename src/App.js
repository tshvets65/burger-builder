import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Auth/Logout'
import * as actions from './store/actions/auth'

const Checkout = lazy(() => import('./containers/Checkout'))

const Orders = lazy(() => import('./containers/Orders'))

const Auth = lazy(() => import('./containers/Auth'))

const App = ({ onTryAutoSignup, isAuth }) => {
  useEffect(() => {
    onTryAutoSignup()
  }, [])

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        {isAuth ? (
          <Switch>
            <Route path='/checkout' render={props => <Checkout {...props} />} />
            <Route path='/orders' render={props => <Orders {...props} />} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' render={props => <Auth  {...props} />} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        ) : (
            <Switch>
              <Route path='/auth' render={props => <Auth {...props} />} />
              <Route path='/' component={BurgerBuilder} />
            </Switch>
          )}
      </Suspense>
    </Layout>
  )
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
