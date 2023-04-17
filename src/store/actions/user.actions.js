export function spendBalance(amount) {
  console.log('amount:', amount)
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SPEND_BALANCE', amount })
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function login(userCred) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'login', userCred })
    } catch (error) {
      console.log(error, 'login failed')
    }
  }
}
export function signup(signupInfo) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'signup', signupInfo })
    } catch (error) {
      console.log(error, 'signup failed')
    }
  }
}
export function logout() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'logout' })
    } catch (error) {
      console.log(error, 'logout failed')
    }
  }
}
