import React, {Component} from 'react';
import '../../css/page.css';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import {Add} from "../../actions/categActions";
import PropTypes from "prop-types";
import { useEffect } from 'react'
import ReactDOM from 'react-dom'


const ChangeTabName = () => {
    // This effect runs once, after the first render
    useEffect(() => {
      document.title = "Add category"
    }, [])
    
    return <div></div>
  };
  
  

class AddCategory extends Component{
    state = {
        nom : "",
        description: "",
        msg : null,
        disabled:{
            description: false,
            nom: false,
            id:false

        }
    }
    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        Add: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        const {error} = this.props;
        if(error !== prevProps.error){
            if(error.id === 'ADD_CATEGORY_ERROR'){
                this.setState({msg: error.msg});
            }else{
                this.setState({msg:null});
            }
        }
        
        

    }
    onChange = e =>{
      
        this.setState({ [e.target.name]: e.target.value});
        if(e.target.name == "description"){
            if(e.target.value.length > 500){
                //TODO: afficher un message d'erreur
                var disabled = {...this.state.disabled};
                disabled.description = true;
                this.setState({disabled});
            }
        }else{
            if(e.target.value.length > 100){
                //TODO: afficher un message d'erreur
                var disabled = {...this.state.disabled};

                disabled[e.target.name] = true;
                this.setState({disabled});
            }
        }
      }
      onSubmit = e =>{
        
        e.preventDefault();
        const {nom, description} = this.state;
        if(description.length <= 500){
            this.props.Add({nom, description});
            window.location.reload(false);
        } 
      }

    render (){
        return(


            <form>
                <ChangeTabName/>
                <div className="container">
                            <div className="header">
                                    <h1>Ajout De Categorie</h1>
                            </div>
                                
                            <div className="box">
                                <input type="text"  name="nom" value = {this.state.nom}  disabled={this.state.disabled.nom} onChange={this.onChange}/>
                                <label className={this.state.nom && 'filled'} htmlFor="text">nom</label>
                            </div>
                            
                            
                            
                            <div className="box">
                                <input type="text" name="description" value = {this.state.description}  disabled={this.state.disabled.description} onChange={this.onChange}/>
                                <label className={this.state.description && 'filled'} htmlFor="text">description</label>
                            </div>
                            
                            
                            

                            <div className="button">
                                <div class="subbutton">
                                    <button className="sub"  onClick={this.onSubmit}>submit</button>
                                </div>
                                
                                <div className="subbutton">
                                    <button className="souscategorie">Ajouter une sous-categorie</button>
                                </div>
                            </div>
                            
                            {/* <form className="container2">
                                

                                <div className="boxa">
                                    <label className="sous">sous-categorie&nbsp;&nbsp;</label>
                                    <input type="text" placeholder="prenom" className="sousinput"/>
                                </div>

                                <div className="boxa">
                                    <label className="sous">type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" placeholder="type" className="sousinput"/>
                                </div>
                            </form> */}
                                
                </div>
            </form>
           
        
            
            
        )
    }
};






const mapStateToProps = state =>({
    error : state.error
  });
  
  
  export default connect(
    mapStateToProps,
    {Add, clearErrors}
  )(AddCategory);
  