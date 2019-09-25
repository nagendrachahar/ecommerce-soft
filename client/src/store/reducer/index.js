import { combineReducers } from 'redux';
import StateReducer from './StateReducer';
import CityReducer from './CityReducer';
import MessageReducer from './MessageReducer';
import PermissionReducer from './PermissionReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import BrandReducer from './BrandReducer';

export default combineReducers({
    stateReducer: StateReducer, 
    cityReducer: CityReducer, 
    messageReducer: MessageReducer, 
    permissionReducer: PermissionReducer, 
    categoryReducer: CategoryReducer, 
    productReducer: ProductReducer, 
    brandReducer: BrandReducer
});
