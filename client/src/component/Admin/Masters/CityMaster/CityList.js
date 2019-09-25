import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Master} from '../../../../Services/master.js'
import {getCityList, getCityDetail, showHideForm} from '../../../../store/action/CityAction';
import {showMessage} from '../../../../store/action/MessageAction';
//import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class CityList extends Component {

  componentDidMount() {
    this.props.changeStateToReducer();
  }

  deleteCity = (id) => {

    Master.deleteCity(id).then(res => {

      if(res.data.resType === 'success'){
        this.props.changeStateToReducer();
      }

      this.props.showMessage({
        messageType: res.data.resType,
        Message:res.data.message
      });

    })
    
  }

  getCityDet = (id) =>{
    this.props.getCityDetail(id);
    this.props.showHideForm();
  }

  
render() {

  const CityTable  = (List) =>{
   console.log(List);
    return(
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>City Name</th>
              <th>State Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => 

              <tr key={index}>
                <td>{item.cityName}</td>
                <td>{item.stateId === null ? null : item.stateId.stateName}</td>
                <td>
                  <button className="btn btn-sm btn-info" onClick={this.getCityDet.bind(this, item._id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={this.deleteCity.bind(this, item._id)}>Delete</button>
                </td>
              </tr>
              
            )}
          </tbody>
        </table>

    );

  }

  const City = this.props.cityloading ? <div className="loader"><img src={process.env.PUBLIC_URL+"/Images/loading3.gif"} alt="loader" style={{width:"200px"}} /></div> : CityTable(this.props.cityList);
  
    return (

      <React.Fragment>
        <p className="head_h2">City List</p>
        {City}
      </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return ({
    cityList: state.cityReducer.cityList,
    cityloading:state.cityReducer.cityloading
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      changeStateToReducer: () => {
        dispatch(getCityList());
      },
      getCityDetail: (id) => {
        dispatch(getCityDetail(id));
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      },
      showHideForm: () => {
        dispatch(showHideForm(true));
      }
  });
}



export default connect(mapStateToProps,mapDispatchToProps)(CityList);


