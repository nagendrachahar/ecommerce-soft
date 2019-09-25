import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hideMessage} from '../../../../store/action/MessageAction';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from '../../../UtilComponent/Header';
import {ReactMessage} from '../../../utils/ReactMessage';
import {CheckSession} from '../../../utils/CheckSession';

import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';


class CategoryMaster extends Component {

  constructor(props){
    super(props);

    CheckSession(this.props);
  }


render() {

    return (

      <div>

        {this.props.messageShow ? <ReactMessage func={this.props.hideMessage} messageType={this.props.messageType} Message={this.props.Message} /> : null}

        <Header />

        <div className="col-sm-5 col-md-5 col-lg-5 float-left">
          <div className="content-wrapper" >

            <CategoryForm />
          
          </div>
        </div>

        <div className="col-sm-7 col-md-7 col-lg-7 float-left">
          <div className="content-wrapper" >

            <CategoryList />
            
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMaster);

