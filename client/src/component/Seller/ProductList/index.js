import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hideMessage} from '../../../store/action/MessageAction';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from '../../UtilComponent/Header';
import {ReactMessage} from '../../utils/ReactMessage';
import {SellerSession} from '../../utils/CheckSession';

//import AddProductForm from './Form';
import ProductList from './List';


class ProductListIndex extends Component {

  constructor(props){
    super(props);

    SellerSession(this.props);
  }


render() {

    return (

      <div>

        {this.props.messageShow ? <ReactMessage func={this.props.hideMessage} messageType={this.props.messageType} Message={this.props.Message} /> : null}

        <Header />

        <div className="col-sm-12 col-md-12 col-lg-12 float-left">
          <div className="content-wrapper" >

            <ProductList />
            
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
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListIndex);

