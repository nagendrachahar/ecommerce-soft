import axios from 'axios';

export const Profile = {

    getDetail: () => {
        return axios.get(`${process.env.PUBLIC_URL}/api/getSellerDetail`)
        .catch(err => console.log(err));
    },

    updateDetail: (data) => {
        return axios.post(`${process.env.PUBLIC_URL}/api/updateSellerProfile`, data)
        .catch(err => console.log(err));
    }
    
}

