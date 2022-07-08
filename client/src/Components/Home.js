import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [user, Setuser] = useState([]);

  const [show, setShow] = useState(false);

  const getData = async () => {
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
    setShow(true);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='flex-center flex-column-only'>
      {console.log(user.name)}
      {
        user.name === ''
          ?
          <h1>Login First Developer</h1>
          :
          <div style={{ "margin": "auto", "textAlign": "center" }}>
            <h3>Welcome <span className='text-span-color'>{user.name}</span></h3>
            <h2>{show ? 'Happy to see you back' : "We are the Developers"}</h2>
            <br></br>
            {
              show ? <Link className='home-dashboard-button' to='/About'>Check your Dashboard</Link> : null
            }
          </div>
      }
    </div>
  )
}

export default Home