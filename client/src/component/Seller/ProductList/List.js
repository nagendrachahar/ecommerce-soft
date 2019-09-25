import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {baseUrl} from '../../../Services/Urls';
import {getProductList} from '../../../store/action/AddProductAction';
import {showMessage} from '../../../store/action/MessageAction';
import {Product} from '../../../Services/master';
//import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class ProductList extends Component {

  componentDidMount() {
    this.props.changeStateToReducer();
  }

  deleteProduct = (id) => {

    Product.deleteProductById(id)
    .then(res => {

      if(res.data.resType === 'success'){
        this.props.changeStateToReducer();
      }

      this.props.showMessage({
        messageType: res.data.resType,
        Message:res.data.message
      });

    }).catch(err => console.log(err));
  }

  

render() {

  const renderTable  = (List) =>{
    
    return(
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => 
              <tr key={index}>
                <td><img src={`${baseUrl}/Product/${item.photoPath === "" ? "noImage.png" : item.photoPath}`} style={{width:"150px", height:"100px"}} alt="product" /></td>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.entryOn}</td>
                <td>{item.isApproved ? "Active" : "DeActive"}</td>
                <td>
                  <Link className="btn btn-sm btn-info" to={`/AddProduct/${item._id}`} >Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={this.deleteProduct.bind(this, item._id)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
    );
  }

  const Product = this.props.productLoading ? 
        <div className="loader"><img src={baseUrl+"/Images/loading3.gif"} alt="loader" style={{width:"200px"}} /></div>
          : renderTable(this.props.productList)

    return (

      <React.Fragment>
        <p className="head_h2">Product List</p>
        {Product}
      </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return ({
    productList: state.productReducer.productList,
    productLoading: state.productReducer.productLoading
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      changeStateToReducer: () => {
        dispatch(getProductList()); 
      },
      showMessage: (data) => {
        dispatch(showMessage(data)); 
      }
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);


