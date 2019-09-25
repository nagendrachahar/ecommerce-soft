import React, { Component } from 'react';
import axios from 'axios';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import {ReactMessage} from '../../../utils/ReactMessage';
import {CheckSession} from '../../../utils/CheckSession';
import Header from '../../../UtilComponent/Header';
import {Input} from '../../../UtilComponent/Elements/TextField2'; 
import {InputFile} from '../../../UtilComponent/Elements/FileUpload';

class CompanySetup extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      isUpdate:false,
      images: [],
      FormGroup: {
        companyName: '', 
        email: '', 
        contactNo: '', 
        Address: '' 
      },
      messageShow: false,
      messageType: 'success',
      Message:'',
    };

    this.mounted = true;
    CheckSession(this.props);
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  componentDidMount() {
    this.getCompanyDetail();
  }

  hideMessage = () => {
    this.setState({
      messageShow: false,
      messageType: 'success',
      Message: '',
    });
  }

  getCompanyDetail = () => {
  
    axios.get(`${process.env.PUBLIC_URL}/api/getCompanyById`)
    .then(res => {
        console.log(res.data.company);
        if(res.data.resType === 'success'){
          if(res.data.company !== null){
            const UserInput = this.state.FormGroup;
            UserInput['companyName'] = res.data.company.companyName;
            UserInput['email'] = res.data.company.email;
            UserInput['contactNo'] = res.data.company.contactNo;
            UserInput['Address'] = res.data.company.Address;

            if(this.mounted){
              this.setState({
                  FormGroup: UserInput, 
                  isUpdate: true, 
                  id: res.data.company._id 
              });
            }
          }

        }
    }).catch(err => console.log(err));
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

  handleSubmit = (event) => {
    event.preventDefault();
     //const School = this.state.FormGroup
    const data = new FormData();

    this.state.images.forEach(image => {
      data.append("image", image, image.name);
    });

     data.append('companyName',this.state.FormGroup.companyName);
     data.append('email',this.state.FormGroup.email);
     data.append('contactNo',this.state.FormGroup.contactNo);
     data.append('Address',this.state.FormGroup.Address);

     let url = `${process.env.PUBLIC_URL}/api/SaveCompany`;

     if(this.state.isUpdate){
        url = `${process.env.PUBLIC_URL}/api/updateCompanyById/${this.state.id}`;
     }
    
     axios.post(url, data)
     .then(res => {
       console.log(res);

      this.setState({
        messageShow: true, 
        messageType: res.data.resType, 
        Message: res.data.message, 
      });

     }).catch(err => console.log(err));

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
                <p className="head_h2">Company Setup</p>
                <form onSubmit={this.handleSubmit}>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left"> 
                          <Input 
                          Type="text" 
                          Name="companyName" 
                          Value={this.state.FormGroup.companyName} 
                          Placeholder="Company Name" 
                          Func={this.handleInputChange} />

                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="email" 
                          Name="email" 
                          Value={this.state.FormGroup.email} 
                          Placeholder="Email" 
                          Func={this.handleInputChange} />

                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 float-left">
                        <Input 
                          Type="text" 
                          Name="contactNo" 
                          Value={this.state.FormGroup.contactNo} 
                          Placeholder="Contect No" 
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
                    
                        <InputFile 
                          Name="Logo" 
                          Placeholder="Logo" 
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
export default CompanySetup;

