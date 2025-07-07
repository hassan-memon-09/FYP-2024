import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from './Firebaseconfig';


function Header({ isLoggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Call the onLogout function passed from the parent component
      navigate("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <NavLink to="/" onClick={closeMenu}>
            OptiDiognostic
          </NavLink>
        </h1>
        <nav
          id="navbar"
          className={`navbar order-last order-lg-0 ${
            isOpen ? "navbar-mobile" : ""
          }`}
        >
          <ul>
            <li>
              <NavLink
                to="/home"
                className="nav-link scrollto"
                activeClassName="active"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="nav-link scrollto"
                activeClassName="active"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="nav-link scrollto"
                activeClassName="active"
                onClick={closeMenu}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/screening"
                className="nav-link scrollto"
                activeClassName="active"
                onClick={closeMenu}
              >
                Screening
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className="nav-link scrollto"
                activeClassName="active"
                onClick={closeMenu}
              >
                History
              </NavLink>
            </li>
          </ul>
        </nav>
        <FontAwesomeIcon 
  icon={faList} 
  className="mobile-nav-toggle" 
  onClick={toggleMenu} 
  style={{ width: '30px', height: '30px', marginLeft: '10px'}}
/>
        {/* Logout Button */}
        {isLoggedIn && (
          <div className="ml-auto" style={{ marginLeft: '10px' }}>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
