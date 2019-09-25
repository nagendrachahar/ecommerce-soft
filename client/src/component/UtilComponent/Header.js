import React, { Component } from 'react';
import Navbar from './Navbar';
import {ProfileIconCompanent} from './Profile'
import {Logo} from '../utils/Logo';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMenu: true
    };
  }

render() {
    return (
    
      <div className="main-header">
          <div className="logo-nav-wrapper">
            
            <Navbar />
            <Logo Name="Inzeal" />
            
          </div>
          <ProfileIconCompanent />
      </div> 
      
    );
  }
}
export default Header;

