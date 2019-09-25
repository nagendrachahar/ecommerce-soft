import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {getBrandList, getBrandDetail} from '../../../../store/action/BrandAction';
import {showMessage} from '../../../../store/action/MessageAction';
//import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';


class BrandList extends Component {

  componentDidMount() {
    this.props.changeStateToReducer();
  }

  deleteBrand = (id) => {
    
    axios.delete(`${process.env.PUBLIC_URL}/api/deleteBrand/${id}`)
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

  getBrandDetail = (id) => {
    this.props.getBrandDetail(id);
  }

  
render() {

  const renderTable  = (List) =>{
    return(
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => 
              <tr key={index}>
                <td>{item.brandName}</td>
                <td>
                  <button className="btn btn-sm btn-info" onClick={this.getBrandDetail.bind(this, item._id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={this.deleteBrand.bind(this, item._id)}>Delete</button>
                </td>
              </tr>
              
            )}
          </tbody>
        </table>

    );

  }

  const Brand = this.props.brandloading ? 
          <div className="loader">
            <img src={process.env.PUBLIC_URL+"/Images/loading3.gif"} alt="loader" style={{width:"200px"}} />
          </div> : renderTable(this.props.brandList)

    return (

      <React.Fragment>
        <p className="head_h2">List</p>
        {Brand}
      </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return ({
    brandList: state.brandReducer.brandList,
    brandloading:state.brandReducer.brandloading
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      changeStateToReducer: () => {
        dispatch(getBrandList());
      },
      getBrandDetail: (id) => {
        dispatch(getBrandDetail(id));
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      }
  });
}



export default connect(mapStateToProps,mapDispatchToProps)(BrandList);


