import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { AuthContext } from '../Context/AuthContext'
import axios from "axios";

const Profile = () => {
  const {user,dispatch} = useContext(AuthContext);
  const [email,setusername] = useState();


  const handleLogout =() =>{

    dispatch({
      type:"LOGOUT"
    })

  }

  const getUser = async() =>{

    axios.defaults.headers.common["Authorization"] = user;


    axios.get("http://localhost:3001/profile")
    .then(res =>{
      setusername(res.data)
      
    }).catch(error=>{
      console.log(error);
    })

  }

      useEffect(() =>{
      getUser();
      },[])

  return (
    <>
    <div className='container-name'>
    <div className='name'>
      {email && email}
      </div>

      <button onClick={handleLogout}> LogOut</button>
      </div>
    </>
  )
}

export default Profile