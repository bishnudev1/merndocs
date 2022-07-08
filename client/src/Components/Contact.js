import React, { useState } from 'react'

const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [feedback, setFeedback] = useState('');
  // const [ contactData, setContactData ] = useState([]);

  const getContactData = async (e) => {
    e.preventDefault();

    const sendResp = await fetch('/Contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name, email, profession, feedback
      })
    });

    const isSent = await sendResp.json();

    if (isSent.status === 422 || !isSent) {
      alert('Could not submit responses');
    }
    else {
      alert('Feedback submission successfully');
      console.log(isSent);
    }

  }

  return (
    <div className='flex-center'>
      <form className='flex-column' method='POST'>
        <h1 style={{ "textAlign": "center", "marginBottom": "25px" }}>Contact Us</h1>
        <label>Name</label>
        <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Enter your name...' />
        <label>Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Enter your email...' />
        <label>Profession</label>
        <input value={profession} onChange={(e) => { setProfession(e.target.value) }} type='text' placeholder='Enter your work/job/profession...' />
        <label>Your Query</label>
        <textarea value={feedback} onChange={(e) => { setFeedback(e.target.value) }} placeholder='How can I help you...?' />
        <button onClick={getContactData} className='submit-button'>Submit</button>
      </form>
    </div>
  )
}

export default Contact