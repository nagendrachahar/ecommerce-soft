import axios from 'axios';

export const login = (formData) => {

    return axios.post(`${process.env.PUBLIC_URL}/api/checkLogin`, formData)
    .catch(err => console.log(err));
  
}
