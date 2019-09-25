import React, { Component } from 'react';
import { connect } from 'react-redux';
import {showHideForm} from '../../../../store/action/CityAction';
import {hideMessage} from '../../../../store/action/MessageAction';
// import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import {ReactMessage} from '../../../utils/ReactMessage';
import {CheckSession} from '../../../utils/CheckSession';
import Header from '../../../UtilComponent/Header';
import CityForm from './CityForm';
import CityList from './CityList';

class CityMaster extends Component {

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

              <CityForm />
            
            </div>
          </div>

          <div className="col-sm-7 col-md-7 col-lg-7 float-left">
            <div className="content-wrapper" >

              <CityList />
              
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
      isFormShow: state.cityReducer.isCityFormShow
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

export default connect(mapStateToProps, mapDispatchToProps)(CityMaster);

