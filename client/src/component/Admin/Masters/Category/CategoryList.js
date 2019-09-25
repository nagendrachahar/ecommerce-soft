import React, { Component } from 'react';
import { connect } from 'react-redux';
import {baseUrl} from '../../../../Services/Urls';
import {getCategoryList, getCategoryDetail} from '../../../../store/action/CategoryAction';
import {showMessage} from '../../../../store/action/MessageAction';
import {categoryCall} from '../../../../Services/master';
//import * as $ from 'jquery';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';


class CategoryList extends Component {

  componentDidMount() {
    this.props.changeStateToReducer();
  }

  deleteCategory = (id) => {

    categoryCall.deleteCategoryById(id)
    .then(res => {

      if(res.data.resType === 'success'){
        this.props.changeStateToReducer();
      }

      this.props.showMessage({
        messageType: res.data.resType,
        Message:res.data.message
      });

    }).catch(err => console.log(err));
  }

  getCategoryDetail = (id) =>{
    this.props.getCategoryDetail(id);
  }

  
render() {

  const renderTable  = (List) =>{
    return(
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => 
              <tr key={index}>
                <td>{item.categoryName}</td>
                <td>
                  <button className="btn btn-sm btn-info" onClick={this.getCategoryDetail.bind(this, item._id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={this.deleteCategory.bind(this, item._id)}>Delete</button>
                </td>
              </tr>
              
            )}
          </tbody>
        </table>

    );

  }

  const Category = this.props.categoryLoading ? <div className="loader"><img src={baseUrl+"/Images/loading3.gif"} alt="loader" style={{width:"200px"}} /></div> : renderTable(this.props.categoryList)

    return (

      <React.Fragment>
        <p className="head_h2">Category List</p>
        {Category}
      </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return ({
    categoryList: state.categoryReducer.categoryList,
    categoryLoading:state.categoryReducer.categoryLoading
  });
}

function mapDispatchToProps(dispatch) {
  return ({
      changeStateToReducer: () => {
        dispatch(getCategoryList());
      },
      getCategoryDetail: (id) => {
        dispatch(getCategoryDetail(id));
      },
      showMessage: (data) => {
        dispatch(showMessage(data));
      }
  });
}



export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);


