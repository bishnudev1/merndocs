import React, { useEffect,useState } from 'react'
import Image from '../Images/DP.png';
import { useNavigate } from 'react-router-dom';

const About = () => {

  const [user,Setuser] = useState([]);

  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch('/About', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      Setuser(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log("The error is : ", error);
      alert("Login First...");
      navigate('/Login');
    }
  }

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='main-about-container'>
      <div className='sub-container'>
        <div className='social-container flex-center-center-column'>
          <img className='about-dp' src={Image} alt='bishnu' />
          <ul>
            <li>Developer</li>
            <li>Student</li>
            <li>Editor</li>
            <li>Influencer</li>
            <li>Gamer</li>
          </ul>
        </div>
        <div className='head-about-container flex-center-center-column'>
          <h3>{user.name}</h3>
          <p>Web Developer</p>
          <div className='user-details'>
            <p><span className='userdetails-head-text'>User ID</span> : {user._id}</p>
            <p><span className='userdetails-head-text'>Name</span> : {user.name}</p>
            <p><span className='userdetails-head-text'>Email</span> : {user.email}</p>
            <p><span className='userdetails-head-text'>Phone</span> : {user.number}</p>
            <p><span className='userdetails-head-text'>Profession</span> : {user.profession}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About