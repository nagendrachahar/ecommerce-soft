import axios from 'axios';
//import { Link } from 'react-router-dom';

export const CheckSession = (props) => {
    
  axios.get(`${process.env.PUBLIC_URL}/api/checkSession`)
  .then(res => {
     
    if(res.data.resType !== 'success'){
      localStorage.removeItem('x-token');
      props.history.push('/Login');
    }

  }).catch(err => console.log(err));

}

export const SellerSession = (props) => {
    
  axios.get(`${process.env.PUBLIC_URL}/api/checkSellerSession`)
  .then(res => {
     
    if(res.data.resType !== 'success'){
      localStorage.removeItem('x-token');
      props.history.push('/Login');
    }

  }).catch(err => console.log(err));

}
