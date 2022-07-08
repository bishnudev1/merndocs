import React, { createContext, useReducer } from 'react'
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Register';
import Login from './Components/Login';
import Contact from './Components/Contact';
import './App.css';
import ErrorPage from './Components/ErrorPage ';
import Logout from './Components/Logout';
import {initialState,reducer} from '../src/useReducer/Reducer';

export const UserContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}


export default App