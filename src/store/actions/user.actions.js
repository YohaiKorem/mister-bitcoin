import { userService } from '../../services/user.service'

export function spendBalance(amount, contact) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.changeBalance(amount, contact)
      dispatch({ type: 'SPEND_BALANCE', user })
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function login(userCred) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.login(userCred)
      dispatch({ type: 'login', user })
    } catch (error) {
      console.log(error, 'login failed')
    }
  }
}
export function signup(signupInfo) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.signup(signupInfo)
      dispatch({ type: 'signup', user })
    } catch (error) {
      console.log(error, 'signup failed')
    }
  }
}
export function logout() {
  return async (dispatch, getState) => {
    try {
      userService.logout()

      dispatch({ type: 'logout' })
    } catch (error) {
      console.log(error, 'logout failed')
    }
  }
}
