import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logo from '../assets/imgs/mister-bitcoin-logo1.png'

export function MainHeader(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const params = useParams

  useEffect(() => {
    setIsMenuOpen(false)
  }, [params])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navClass = isMenuOpen ? ' open' : ''

  return (
    <>
      <header className="main-header flex space-between full">
        <NavLink to="/">
          <div className="logo ">
            <img src={logo} alt="Logo" />
          </div>
        </NavLink>
        <nav className={`main-nav ${navClass}`}>
          <ul className="flex space-between ">
            <li>
              <NavLink to="/">
                <i className="fa-solid fa-house"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <i className="fa-regular fa-address-book"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/statistics">
                <i className="fa-solid fa-chart-simple"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <i className="fa-solid fa-right-to-bracket"></i>
              </NavLink>
            </li>
          </ul>
        </nav>
        <i
          className="fa-solid fa-bars mobile-menu-btn"
          onClick={toggleMenu}></i>
      </header>
      <div onClick={toggleMenu} className={`overlay ${navClass}`}></div>
    </>
  )
}
