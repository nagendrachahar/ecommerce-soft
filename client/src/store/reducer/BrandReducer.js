const INITIAL_STATE = {
    brandloading: true,
    brandDetail: '',
    brandList: []
}

export default (states = INITIAL_STATE, action) => {
    
  switch (action.type) {

        case 'UPDATE_BRAND_DETAIL':
          return ({
              ...states,
              brandDetail: action.payload
          });

        case 'UPDATE_BRAND_LIST':
            return ({
                ...states,
                brandList: action.payload,
                brandloading: false
            });

        default:
          return states;

  }
}
