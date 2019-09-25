import axios from 'axios';
import {baseUrl} from './Urls'

export const menuList = () => {
    return axios.get(`${baseUrl}/api/getAdminMenu`)
    .catch(err => console.log(err));
}

export const Master = {

    saveCity: (url, City) => {
        return axios.post(url, City)
        .catch(err => console.log(err));
    },

    deleteCity: (id) => {
        return axios.delete(`${baseUrl}/api/deleteCity/${id}`)
        .catch(err => console.log(err));
    },

    getCityById: (id) => {
        return axios.get(`${baseUrl}/api/getCityById/${id}`)
        .catch(err => console.log(err));
    },

    getCityList: () => {
        return axios.get(`${baseUrl}/api/getCity`)
        .catch(err => console.log(err));
    }
    
}

export const PermissionService = {

    getPermissionList: (id) => {
        return axios.get(`${baseUrl}/api/getTeacherPermissionList/${id}`)
        .catch(err => console.log(err));
    },

    savePermission: (id, Data) => {
        return axios.post(`${baseUrl}/api/SaveTeacherPermission/${id}`, Data)
        .catch(err => console.log(err));
    },

}

export const categoryCall = {
    getCategoryById: (id) => {
        return axios.get(`${baseUrl}/api/getCategoryById/${id}`)
        .catch(err => console.log(err));
    },

    getCategoryList: () => {
        return axios.get(`${baseUrl}/api/getCategoryList`)
        .catch(err => console.log(err));
    },

    saveCategory: (data, isUpdate, id) => {
        let url = `${baseUrl}/api/SaveCategory`;

        if(isUpdate){
            url = `${baseUrl}/api/updateCategoryById/${id}`;
        }

        return axios.post(url, data)
        .catch(err => console.log(err));
    },

    deleteCategoryById: (id) => {
        return axios.delete(`${baseUrl}/api/deleteCategory/${id}`)
        .catch(err => console.log(err));
    },

    getCategoryDrop: (id) => {
        return axios.get(`${baseUrl}/api/getCategoryDrop/${id}`)
        .catch(err => console.log(err));
    }

}

export const Product = {
    getDetail: (id) => {
        return axios.get(`${baseUrl}/api/getProductById/${id}`)
        .catch(err => console.log(err));
    },

    getProductList: () => {
        return axios.get(`${baseUrl}/api/getProductList`)
        .catch(err => console.log(err));
    },

    saveProduct: (data, isUpdate, id) => {
        let url = `${baseUrl}/api/SaveProduct`;

        if(isUpdate){
            url = `${baseUrl}/api/updateProductById/${id}`;
        }

        return axios.post(url, data)
        .catch(err => console.log(err));
    },

    deleteProductById: (id) => {
        return axios.delete(`${baseUrl}/api/deleteProduct/${id}`)
        .catch(err => console.log(err));
    },
}

export const PriseRevise = {

    getDetail: (id) => {
        return axios.get(`${baseUrl}/api/getProductByIdForPriceRevise/${id}`)
        .catch(err => console.log(err));
    },

    getProductList: () => {
        return axios.get(`${baseUrl}/api/getPriceReviseList`)
        .catch(err => console.log(err));
    },

    saveProduct: (data, id) => {
    
        let url = `${baseUrl}/api/reviseProductPriseById/${id}`;
      
        return axios.post(url, data)
        .catch(err => console.log(err));
    },

  
}
