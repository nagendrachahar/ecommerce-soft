const INITIAL_STATE = {
    categoryLoading:true,
    categoryDetail:'',
    categoryList:[]
}

export default (states = INITIAL_STATE, action) => {
    
  switch (action.type) {

        case 'UPDATE_CATEGORY_DETAIL':
          return ({
              ...states,
              categoryDetail: action.payload
          });

        case 'UPDATE_CATEGORY_LIST':
            return ({
                ...states,
                categoryList: action.payload,
                categoryLoading: false
            });


        default:
          return states;

  }
}
