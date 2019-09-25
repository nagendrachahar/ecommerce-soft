import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {baseUrl} from '../../../Services/Urls';
import {hideMessage, showMessage} from '../../../store/action/MessageAction';
import {PriseRevise} from '../../../Services/master';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from '../../UtilComponent/Header'; 
import {ReactMessage} from '../../utils/ReactMessage'; 
import {CheckSession} from '../../utils/CheckSession'; 


class PriceReviseListIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      ProductList: [],
      loading: true
    }

    CheckSession(this.props);
  }

  componentDidMount() {
    this.fillList()
  }

  fillList = () => {
    PriseRevise.getProductList()
    .then(res => {

      if(res.data.resType === 'success'){
        this.setState({
          ProductList: res.data.product,
          loading: false
        })
      }

    });
  }

  deleteProduct = (id) => {

    PriseRevise.deleteProductById(id)
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
      console.log(List);
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
                    <Link className="btn btn-sm btn-info" to={`/PriceRevise/${item._id}`} >Edit</Link>
                  </td>
                </tr>
                
              )}
            </tbody>
          </table>
  
      );
  
    }
  
    const Product = this.state.loading ? 
          <div className="loader"><img src={baseUrl+"/Images/loading3.gif"} alt="loader" style={{width:"200px"}} /></div>
            : renderTable(this.state.ProductList)
  
      return (

        <div>

          {this.props.messageShow ? <ReactMessage func={this.props.hideMessage} messageType={this.props.messageType} Message={this.props.Message} /> : null}

          <Header />

          <div className="col-sm-12 col-md-12 col-lg-12 float-left">
            <div className="content-wrapper" >

              <p className="head_h2">Product List</p>
              {Product}
              
            </div>
          </div>

        </div>
      );
  }
}

function mapStateToProps(state) {
    return ({
      messageShow: state.messageReducer.messageShow,
      messageType: state.messageReducer.messageType,
      Message: state.messageReducer.Message
    });
}

function mapDispatchToProps(dispatch) {
  return ({
    hideMessage: () => {
      dispatch(hideMessage());
    },
    showMessage: (data) => {
      dispatch(showMessage(data)); 
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceReviseListIndex);

