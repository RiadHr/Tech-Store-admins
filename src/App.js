//Correction du code
//Code Corrigé

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { Component, Fragment } from "react";
import LoginModel from "./components/auth/LoginModel";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "./store";
import Navbar from "./components/Navbar";
import AddProduct from "./components/pages/AjoutProduit";
import AddCategory from "./components/pages/AjoutCategorie";
import Profile from './components/pages/Profile';

import UpdateProduct from "./components/pages/ModifierProduit";
import UpdateCategory from "./components/pages/ModifierCategorie";

import DelCategory from "./components/pages/SupprimerCategorie";
import DelItem from "./components/pages/SupprimerProduit";
import Stats from "./components/pages/Stats";
import { loadUser } from "./actions/authActions";
import { clearErrors } from "./actions/errorActions";

class App extends Component {
  state = {};

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className='App'>
        {isAuthenticated ? (
          <Router>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Stats} />
              <Route path='/Profile' exact component={Profile} />
              <Route path='/categorie' exact component={AddCategory} />
              <Route path='/modifierCategroie' exact component={UpdateCategory} />
              <Route path='/SupprimerCategroie' exact component={DelCategory} />
              <Route path='/product' exact component={AddProduct} />
              <Route path='/modifierProduit' exact component={UpdateProduct} />
              <Route path='/SupprimerProduit' exact component={DelItem} />
            </Switch>
          </Router>
        ) : (
          <Router>
            <div className='auth-wrapper'>
              <div className='auth-inner'>
                <Switch>
                  <Route exact path='/' component={LoginModel} />
                </Switch>
              </div>
            </div>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {
  clearErrors,
  loadUser,
})(App);
