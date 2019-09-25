import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {getStateList, showHideForm} from '../../../../store/action/StateAction';
import {showMessage} from '../../../../store/action/MessageAction';

import {Input} from '../../../UtilComponent/Elements/TextField2'; 
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class StateForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      stateId:0,
      isUpdate:false,
      FormGroup: {
        stateName: ''
      }
    };

  }

  clearForm = () => {
    const UserInput = {};
    UserInput['stateName'] = '';

    this.setState({
        FormGroup: UserInput,
        stateId: 0,
        isUpdate: false
    });
    
  }

  handleInputChange = (event) => {
       
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const UserInput = this.state.FormGroup;

    UserInput[name] = value;

    this.setState({
      FormGroup:UserInput
    })

  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.stateDetail !== this.props.stateDetail) {
      this.setState({
        FormGroup:this.props.stateDetail
      })

      if(this.props.stateDetail !== ''){
        this.setState({
          stateId:this.props.stateDetail._id,
          isUpdate: true
        })
      }

    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const State = this.state.FormGroup;
   
    let url = `${process.env.PUBLIC_URL}/api/SaveState`;

    if(this.state.isUpdate){
      url = `${process.env.PUBLIC_URL}/api/updateStateById/${this.state.stateId}`;
    }

    axios.post(url, State)
    .then(res => {

        if(res.data.resType === 'success'){
          this.clearForm();
          this.props.getStateList();
        }

        this.props.showMessage({
          messageType: res.data.resType,
          Message:res.data.message
        });

     }).catch(err => console.log(err));

  }

render() {

    return (
      <React.Fragment>
        <p className="head_h2">Add State</p>
        <form onSubmit={this.handleSubmit}>

          <div className="col-sm-12 col-md-12 col-lg-12 float-left">
            
              <Input 
                Type="text" 
                Name="stateName" 
                Value={this.state.FormGroup.stateName} 
                Placeholder="State Name" 
                Func={this.handleInputChange} />

          </div>

          <div className="col-sm-12 col-md-12 col-lg-12" style={{clear:"both"}}>
              <button type="submit" className="btn btn-primary">Submit</button>
          </div>

        </form>

      </React.Fragment>

    );
  }
}

function mapStateToProps(state) {
  return ({
    stateDetail: state.stateReducer.stateDetail
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      getStateList: () => {
        dispatch(getStateList());
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      },
      showHideForm: () => {
        dispatch(showHideForm(false));
      }
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(StateForm);

