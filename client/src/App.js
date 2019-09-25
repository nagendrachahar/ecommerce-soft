import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
//import { connect } from 'react-redux';
//Admin----------
import LoginComponent from './component/Login';
import AdminHome from './component/Admin/AdminHome';
import CompanySetup from './component/Admin/Masters/CompanySetup'
import StateMaster from './component/Admin/Masters/StateMaster/StateMaster';
import CityMaster from './component/Admin/Masters/CityMaster/CityMaster';
import CategoryMaster from './component/Admin/Masters/Category/CategoryMaster';
import BrandMaster from './component/Admin/Masters/Brand/index';
import PriceReviseListIndex from './component/Admin/ProductPriceRevise/List';
import PriceReviseIndex from './component/Admin/ProductPriceRevise/Form';

//Seller-------------
import SellerHome from './component/Seller/SellerHome';
import AddProductIndex from './component/Seller/AddProduct/index';
import ProductListIndex from './component/Seller/ProductList/index';
import SellerProfile from './component/Seller/Profile/index';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LoginComponent}/> 
          <Route path='/AdminHome' component={AdminHome}/> 
          <Route path='/Login' component={LoginComponent}/> 
          <Route path='/CompanySetup' component={CompanySetup}/> 
          <Route path='/StateMaster' component={StateMaster}/> 
          <Route path='/CityMaster' component={CityMaster}/> 
          <Route path='/Category' component={CategoryMaster}/> 
          <Route path='/Brand' component={BrandMaster}/> 
          <Route path='/PriceReviseList' component={PriceReviseListIndex}/> 
          <Route path='/PriceRevise/:id' component={PriceReviseIndex}/> 

          <Route path='/SellerHome' component={SellerHome}/> 
          <Route path='/AddProduct/:id' component={AddProductIndex}/> 
          <Route path='/ProductList' component={ProductListIndex}/> 
          <Route path='/SellerProfile' component={SellerProfile}/> 
          
        </Switch>
      </div>
       
    );
  }
}

//  function mapStateToProps(state) {
//     return ({
//       isLogin: state.loginReducer.isLogin
//     });
//   }

//export default connect(mapStateToProps)(App);

export default App;

(function getSession(){

    //console.log(sessionStorage.getItem("x-token"));
    if(localStorage.getItem("x-token") != null){
      axios.defaults.headers.common['x-token'] = localStorage.getItem("x-token");
    }

})();

