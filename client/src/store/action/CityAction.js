import {Master} from '../../Services/master.js'

export function getCityDetail(id) {
  
    return dispatch => {

        Master.getCityById(id)
        .then(response =>

            getCityDetailRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getCityDetailRes(dispatch, response) {
    
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_CITY_DETAIL',
                payload: response.data.city
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

export function getCityList() {
  
    return dispatch => {

        Master.getCityList()
        .then(response =>

            getCityListRes(dispatch, response)

        ).catch(err => console.log(err));
    }
}

function getCityListRes(dispatch, response) {
   
    try {
       if(response.data.resType === 'success'){

            return dispatch({
                type: 'UPDATE_CITY_LIST',
                payload: response.data.city
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
            type: 'SHOW_HIDE_City_FORM',
            payload: data
        })
    }
}




