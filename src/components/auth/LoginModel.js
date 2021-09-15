//{
// "email":"Admin.clan@gmail.com",
// "password":"DevClan22"
// }


import React, { Component} from 'react';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


class LoginModel extends Component{
    state = {
        email: "",
        password: "",
        msg : null
    };


    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg});
            }else{
                this.setState({msg:null});
            }
        }
        if(isAuthenticated){
          
        }
        

    }
    onChange = e =>{
      
      this.setState({ [e.target.name]: e.target.value});
    }
    onSubmit = e =>{
      
      e.preventDefault();
      const {email, password} = this.state;
      this.props.login({email, password});
    }
    
    render(){
    
      
      return(


    <form>
      
        <div className="form-group rightSide">
            <label>Adresse email</label>
            <input type="email" name= "email" className="form-control" placeholder="Entrer email" onChange = {this.onChange}/>
        </div>

        <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" name= "password" className="form-control" placeholder="Entrer password" onChange = {this.onChange} />
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit} style={{backgroundColor:"#511281", borderColor:"#511281"}}>Connexion</button>
        
    </form>




          
          
        
        
      )
    }

}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  error : state.error
});


export default connect(
  mapStateToProps,
  {login, clearErrors}
)(LoginModel);


