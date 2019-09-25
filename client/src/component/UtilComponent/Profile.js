import React, {useState} from 'react';
import { Link } from 'react-router-dom'

export const ProfileIconCompanent = ({icon, title, Url}) => {

  const[show, setShow] = useState(false)

  const logOut=() => {
    localStorage.clear();
    window.location.href = "/Login";
  };

  return (
    <div className="profile_icon_con">
      <i onClick={()=> setShow(!show)} className="fas fa-user" style={{fontSize: "25px", padding: "10px"}}></i>
      {show ? <div className="profile_component_con">
        <Link to="/SellerProfile">Profile</Link>
        <span onClick={logOut}>Logout</span>
      </div>: null}
    </div>
  )
}
