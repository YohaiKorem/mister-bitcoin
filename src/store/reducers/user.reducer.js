import { userService } from '../../services/user.service'

const INITIAL_STATE = {
  loggedInUser: userService.getLoggedinUser(),
}

export async function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'SPEND_BALANCE':
      const { loggedInUser } = state
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          balance: loggedInUser.balance - action.amount,
        },
      }
    case 'login': {
      const { userCred } = action
      const user = await userService.login(userCred)
      console.log(user)
      return user
    }
    case 'logout':
      userService.logout()
      return { ...state, loggedInUser: null }
    case 'signup': {
      const { signupInfo } = action
      const user = await userService.signup(signupInfo)
      return user
    }
    default:
      return state
  }
}
