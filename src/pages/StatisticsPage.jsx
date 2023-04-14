import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export class StatisticsPage extends Component {
  state = {
    marketPriceData: null,
    confirmedTransactionsData: null,
    isShowTransactions: false,
    isShowMarketPrice: true,
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

  toggleChartDisplay = () => {
    let { isShowTransactions, isShowMarketPrice } = this.state
    isShowTransactions = !isShowTransactions

    isShowMarketPrice = !isShowMarketPrice
    this.setState({ isShowMarketPrice, isShowTransactions })
  }

  showTransactions = () => {
    let { isShowTransactions } = this.state
    isShowTransactions = !isShowTransactions
    this.setState({ isShowTransactions }, () => {})
  }
  showMarketPrice = () => {
    let { isShowMarketPrice } = this.state
    isShowMarketPrice = !isShowMarketPrice
    this.setState({ isShowMarketPrice })
  }

  render() {
    const { isShowTransactions, isShowMarketPrice } = this.state
    return (
      <main className="statistics-page main">
        <div className="btns-container flex space-between">
          {!isShowMarketPrice && (
            <button
              className="btn btn-purple"
              onClick={() => this.toggleChartDisplay()}>
              Market price
            </button>
          )}
          {!isShowTransactions && (
            <button
              className="btn btn-purple"
              onClick={() => this.toggleChartDisplay()}>
              Confirmed transactions
            </button>
          )}
        </div>
        {isShowMarketPrice && <Chart data={this.state.marketPriceData} />}
        {isShowTransactions && (
          <Chart data={this.state.confirmedTransactionsData} />
        )}
      </main>
    )
  }
}
