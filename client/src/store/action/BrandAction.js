import axios from 'axios';

export function getBrandDetail(id) {
  
    return dispatch => {

        axios.get(`${process.env.PUBLIC_URL}/api/getBrandById/${id}`)
        .then(response =>

            getBrandDetailRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getBrandDetailRes(dispatch, response) {
    
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_BRAND_DETAIL',
                payload: response.data.brand
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

export function getBrandList() {
  
    return dispatch => {

        axios.get(`${process.env.PUBLIC_URL}/api/getBrand`)
        .then(response =>

            getBrandListRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getBrandListRes(dispatch, response) {
   
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_BRAND_LIST',
                payload: response.data.brand
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

export function showHideForm(data) {
  
    return dispatch => {

        return dispatch({
            type: 'SHOW_HIDE_FORM',
            payload: data
        })
    }
}




