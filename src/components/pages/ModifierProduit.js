import React, {Component} from 'react';
import '../../css/delete.css';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import {Delete} from "../../actions/productActions";
import PropTypes from "prop-types";
import { Table } from 'react-bootstrap';
import {getListProduct} from "../../actions/productActions";
import { useEffect } from 'react'
import ReactDOM from 'react-dom'


const ChangeTabName = () => {
    // This effect runs once, after the first render
    useEffect(() => {
      document.title = "Delete product"
    }, [])
    
    return <div></div>
  };

class DelItem extends Component{
    state = {
        AllProduct:[],
        result:[],
        search:"",
        msg : null,
    }
    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getListProduct: PropTypes.func.isRequired,
        Delete: PropTypes.func.isRequired
        
    }
    componentDidMount(){
        this.props.getListProduct();
        setTimeout(()=>{
            const AllProductArray = this.props.product.list_product.map(c => c);
            this.setState({AllProduct:AllProductArray, result:AllProductArray});
        
        }, 500);
    

    }
    onChange = e =>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit = e =>{
        e.preventDefault();
        let result = [];
        let i = 0;
        for(let j=0; j <this.state.AllProduct.length;j++){
            var cat = this.state.AllProduct[j];
            if(cat.nom.includes(this.state.search)){
                result[i]= cat;
                i+=1;
            }

        }
        this.setState({result:result});
        
    }
    onDelete = e =>{
        if(e.target.id){
            this.props.Delete({"_id":e.target.id});
            alert("done");
        }
        else{

        }
    };
    render (){
        const resultBody = this.state.result.map(c=>{
            return(
                <tr key={c._id}>
                    <td>{c.nom}</td>
                    <td>0</td>
                    <td>N/A</td>
                    <td>
                        <button>
                            Modify
                        </button>
                    </td>
                    <td>
                        <button id={c._id} onClick={this.onDelete}>
                            modify
                        </button>
                    </td>

                </tr>
            );
        });
        return(
               <div className="MainContainer">
                   <ChangeTabName/>
                   <form className="SearchContainer">
                       <input className="SearchBar" name="search" onChange={this.onChange}></input>
                       <button className="SearchButon" onClick={this.onSubmit} > Search </button>
                   </form>
                   <Table striped bordered hover className="ResultTable">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Number of sub-categories</th>
                                <th>Main Category</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultBody}
                        </tbody>

                   </Table>
                   
               </div>
        )
    }
};






const mapStateToProps = state =>({
    auth:state.auth,
    error : state.error,
    product:state.product
  });
  
  
  export default connect(
    mapStateToProps,
    {getListProduct,Delete ,clearErrors}
  )(DelItem);
  