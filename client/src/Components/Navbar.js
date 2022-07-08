import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)

  const RenderNavBar = () => {
    console.log(state);
    if (state) {
      return (
        <>
          <li class="nav-item">
            <Link class="nav-link" aria-current="page" to='/'>Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/About' >About</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/Contact' >Contact</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/Logout' >Logout</Link>
          </li>
        </>
      )
    }
    else {
      return (
        <>
          <li class="nav-item">
            <Link class="nav-link" aria-current="page" to='/'>Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/About' >About</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/Contact' >Contact</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/Login' >Login</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to='/Register' >Registration</Link>
          </li>
        </>
      )
    }
  }

  return (
    <>
      <nav class="z-index navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to='/'>Developers World</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
              <RenderNavBar />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar