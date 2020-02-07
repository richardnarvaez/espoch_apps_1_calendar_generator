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

import Icon from '../../lib/svg';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';

class App extends React.Component{
  state = {
    isDisconnected: false
  }

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      /*const webPing = setInterval(
        () => {
          fetch('//google.com', {
            mode: 'no-cors',
            })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing)
            });
          }).catch(() => this.setState({ isDisconnected: true }) )
        }, 2000);*/

      return this.setState({ isDisconnected: false});
    }

    return this.setState({ isDisconnected: true });
  }
render(){
  return(<div>
    {
      this.state.isDisconnected ?<div style={{display: "flex", alignItems: "center", justifyContent: "center",width: "100vw", height: "100vh", top: 0, position: "fixed", zIndex: 10000, background: "#c10808", padding: 8, textAlign: "center", color: "#fff"}}>
      
      <div>
        <Icon name="wifi" fill="#fff" width="80px" height="80px" style={{padding: 16}}/>
        <p style={{fontWeight: "bold"}}> Sin conexion a internet</p>
        <p>Comprueba tu conexion para seguir usando Zetplain</p>
      </div>
    </div>:null
    }
      
  
  <Router>
     <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          
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
  </div>)
  }
}

export default withAuthentication(App);
