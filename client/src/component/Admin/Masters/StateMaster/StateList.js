import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {getStateList, getStateDetail, showHideForm} from '../../../../store/action/StateAction';
import {showMessage} from '../../../../store/action/MessageAction';
//import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';


class StateList extends Component {

  componentDidMount() {
    this.props.changeStateToReducer();
  }

  deleteState = (id) => {
    
    axios.delete(`${process.env.PUBLIC_URL}/api/deleteState/${id}`)
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

  getStateDetail = (id) =>{
    this.props.getStateDetail(id);
    this.props.showHideForm();
  }

  
render() {

  const StateTable  = (List) =>{
    return(
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>State Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => 
              <tr key={index}>
                <td>{item.stateName}</td>
                <td>
                  <button className="btn btn-sm btn-info" onClick={this.getStateDetail.bind(this, item._id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={this.deleteState.bind(this, item._id)}>Delete</button>
                </td>
              </tr>
              
            )}
          </tbody>
        </table>

    );

  }

  const State = this.props.stateloading ? <div className="loader"><img src={process.env.PUBLIC_URL+"/Images/loading3.gif"} alt="loader" style={{width:"200px"}} /></div> : StateTable(this.props.stateList)

    return (

      <React.Fragment>
        <p className="head_h2">State List</p>
        {State}
      </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return ({
    stateList: state.stateReducer.stateList,
    stateloading:state.stateReducer.stateloading
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      changeStateToReducer: () => {
        dispatch(getStateList());
      },
      getStateDetail: (id) => {
        dispatch(getStateDetail(id));
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      },
      showHideForm: () => {
        dispatch(showHideForm(true));
      }
  });
}



export default connect(mapStateToProps,mapDispatchToProps)(StateList);


