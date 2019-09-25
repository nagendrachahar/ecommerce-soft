import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import {Logo} from '../utils/Logo';
import Navbar from '../UtilComponent/Navbar';
import {SellerSession} from '../utils/CheckSession';

 class SellerHome extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      cardList:[],
      loading: true
    };
    SellerSession(this.props);
  }

render() {

    return (
      <div className="container"> 
        <Logo SchoolName="Inzeal Infotech" /> 
        <Navbar /> 
        <div className="row"> 
          
        </div> 
      </div> 
    );
  }
}

export default SellerHome;