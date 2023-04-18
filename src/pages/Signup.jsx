import React, { Component } from 'react'
import { userService } from '../services/user.service'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, signup, logout } from '../store/actions/user.actions'
import { useNavigate } from 'react-router-dom'
export function Signup(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loggedinUser = userService.getLoggedinUser()
  const [isLoginClicked, setLoginClicked] = useState(true)
  const [isSignupClicked, setSignupClicked] = useState(false)
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  })
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    name: '',
    password: '',
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(credentials))
      setLoginClicked(false)

      // Redirect to board page
    } catch (err) {
      console.log('Cannot login', err)
    } finally {
      navigate('/')
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      await dispatch(signup(signupInfo))
      setSignupClicked(false)
    } catch (err) {
      console.log('Cannot signup', err)
    } finally {
      setTimeout(() => {
        navigate('/')
      }, 100)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleCallback = async (response) => {
    const { name, password } = response
    const userCred = {
      name,
      name,
      password,
    }
    try {
      await dispatch(login(userCred))
      setLoginClicked(false)
    } catch (err) {
      try {
        await dispatch(signup(userCred))
      } catch (err) {
        console.log('Cannot signup', err)
      }
    }
  }

  const handleToggleForm = () => {
    setSignupClicked((prevIsSignupClicked) => !prevIsSignupClicked)
    setLoginClicked((prevIsLoginClicked) => !prevIsLoginClicked)
  }

  return (
    <section className="login-signup">
      {!loggedinUser && isLoginClicked && (
        <article className="login-form flex column">
          <h2>Log in to Mister-bitcoin</h2>
          <form onSubmit={handleLogin} className="flex column align-center">
            <input
              type="text"
              value={credentials.name}
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              placeholder="Enter name"
            />
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter password"
            />
            <button className="btn btn-purple" type="submit">
              Log in
            </button>
          </form>

          <div className="flex column align-center status">
            <p className="seperator">OR</p>
            <p
              className="toggle-status btn btn-purple"
              onClick={handleToggleForm}>
              Sign up for an account
            </p>
          </div>
        </article>
      )}

      {!loggedinUser && isSignupClicked && (
        <article className="login-form flex column">
          <h2>Signup to Mister-bitcoin</h2>
          <form onSubmit={handleSignup} className="flex column align-center">
            <input
              type="text"
              value={signupInfo.name}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, name: e.target.value })
              }
              placeholder="Full name"
            />
            <input
              type="text"
              value={signupInfo.name}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, name: e.target.value })
              }
              placeholder="Username"
            />
            <input
              type="password"
              value={signupInfo.password}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, password: e.target.value })
              }
              placeholder="Password"
            />

            <button className="btn btn-purple btn-login" type="submit">
              Signup
            </button>
          </form>
          <div className="flex column status">
            <p className="seperator">Already have an account?</p>
            <p
              className="toggle-status btn btn-purple"
              onClick={handleToggleForm}>
              Log in
            </p>
          </div>
        </article>
      )}

      {loggedinUser && (
        <article className="login-form logout flex column">
          <h2>You are connected as:</h2>
          <div className="flex gap align-center">
            <div className="member-img"></div>
            <p className="fs16">{loggedinUser.name}</p>
          </div>
          <button className="btn btn-red" onClick={handleLogout}>
            Logout
          </button>
        </article>
      )}
    </section>
  )
}
