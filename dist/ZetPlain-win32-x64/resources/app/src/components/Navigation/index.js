import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = (props) => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} selected={props.menu}/>
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser, selected }) => (
  <div className="col-2" style={{borderRight: 'solid 1px #ccc',padding: '0', overflow: 'hidden', height: '100vh'}}>
  
  <div className="title-og">
    <label>OLMEGAS </label>
    <label>ADMIN</label>
  </div>

  <ul className="nav flex-column nav-pills">
    {/* <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li> */}
    <li className={ "nav-link" }>
      <Link to={ROUTES.STADISTIC}>Home/Stadistics</Link>
    </li>
     <li className={ "nav-link " }>
      <Link to={ROUTES.CAJA}>Caja</Link>
    </li>
    <li className={ "nav-link " }>
      <Link to={ROUTES.FLOTA}>Flota</Link>
    </li>
    <li className={ "nav-link " }>
      <Link to={ROUTES.WORKERS}>Trabajadores</Link>
    </li>
    <li className={ "nav-link " }>
      <Link to={ROUTES.NOTIFY}>Notificaciones</Link>
    </li>
    <li className={ "nav-link " }>
      <Link to={ROUTES.ACCOUNT}>Cuenta</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li className={ "nav-link " }>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li className={ "nav-link " }>
      
        <SignOutButton /> 
        
    </li>
  </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div className="col-2" style={{borderRight: 'solid 1px #ccc',padding: '0', overflow: 'hidden', height: '100vh'}}>
  
  <ul className="nav flex-column nav-pills">
    <li className={ "nav-link" }>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li className={ "nav-link" }>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>

  </div>
);

export default Navigation;
