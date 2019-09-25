import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hideMessage, showMessage} from '../../../store/action/MessageAction';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from '../../UtilComponent/Header';
import {ReactMessage} from '../../utils/ReactMessage';
import {CheckSession} from '../../utils/CheckSession';

import {Input} from '../../UtilComponent/Elements/TextField2'; 
import {InputFile} from '../../UtilComponent/Elements/FileUpload'; 
import CatgoryDrop from '../../utils/CategoryDrop';
import StatusDrop from '../../utils/StatusDrop';
import {PriseRevise} from '../../../Services/master'


class PriceReviseIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      productId:0,
      isUpdate:false,
      images: [],
      FormGroup: {
        productName: '', 
        price: '', 
        RevisedPrice: '',
        category1: '0', 
        category2: '0', 
        category3: '0', 
        discription: "", 
        isApproved: false
      }
    };

    CheckSession(this.props);
  }

  componentDidMount(){
    PriseRevise.getDetail(this.props.match.params.id).then(res => {
      if(res.data.resType === "success"){
        this.setState({
          FormGroup: res.data.product,
          productId: res.data.product._id,
          isUpdate: true
        })
      }
    })
  }

  clearForm = () => {
    const UserInput = {};
    UserInput['productName'] = '';
    UserInput['price'] = '';
    UserInput['RevisedPrice'] = '';
    UserInput['category1'] = '0';
    UserInput['category2'] = '0';
    UserInput['category3'] = '0';
    UserInput['discription'] = '';
    UserInput['isApproved'] = false;

    this.setState({
        FormGroup: UserInput,
        productId: 0,
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
    
    const UserInput = this.state.FormGroup;

    UserInput[name] = value;

    this.setState({
      FormGroup:UserInput
    })

  }

  selectImages = (event) => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif|rar)$/))
    //let message = `${images.length} valid image(s) selected`
    this.setState({ images })

  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const {FormGroup, productId} = this.state;

    const data = new FormData();

    this.state.images.forEach(image => {
      data.append("image", image, image.name);
    });

     data.append('productName',FormGroup.productName);
     data.append('price',FormGroup.price);
     data.append('RevisedPrice',FormGroup.RevisedPrice);
     data.append('category1',FormGroup.category1);
     data.append('category2',FormGroup.category2);
     data.append('category3',FormGroup.category3);
     data.append('discription',FormGroup.discription);
     data.append('isApproved',FormGroup.isApproved);

     PriseRevise.saveProduct(data, productId).then(res => {

      if(res.data.resType === 'success'){
        this.clearForm();
      }

      this.props.showMessage({
        messageType: res.data.resType,
        Message: res.data.message
      });

    }).catch(err => console.log(err));

  }

render() {

    return (

      <div>

        {this.props.messageShow ? <ReactMessage func={this.props.hideMessage} messageType={this.props.messageType} Message={this.props.Message} /> : null}

        <Header />

        <div className="col-sm-12 col-md-12 col-lg-12 float-left">
          <div className="content-wrapper" >

            <p className="head_h2">Add Product</p>
            <form onSubmit={this.handleSubmit}>

              <div className="col-sm-4 col-md-3 col-lg-3 float-left"> 
                <CatgoryDrop 
                  Placeholder="Category1" 
                  Name='category1' 
                  CategoryId={this.state.FormGroup.category1} 
                  Func={this.hendleDropChange} /> 
                  
              </div> 

              <div className="col-sm-4 col-md-3 col-lg-3 float-left"> 
                <CatgoryDrop 
                  Placeholder="Category2" 
                  Name='category2' 
                  CategoryId={this.state.FormGroup.category2} 
                  ParentId={this.state.FormGroup.category1}
                  Func={this.hendleDropChange} /> 
              </div> 

              <div className="col-sm-4 col-md-3 col-lg-3 float-left"> 
                <CatgoryDrop 
                  Placeholder="Category3" 
                  Name='category3' 
                  CategoryId={this.state.FormGroup.category3} 
                  ParentId={this.state.FormGroup.category2} 
                  Func={this.hendleDropChange} /> 
              </div> 

              <div className="col-sm-4 col-md-3 col-lg-3 float-left">
                
                <Input 
                  Type="text" 
                  Name="productName" 
                  Value={this.state.FormGroup.productName} 
                  Placeholder="Product" 
                  Func={this.handleInputChange} Data={this.state.FormGroup} />

              </div> 

              <div className="col-sm-4 col-md-3 col-lg-3 float-left">
                
                <Input 
                  Type="text" 
                  Name="price" 
                  Value={this.state.FormGroup.price} 
                  Placeholder="Price" 
                  Func={this.handleInputChange} />

              </div>

              <div className="col-sm-4 col-md-3 col-lg-3 float-left">
                
                <Input 
                  Type="text" 
                  Name="RevisedPrice" 
                  Value={this.state.FormGroup.RevisedPrice} 
                  Placeholder="Revised Price" 
                  Func={this.handleInputChange} />

              </div>

              <div className="col-sm-4 col-md-3 col-lg-3 float-left">
                
                <Input 
                  Type="text" 
                  Name="discription" 
                  Value={this.state.FormGroup.discription} 
                  Placeholder="Discription" 
                  Func={this.handleInputChange} />

              </div>

              <div className="col-sm-4 col-md-3 col-lg-3 float-left"> 
                <StatusDrop 
                  Placeholder="Status" 
                  Name='isApproved' 
                  Status={this.state.FormGroup.isApproved} 
                  Func={this.hendleDropChange} /> 
              </div> 

              <div className="col-sm-3 col-md-3 col-lg-3 float-left">
            
                <InputFile 
                  Name="Logo" 
                  Placeholder="Logo" 
                  Func={this.selectImages} />

                  <p className="text-info">{this.state.message}</p>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-12" style={{clear:"both"}}>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </div>

            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PriceReviseIndex);

