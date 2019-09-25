import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {getBrandList} from '../../../../store/action/BrandAction';
import {showMessage} from '../../../../store/action/MessageAction';

import {Input} from '../../../UtilComponent/Elements/TextField2'; 
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class BrandForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      brandId:0,
      isUpdate:false,
      FormGroup: {
        brandName: ''
      }
    };

  }

  clearForm = () => {
    const UserInput = {};
    UserInput['brandName'] = '';

    this.setState({
        FormGroup: UserInput,
        brandId: 0,
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
    if (prevProps.brandDetail !== this.props.brandDetail) {
      this.setState({
        FormGroup:this.props.brandDetail
      })

      if(this.props.brandDetail !== ''){
        this.setState({
          brandId:this.props.brandDetail._id,
          isUpdate: true
        })
      }

    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const Brand = this.state.FormGroup;
   
    let url = `${process.env.PUBLIC_URL}/api/SaveBrand`;

    if(this.state.isUpdate){
      url = `${process.env.PUBLIC_URL}/api/updateBrandById/${this.state.brandId}`;
    }

    axios.post(url, Brand)
    .then(res => {

        if(res.data.resType === 'success'){
          this.clearForm();
          this.props.getBrandList();
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
                Name="brandName" 
                Value={this.state.FormGroup.brandName} 
                Placeholder="Brand Name" 
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
    brandDetail: state.brandReducer.brandDetail
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      getBrandList: () => {
        dispatch(getBrandList());
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      }
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(BrandForm);

