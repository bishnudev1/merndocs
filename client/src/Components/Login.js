import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {

  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData = async (e) => {
    e.preventDefault();

    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await response.json();
    console.log(response.status);

    if (response.status === 422) {
      window.alert("Wrong user details!");
    }
    else if (response.status === 201 || data) {
      dispatch({ type: "USER", payload: true });
      window.alert("Login successfull");
      navigate('/');
    }

  }

  return (
    <div className='flex-center'>
      <form className='flex-column' method='POST'>
        <h1 style={{ "textAlign": "center", "marginBottom": "25px" }}>Sign In</h1>
        <label>Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='text' placeholder='Enter your email...' />
        <label>Password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='text' placeholder='Enter your password...' />
        <button onClick={loginData} className='submit-button'>Login</button>
        <p style={{ "textAlign": "center", "marginBlock": "3px" }}>Don't have a Developer Account ?</p><Link className='submit-button' to='/Register'>Sign Up</Link>
      </form>
    </div>
  )
}

export default Login