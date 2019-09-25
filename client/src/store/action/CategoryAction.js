
import {categoryCall} from '../../Services/master'

export function getCategoryDetail(id) {
  
    return dispatch => {

        categoryCall.getCategoryById(id)
        .then(response =>

            getCategoryDetailRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getCategoryDetailRes(dispatch, response) {
    
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_CATEGORY_DETAIL',
                payload: response.data.category
            })
       }
       else{
            return dispatch({
                type: 'ERROR_CATCH',
                payload: response.data
            })
       }
    }
    catch (err) {
        return dispatch({
            type: 'ERROR_CATCH',
            payload: 'Error_CATCH'
        })
    }
}

export function getCategoryList() {
  
    return dispatch => {

        categoryCall.getCategoryList()
        .then(response =>

            getCategoryListRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getCategoryListRes(dispatch, response) {
   
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_CATEGORY_LIST',
                payload: response.data.category
            })
       }
       else{
            return dispatch({
                type: 'ERROR_CATCH',
                payload: response.data.message
            })
       }
    }
    catch (err) {
        return dispatch({
            type: 'ERROR_CATCH',
            payload: 'Error_CATCH'
        })
    }
}
