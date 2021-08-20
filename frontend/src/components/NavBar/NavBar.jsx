import React from 'react'
import { Link } from 'react-router-dom'
import logo from  "./../../logo.svg"
import "./NavBar.css"
const NavBar = () => {
    return (
        <nav className="navbar__container">
           <div className="navbar__left">
               <img src={logo} alt="brand name"/>
           </div>
           <ul className="navbar__right">
            
            <li> <Link to="/">CARD VIEW</Link> </li>
            <li> <Link to="/g">GRAPH VIEW</Link></li>
            <li> <Link to="/contact">CONTACT</Link></li>
           </ul>
        </nav>
    )
}

export default NavBar
