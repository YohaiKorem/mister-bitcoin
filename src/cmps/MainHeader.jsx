import React, { Component } from 'react'

import logo from '../assets/imgs/mister-bitcoin-logo1.png'
import { Link, NavLink, withRouter } from 'react-router-dom'
class _MainHeader extends Component {
  state = {
    isMenuOpen: false,
  }
  toggleMenu = () => {
    let { isMenuOpen } = this.state
    isMenuOpen = !isMenuOpen
    this.setState({ isMenuOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ isMenuOpen: false })
    }
  }

  render() {
    const { isMenuOpen } = this.state
    const navClass = isMenuOpen ? ' open' : ''
    return (
      <>
        <header className="main-header flex space-between full">
          <NavLink to="/">
            <div className="logo ">
              <img src={logo} />
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
            onClick={() => this.toggleMenu()}></i>
        </header>
        <div
          onClick={() => this.toggleMenu()}
          className={`overlay ${navClass}`}></div>
      </>
    )
  }
}
export const MainHeader = withRouter(_MainHeader)
