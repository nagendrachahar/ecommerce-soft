const INITIAL_STATE = {
    productLoading:true,
    productDetail:'',
    productList:[]
}

export default (states = INITIAL_STATE, action) => {
    
  switch (action.type) {

    case 'UPDATE_PRODUCT_DETAIL':
      return ({
          ...states,
          productDetail: action.payload
      });

    case 'UPDATE_PRODUCT_LIST':
      return ({
          ...states,
          productList: action.payload,
          productLoading: false
      });

    default:
      return states;

  }
}
