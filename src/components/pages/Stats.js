import React, {Component} from 'react';
import '../../css/page.css';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import {GetUserStats, GetProductStats} from "../../actions/statsActions";
import {Table} from "react-bootstrap";
import PropTypes from "prop-types";
import "../../css/stats.css";
import { useEffect } from 'react'
import ReactDOM from 'react-dom'


const ChangeTabName = () => {
    // This effect runs once, after the first render
    useEffect(() => {
      document.title = "Statistics"
    }, [])
    
    return <div></div>
  };


class Stats extends Component{
  state = {
    msg:null
  }
  static propTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    GetUserStats: PropTypes.func.isRequired,
    GetProductStats: PropTypes.func.isRequired
  }
  componentDidMount(){
      this.props.GetUserStats();
      this.props.GetProductStats();
      // this.setState({NombreClient:userStats["NbrUser"]});
      // this.setState({TopClientsAchat: userStats["TopUsers"]})
      // this.setState({msg:null});
    
      
  }

  
  render (){
    const statistics = this.props.stats;
    let cpt_users = 0;
    let cpt_produit_vente = 0;
    let cpt_produit_rating = 0;
    const TopUserList = statistics.TopUtilisateursAchat.map(e=>{
      cpt_users +=1;
      return (
      <tr>
        <td>{cpt_users}</td>
        <td>{e.nom}</td>
      </tr>
      )
    });
    const TopProductVenteList = statistics.TopProduitVente.map(e=>{
      cpt_produit_vente+=1;
      return( 
        <tr>
          <td>{cpt_produit_vente}</td>
          <td>{e.nom} </td>
          <td>{e.NbrVente}</td>
          </tr>
        )
    });
    const TopProductRatingList = statistics.TopProduitRating.map(e=>{

      cpt_produit_rating+=1;
      return( 
        <tr>
          <td>{cpt_produit_rating}</td>
          <td>{e.nom} </td>
          <td>{e.rating}</td>
        </tr>
        )

    });
    return(
    <div className="MainContainer">
      <ChangeTabName/>
        <div className="NombreUtil">Nombre de clients inscrits : {statistics.NombreUtilisateur}</div>
        <div className="TablesContainer">
          <Table striped bordered hover className="StatsTable">
            <thead>
              <tr>Top users</tr>
              <tr>
                <th>#</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>
            {TopUserList}
            </tbody>
          </Table>
          <Table striped bordered hover className="StatsTable">
            <thead>
              <tr>Top produit par nombre de vente</tr>
              <tr>
                <th>#</th>
                <th>nom du Produit</th>
                <th>nombre de vente</th>
              </tr>
            </thead>
            <tbody>
            {TopProductVenteList}
            </tbody>
          </Table>
          <Table striped bordered hover className="StatsTable">
            <thead>
              <tr>Top produit par note</tr>
              <tr>
                <th>#</th>
                <th>nom du Produit</th>
                <th>note</th>
              </tr>
            </thead>
            <tbody>
            {TopProductRatingList}
            </tbody>
          </Table>

        </div>
        
        
      {/* Top Clients */}
      {/* TODO:
        Top produit ratings
        Top produit Nbr de vente
        évolution des ventes.
        */}

        
    </div>
          
          
      )
  }
};






const mapStateToProps = state =>({
    error : state.error,
    stats : state.stats
  });
  
  
  export default connect(
    mapStateToProps,
    { clearErrors, GetUserStats, GetProductStats}
  )(Stats);
  