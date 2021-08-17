import React from 'react'
import logo from  "./../../logo.svg"
import "./NavBar.css"
const NavBar = () => {
    return (
        <nav className="navbar__container">
           <div className="navbar__left">
               <img src={logo} alt="brand name"/>
           </div>
           <ul className="navbar__right">
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
           </ul>
        </nav>
    )
}

export default NavBar
