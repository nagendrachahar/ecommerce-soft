import React, { Component } from 'react';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {ReactMessage} from '../../utils/ReactMessage';
import {SellerSession} from '../../utils/CheckSession';
import Header from '../../UtilComponent/Header';
import {Input} from '../../UtilComponent/Elements/TextField2'; 
import {InputFile} from '../../UtilComponent/Elements/FileUpload';
import {Profile} from '../../../Services/seller';
import StateDrop from '../../utils/StateDrop';
import CityDrop from '../../utils/CityDrop'; 

class SellerProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      isUpdate:false,
      images: [],
      FormGroup: {
        sellerName: '', 
        sellerPhone: '', 
        sellerEmail: '', 
        password: '',
        stateId: '0', 
        cityId: '0', 
        pinCode: '', 
        Address: '', 
        accountNo: '', 
        bankName: '', 
        ifscCode: ''
      },
      messageShow: false,
      messageType: 'success',
      Message:'',
    };

    this.mounted = true;
    SellerSession(this.props);
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  componentDidMount() {
    this.getSellerDetail();
  }

  hideMessage = () => {
    this.setState({
      messageShow: false,
      messageType: 'success',
      Message: '',
    });
  }

  getSellerDetail = () => {
  
    Profile.getDetail().then(res => {
        console.log(res.data.seller);
        if(res.data.resType === 'success'){
          if(res.data.seller !== null){
            const UserInput = this.state.FormGroup;
            UserInput['sellerName'] = res.data.seller.sellerName;
            UserInput['sellerPhone'] = res.data.seller.sellerPhone;
            UserInput['sellerEmail'] = res.data.seller.sellerEmail;
            UserInput['password'] = res.data.seller.password;
            UserInput['stateId'] = res.data.seller.stateId;
            UserInput['cityId'] = res.data.seller.cityId;
            UserInput['pinCode'] = res.data.seller.pinCode;
            UserInput['Address'] = res.data.seller.Address;
            UserInput['accountNo'] = res.data.seller.accountNo;
            UserInput['bankName'] = res.data.seller.bankName;
            UserInput['ifscCode'] = res.data.seller.ifscCode;

            if(this.mounted){
              this.setState({
                  FormGroup: UserInput, 
                  isUpdate: true, 
                  id: res.data.seller._id 
              });
            }

          }

        }
    })
  }

  handleInputChange = (event) => {
        
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const UserInput = this.state.FormGroup;

    UserInput[name] = value;

    this.setState({
        FormGroup: UserInput
    });

  }

  hendleDropChange = (name, value) => {
    console.log(name, value);
    const UserInput = this.state.FormGroup;

    UserInput[name] = value;

    this.setState({
      FormGroup:UserInput
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const seller = this.state.FormGroup
    const data = new FormData();

    this.state.images.forEach(image => {
      data.append("image", image, image.name);
    });

     data.append('sellerName',seller.sellerName);
     data.append('sellerPhone',seller.sellerPhone);
     data.append('sellerEmail',seller.sellerEmail);
     data.append('password',seller.password);
     data.append('stateId',seller.stateId);
     data.append('cityId',seller.cityId);
     data.append('pinCode',seller.pinCode);
     data.append('Address',seller.Address);
     data.append('accountNo',seller.accountNo);
     data.append('bankName',seller.bankName);
     data.append('ifscCode',seller.ifscCode);

    
     Profile.updateDetail(data)
     .then(res => {
       console.log(res);

        this.setState({
          messageShow: true, 
          messageType: res.data.resType, 
          Message: res.data.message, 
        });

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

render() {

    return (

      <div>

        {/* <Logo Name="Inzeal Infotech" /> */}

        {this.state.messageShow ? <ReactMessage func={this.hideMessage} messageType={this.state.messageType} Message={this.state.Message} /> : null}
        <Header />
          <div style={{padding:"20px"}}>
            
            <div className="content-wrapper">
                <p className="head_h2">Seller Setting</p>
                <form onSubmit={this.handleSubmit}>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left"> 
                          <Input 
                          Type="text" 
                          Name="sellerName" 
                          Value={this.state.FormGroup.sellerName} 
                          Placeholder="Seller Name" 
                          Func={this.handleInputChange} />

                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="sellerPhone" 
                          Value={this.state.FormGroup.sellerPhone} 
                          Placeholder="Phone" 
                          Func={this.handleInputChange} />

                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="email" 
                          Name="sellerEmail" 
                          Value={this.state.FormGroup.sellerEmail} 
                          Placeholder="Email" 
                          Func={this.handleInputChange} />

                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="password" 
                          Value={this.state.FormGroup.password} 
                          Placeholder="Password" 
                          Func={this.handleInputChange} />
                  </div> 

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                      <StateDrop 
                        Name='stateId' 
                        StateId={this.state.FormGroup.stateId} 
                        Func={this.hendleDropChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                      <CityDrop 
                        Name='cityId' 
                        CityId={this.state.FormGroup.cityId} 
                        StateId={this.state.FormGroup.stateId} 
                        Func={this.hendleDropChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="pinCode" 
                          Value={this.state.FormGroup.pinCode} 
                          Placeholder="Pin Code" 
                          Func={this.handleInputChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="Address" 
                          Value={this.state.FormGroup.Address} 
                          Placeholder="Address" 
                          Func={this.handleInputChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="accountNo" 
                          Value={this.state.FormGroup.accountNo} 
                          Placeholder="Account No" 
                          Func={this.handleInputChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="bankName" 
                          Value={this.state.FormGroup.bankName} 
                          Placeholder="Bank Name" 
                          Func={this.handleInputChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="ifscCode" 
                          Value={this.state.FormGroup.ifscCode} 
                          Placeholder="IFSC Code" 
                          Func={this.handleInputChange} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                    
                        <InputFile 
                          Name="Logo" 
                          Placeholder="Photo" 
                          Func={this.selectImages} />

                          <p className="text-info">{this.state.message}</p>
                  </div>

                  <div className="col-md-12 col-lg-12" style={{clear:"both"}}>
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                    
                </form>
            </div>
        </div>
      </div>

    );
  }
}
export default SellerProfile;