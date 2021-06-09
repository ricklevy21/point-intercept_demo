//dependencies
import React from 'react'
import { Link } from 'react-router-dom'
// import LoginButton from '../UserAuth/LoginButton'
// import LogoutButton from '../UserAuth/LogoutButton'

//assets
import logo from "./p-i_logo.png"

const Navbar = () => {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-white">
  <div className="navbar-brand">
    <img
    src={logo}
    width="30"
    height="30"
    alt="logo"
    loading="lazy"
    />
  </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link" >home </Link>
      </li>
      <li className="nav-item">
        <Link to="/projects" className="nav-link" >projects</Link>
      </li>
      <li className="nav-item">
        <Link to="/create" className="nav-link" >create project</Link>
      </li>
      <li className="nav-item">
        <Link to="/sync" className="nav-link" >sync</Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link" >about</Link>
      </li>
      {/* <li className="nav-item">
        <LoginButton />
      </li>
      <li className="nav-item">
        <LogoutButton />
      </li> */}
    </ul>
  </div>
</nav>

        )
}

export default Navbar