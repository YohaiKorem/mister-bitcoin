import { userService } from '../../services/user.service'

const INITIAL_STATE = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'SPEND_BALANCE': {
      const { loggedInUser } = state
      const { user } = action
      console.log(user.coins)
      return {
        ...state,
        loggedInUser: { ...user },
      }
    }
    case 'login': {
      const { user } = action

      return { ...state, user }
    }
    case 'logout':
      return { ...state, loggedInUser: null }
    case 'signup': {
      const { user } = action

      return { ...state, user }
    }
    default:
      return state
  }
}
