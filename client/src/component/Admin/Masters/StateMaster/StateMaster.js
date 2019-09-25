import React, { Component } from 'react';
import { connect } from 'react-redux';
import {showHideForm} from '../../../../store/action/StateAction';
import {hideMessage} from '../../../../store/action/MessageAction';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from '../../../UtilComponent/Header';
import {ReactMessage} from '../../../utils/ReactMessage';
import {CheckSession} from '../../../utils/CheckSession';

import StateForm from './StateForm';
import StateList from './StateList';


class StateMaster extends Component {

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

            <StateForm />
          
          </div>
        </div>

        <div className="col-sm-7 col-md-7 col-lg-7 float-left">
          <div className="content-wrapper" >

            <StateList />
            
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
      Message: state.messageReducer.Message,
      isFormShow: state.stateReducer.isStateFormShow
    });
}

function mapDispatchToProps(dispatch) {
  return ({
    hideMessage: () => {
        dispatch(hideMessage());
      },
      showHideForm: () => {
        dispatch(showHideForm(true));
      }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(StateMaster);

