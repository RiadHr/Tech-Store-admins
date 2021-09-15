import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from "prop-types";




export class Logout extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired
  }
  render(){
    return (
      <Fragment>
        {this.props.isAuthenticated? 
        <button onClick={this.props.logout} href ="#">logout</button> 
        :null
        }
        

      </Fragment>
    )
  }
}

export default connect(
  null,
  {logout}
)(Logout);