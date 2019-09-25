import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Master} from '../../../../Services/master.js'
import {getCityList, showHideForm} from '../../../../store/action/CityAction';
import {showMessage} from '../../../../store/action/MessageAction';
import StateDrop from '../../../utils/StateDrop';


import {Input} from '../../../UtilComponent/Elements/TextField2'; 
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class CityForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      cityId:0,
      isUpdate:false,
      FormGroup: {
        stateId:'',
        cityName: ''
      }
    };

  }

  clearForm = () => {
    const UserInput = {};
    UserInput['stateId'] = '0';
    UserInput['cityName'] = '';

    this.setState({
        FormGroup: UserInput,
        cityId:0,
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

  hendleDropChange = (name, value) => {
    console.log(name, value);
    const UserInput = this.state.FormGroup;

    UserInput[name] = value;

    this.setState({
      FormGroup:UserInput
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.cityDetail !== this.props.cityDetail) {
      this.setState({
        FormGroup:this.props.cityDetail
      })

      if(this.props.cityDetail !== ''){
        this.setState({
          cityId:this.props.cityDetail._id,
          isUpdate: true
        })
      }

    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const City = this.state.FormGroup;
    console.log(City)
   
    let url = `${process.env.PUBLIC_URL}/api/SaveCity`;

    if(this.state.isUpdate){
      url = `${process.env.PUBLIC_URL}/api/updateCityById/${this.state.cityId}`;
    }

    Master.saveCity(url, City).then(res => {
      if(res.data.resType === 'success'){
        this.clearForm();
        this.props.getCityList();
      }

      this.props.showMessage({
        messageType: res.data.resType,
        Message:res.data.message
      });
    })

  }

render() {

    return (
      <React.Fragment>
        <p className="head_h2">Add City</p>
        <form onSubmit={this.handleSubmit}>

          <div className="col-sm-12 col-md-12 col-lg-12 float-left">
              <StateDrop 
                Name='stateId' 
                StateId={this.state.FormGroup.stateId} 
                Func={this.hendleDropChange} />
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12 float-left">
           
              <Input 
                Type="text" 
                Name="cityName" 
                Value={this.state.FormGroup.cityName} 
                Placeholder="City Name" 
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
    cityDetail: state.cityReducer.cityDetail
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      getCityList: () => {
        dispatch(getCityList());
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      },
      showHideForm: () => {
        dispatch(showHideForm(false));
      }
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(CityForm);

