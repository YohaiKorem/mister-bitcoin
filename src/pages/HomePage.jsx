import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { MovesList } from '../cmps/MovesList'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function HomePage() {
  const [rate, setRate] = useState(null)
  const user = useSelector((state) => state.userModule.loggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadUserAndRate = async () => {
      const userRate = await bitcoinService.getRate(user.coins)
      setRate(userRate)
    }
    loadUserAndRate()
  }, [])

  if (!user) return <div className="page-loading-screen ">loading</div>

  return (
    <main className="home-page main-layout">
      <h1>Hello {user.name}</h1>
      <h3>Coins: {user.coins}</h3>
      <h3>BTC: {rate}</h3>
      {user.moves && (
        <MovesList moves={user.moves.slice(0, 3)} title={'Recent moves'} />
      )}
    </main>
  )
}
