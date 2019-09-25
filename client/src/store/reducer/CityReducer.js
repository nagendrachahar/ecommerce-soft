const INITIAL_STATE = {
    isCityFormShow: false,
    cityloading:true,
    cityDetail:'',
    cityList:[]
}

export default (states = INITIAL_STATE, action) => {
    
  switch (action.type) {

        case 'UPDATE_CITY_DETAIL':
          return ({
              ...states,
              cityDetail: action.payload
          });

        case 'UPDATE_CITY_LIST':
            return ({
                ...states,
                cityList: action.payload,
                cityloading:false
            });

        case 'SHOW_HIDE_City_FORM':
            return({
                ...states,
                isCityFormShow:action.payload
            });

        default:
          return states;

  }
}
