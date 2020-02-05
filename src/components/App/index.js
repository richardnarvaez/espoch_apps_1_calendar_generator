import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import SignOutPage from '../SignOut';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import InfoPage from '../Info';

import StadisticsPage from '../Stadistics'
import FlotaPage from '../Flota'
import NotifyPage from '../Notify'
import WorkersPage from '../Workers'
import NotFound from '../NotFound'
import CajaPage from '../Caja'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';

const App = () => (
  <Router>
     <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div>
          <Switch>
            {/* rutas */}
            {/* <Route exact path={ROUTES.STADISTIC} component={StadisticsPage} />
            <Route exact path={ROUTES.FLOTA} component={FlotaPage} />
            <Route exact path={ROUTES.NOTIFY} component={NotifyPage} />
            <Route exact path={ROUTES.WORKERS} component={WorkersPage} />
            <Route exact path={ROUTES.CAJA} component={CajaPage} /> */}
            <Route path={ROUTES.INFO} component={InfoPage} />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_OUT} component={SignOutPage} />
            {/* <Route path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
            {/* <Route path={ROUTES.SIGN_IN} component={SignInPage} /> */}
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />            
            <Route path={ROUTES.ADMIN} component={AdminPage} />
                
            <Route component={NotFound} />
            </Switch>
          </div>
        ) : (
          <div>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />  
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />       
            <Route component={NotFound} />
          </Switch>
          </div>
        )
      }
    </AuthUserContext.Consumer>
    
  </Router>
);

export default withAuthentication(App);
