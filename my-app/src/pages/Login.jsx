import React from 'react'
import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Login = () => {
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async() =>{
        if(!username || !password){
            alert("username and password both are reqired")
        }
        const response = await axios.post("http://localhost:3001/login",{
            
            username:username, password:password
        });

        dispatch({
            type:"LOGIN",
            payload:response.data.token
        });

        localStorage.setItem('token',response.data.token)

        navigate("/profile")

    }
  return (
    <>
    <div className='container' >
        <label >Username</label>
        <input type='text' placeholder='email' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <label>password</label>
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button type='button' onClick={handleLogin}> Log In</button>
    </div>
    </>
  )
}

export default Login