import { userService } from '../../services/user.service'

const INITIAL_STATE = {
  loggedInUser: userService.getLoggedinUser(),
}

export async function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'SPEND_BALANCE': {
      state = await state
      const { loggedInUser } = state
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          coins: await userService.changeBalance(-action.amount),
        },
      }
    }
    case 'login': {
      const { userCred } = action
      const user = await userService.login(userCred)
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
