import React from "react";
import logo from "../../assets/images/logo.svg";
import "../Navbar/Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-image'>
        <img src={logo} alt='Logo' />
      </div>
      <div className='navbar-wrapper'>
        <ul className='navbar-list'>
          <li className='navbar-item'>
            <NavLink to='/'>Ana səhifə</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/about'>Haqqında</NavLink>
          </li>
          <li className='navbar-item'>
            <NavLink to='/products'>Məhsullar</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
