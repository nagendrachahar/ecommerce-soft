import {Product} from '../../Services/master'

export function getProductDetail(id) {
  
    return dispatch => {

        Product.getDetail(id)
        .then(response =>

            getProductDetailRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getProductDetailRes(dispatch, response) {
    
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_PRODUCT_DETAIL',
                payload: response.data.product
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

export function getProductList() {
  
    return dispatch => {

        Product.getProductList()
        .then(response =>

            getProductListRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getProductListRes(dispatch, response) {
   
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_PRODUCT_LIST',
                payload: response.data.product
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
