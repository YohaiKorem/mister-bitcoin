import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export class StatisticsPage extends Component {
  state = {
    marketPriceData: null,
    confirmedTransactionsData: null,
  }

  async componentDidMount() {
    let marketPriceData = await bitcoinService.getMarketPrice()
    // let marketPrice = marketPriceData.values
    // marketPrice = marketPrice.map((value) => value.y)
    this.setState({ marketPriceData })

    let confirmedTransactionsData =
      await bitcoinService.getConfirmedTransactions()
    // let confirmedTransactions = confirmedTransactionsData.values
    // confirmedTransactions = confirmedTransactions.map((value) => value.y)
    this.setState({ confirmedTransactionsData })
  }

  render() {
    return (
      <main className="statistics-page main">
        <div className="btns-container flex space-between">
          <button className="btn btn-purple">Confirmed transactions</button>
          <button className="btn btn-purple">Market price</button>
        </div>
        <Chart data={this.state.marketPriceData} />
        <Chart data={this.state.confirmedTransactionsData} />
      </main>
    )
  }
}
