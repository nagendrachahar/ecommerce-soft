import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getProductList} from '../../../store/action/AddProductAction';
import {showMessage} from '../../../store/action/MessageAction';

import {Input} from '../../UtilComponent/Elements/TextField2'; 
import {InputFile} from '../../UtilComponent/Elements/FileUpload'; 
import CatgoryDrop from '../../utils/CategoryDrop';
import BrandDrop from '../../utils/BrandDrop';
import {Product} from '../../../Services/master';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class AddProductForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      productId:0,
      isUpdate:false,
      images: [],
      FormGroup: {
        productName: '', 
        price: '', 
        brandId: '',
        category1: '0', 
        category2: '0', 
        category3: '0', 
        discription: "", 
      }
    };
  }

  componentDidMount(){
    Product.getDetail(this.props.ProductId).then(res => {
      console.log(res.data);
      if(res.data.resType === "success" && res.data.product !== null){
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
    UserInput['brandId'] = '0';
    UserInput['category1'] = '0';
    UserInput['category2'] = '0';
    UserInput['category3'] = '0';
    UserInput['discription'] = '';

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
    
    const {FormGroup, isUpdate, productId} = this.state;

    const data = new FormData();

    this.state.images.forEach(image => {
      data.append("image", image, image.name);
    });

     data.append('productName',FormGroup.productName);
     data.append('price',FormGroup.price);
     data.append('brandId',FormGroup.brandId);
     data.append('category1',FormGroup.category1);
     data.append('category2',FormGroup.category2);
     data.append('category3',FormGroup.category3);
     data.append('discription',FormGroup.discription);

     Product.saveProduct(data, isUpdate, productId).then(res => {

      if(res.data.resType === 'success'){
        this.clearForm();
        this.props.getProductList();
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
            <BrandDrop 
              Placeholder="Brand" 
              Name='brandId' 
              Value={this.state.FormGroup.brandId} 
              Func={this.hendleDropChange} /> 
              
          </div> 

          <div className="col-sm-4 col-md-3 col-lg-3 float-left">
            
            <Input 
              Type="text" 
              Name="productName" 
              Value={this.state.FormGroup.productName} 
              Placeholder="Product" 
              Func={this.handleInputChange} />

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
              Name="discription" 
              Value={this.state.FormGroup.discription} 
              Placeholder="Discription" 
              Func={this.handleInputChange} />

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

      </React.Fragment>

    );
  }
}

function mapStateToProps(state) {
  return ({
    productDetail: state.productReducer.productDetail
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    getProductList: () => {
        dispatch(getProductList());
    },
    showMessage: (data) => {
      dispatch(showMessage(data));
    }
  });
}

export default connect(mapStateToProps,mapDispatchToProps)(AddProductForm);