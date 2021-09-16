import React, { Component } from "react";
import "../../css/delete.css";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { Delete } from "../../actions/categActions";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { getListCategories } from "../../actions/categActions";
import { useEffect } from 'react'
import ReactDOM from 'react-dom'


const ChangeTabName = () => {
    // This effect runs once, after the first render
    useEffect(() => {
      document.title = "Delete category"
    }, [])
    
    return <div></div>
  };


class DelCategory extends Component {
  state = {
    AllCategories: [],
    result: [],
    search: "",
    msg: null,
  };
  static propTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getListCategories: PropTypes.func.isRequired,
    Delete: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getListCategories();
    setTimeout(() => {
      const ArrayCategories = this.props.categorie.list_Categories.map(
        (c) => c
      );
      this.setState({
        AllCategories: ArrayCategories,
        result: ArrayCategories,
      });
    }, 500);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let result = [];
    let i = 0;
    for (let j = 0; j < this.state.AllCategories.length; j++) {
      var cat = this.state.AllCategories[j];
      if (cat.nom.includes(this.state.search)) {
        result[i] = cat;
        i += 1;
      }
    }
    this.setState({ result: result });
  };
  onDelete = (e) => {
    if (e.target.id) {
      this.props.Delete({ _id: e.target.id });
    } else {
    }
  };
  render() {
    const resultBody = this.state.result.map((c) => {
      return (
        <tr key={c._id}>
          <td>{c.nom}</td>
          <td>0</td>
          <td>N/A</td>
          {/* <td>
            <button>Modify</button>
          </td> */}
          <td>
            <button id={c._id} onClick={this.onDelete}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className='MainContainer'>
        <ChangeTabName/>
        <form className='SearchContainer'>
          <input
            className='SearchBar'
            name='search'
            onChange={this.onChange}
          ></input>
          <button className='SearchButon' onClick={this.onSubmit}>
            {" "}
            Search{" "}
          </button>
        </form>
        <Table striped bordered hover className='ResultTable'>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Number of sub-categories</th>
              <th>Main Category</th>
              {/* <th>Modify</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{resultBody}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  categorie: state.categorie,
});

export default connect(mapStateToProps, {
  getListCategories,
  Delete,
  clearErrors,
})(DelCategory);
