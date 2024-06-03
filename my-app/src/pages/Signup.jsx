import React, { useState ,  } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const navigate = useNavigate()

    const[username,setUsername] = useState('');
    const [password,setPassword] = useState('');


    const handleClick =()=>{
        if (!username || !password) {
            alert('Both email and password are required!');
            return;
          }

            axios.post("http://localhost:3001/signup",{
                username:username,password:password
            })
            .then(res =>{
                alert(res.data);
                navigate('/login')
            })
        

        setPassword("");
        setUsername("")
    }

   
  return (
    <>
    <div className='container'>
        <label>username  </label>
        <input type='name' placeholder='email' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <label>password  </label>
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
    <br/>
        <button type='button' onClick={handleClick}> Sign Up</button>
    </div>
    </>
    )
}

export default Signup