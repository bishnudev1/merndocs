import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');

  const registerData = async (e) => {
    e.preventDefault();

    const response = await fetch('/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, email, number, profession, password, c_password
      })
    });

    const data = response.json();

    if (response.status === 422 || !data) {
      window.alert("Can't registered user!");
    }
    else {
      window.alert("Registration successfull");
      navigate('/Login');
    }
  }


  return (
    <div className='flex-center'>
      <form className='flex-column' method='POST'>
        <h1 style={{ "textAlign": "center", "marginBottom": "25px" }}>Sign Up</h1>
        <label>Name</label>
        <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter your name...' />
        <label>Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='text' placeholder='Enter your email...' />
        <label>Phone</label>
        <input value={number} onChange={(e) => { setNumber(e.target.value) }} type='text' placeholder='Enter your phone number...' />
        <label>Profession</label>
        <input value={profession} onChange={(e) => { setProfession(e.target.value) }} type='text' placeholder='Enter your work/job/profession...' />
        <label>Password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='text' placeholder='Enter your password...' />
        <label>Confirm Password</label>
        <input value={c_password} onChange={(e) => { setC_password(e.target.value) }} type='text' placeholder='Again type your password...' />
        <button className='submit-button' onClick={registerData}>Register</button>
        <p style={{"textAlign":"center","marginBlock":"3px"}}>Already have a Developer Account ?</p><Link className='submit-button' to='/Login'>Sign In</Link>
      </form>
    </div>
  )
}

export default Register