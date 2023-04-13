import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { Component } from 'react'
export class HomePage extends Component {
  state = {
    rate: null,
    user: null,
  }

  async componentDidMount() {
    const user = userService.getLoggedinUser()
    let rate = await bitcoinService.getRate(user.coins)
    this.setState({ rate, user })
  }

  render() {
    const { user, rate } = this.state
    if (!user) return <div>loading</div>
    return (
      <main className="home-page main-layout">
        <h1>Hello {user.name}</h1>
        <h3>Coins: {user.coins}</h3>
        <h3>BTC: {rate}</h3>
      </main>
    )
  }
}
