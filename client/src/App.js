import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import './App.css';
import Register from './Components/auth/Register'
import Alerts from './Components/Layout/Alerts'
import PrivateRoute from './Components/routing/PrivateRoute'

import Login from './Components/auth/Login'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import ContactState from './context/contact/ContactState'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>

          <Router>
            <Fragment>
              
              <Navbar />
              
              <div className="container">
                <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
              </div>

            </Fragment>
          </Router>

        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
