import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'
// import { storageService } from './storage.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

// const demoUser = {
//   name: 'Yohai Korem',
//   coins: 100,
//   moves: [],
// }

// saveLocalUser(demoUser)
export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  addMove,
  changeBalance,
}

window.userService = userService

function getUsers() {
  return storageService.query('user')
  // return httpService.get(`user`)
}

function onUserUpdate(user) {}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  // const user = await httpService.get(`user/${userId}`)

  // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}
function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // const user = await storageService.get('user', _id)

  await storageService.put('user', user)

  // user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const user = await httpService.post('auth/login', userCred)

  const users = await getUsers()

  const user = users.filter((u) => userCred.name === u.name)
  if (user) {
    // socketService.login(user._id)
    return saveLocalUser(user)
  } else return null
}
async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  let user = { ...userCred, coins: 100, moves: [] }

  user = await storageService.post('user', user)
  console.log('user in signup from async storage', user)
  // const user = await httpService.post('auth/signup', userCred)
  // socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  // return await httpService.post('auth/logout')
}

async function addMove(contact, amount) {
  const user = getLoggedinUser()
  const move = {
    id: utilService.makeId(),
    amount,
    to: contact,
    at: Date.now(),
  }
  user.moves.push(move)
  await update(user)

  return move
}

async function changeBalance(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.coins = user.coins + by || by
  await update(user)
  return user.coins
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    name: user.name,
    imgUrl: user.imgUrl,
    coins: user.coins,
    moves: user.moves,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
