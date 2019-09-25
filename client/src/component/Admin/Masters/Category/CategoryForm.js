import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getCategoryList} from '../../../../store/action/CategoryAction';
import {showMessage} from '../../../../store/action/MessageAction';

import {Input} from '../../../UtilComponent/Elements/TextField2'; 
import CatgoryDrop from '../../../utils/CategoryDrop';
import {categoryCall} from '../../../../Services/master'
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class CategoryForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      categoryId:0,
      isUpdate:false,
      FormGroup: {
        categoryName: '',
        parentCategory: ''
      }
    };

  }

  clearForm = () => {
    const UserInput = {};
    UserInput['categoryName'] = '';
    UserInput['parentCategory'] = '';

    this.setState({
        FormGroup: UserInput,
        categoryId: 0,
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
    if (prevProps.categoryDetail !== this.props.categoryDetail) {
      this.setState({
        FormGroup:this.props.categoryDetail
      })

      if(this.props.categoryDetail !== ''){
        this.setState({
          categoryId:this.props.categoryDetail._id,
          isUpdate: true
        })
      }

    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const {FormGroup, isUpdate, categoryId} = this.state;
   
    categoryCall.saveCategory(FormGroup, isUpdate, categoryId).then(res => {

      if(res.data.resType === 'success'){
        this.clearForm();
        this.props.getCategoryList();
      }

      this.props.showMessage({
        messageType: res.data.resType,
        Message: res.data.message
      });

   }).catch(err => console.log(err));

  }

render() {

    return (
      <React.Fragment>
        <p className="head_h2">Add Category</p>
        <form onSubmit={this.handleSubmit}>

          <div className="col-sm-12 col-md-12 col-lg-12 float-left">
            <CatgoryDrop 
              Placeholder="Parent Category"
              Name='parentCategory' 
              CategoryId={this.state.FormGroup.parentCategory} 
              Func={this.hendleDropChange} />
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12 float-left">
            
            <Input 
              Type="text" 
              Name="categoryName" 
              Value={this.state.FormGroup.categoryName} 
              Placeholder="Category" 
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
    categoryDetail: state.categoryReducer.categoryDetail
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      getCategoryList: () => {
        dispatch(getCategoryList());
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      }
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryForm);