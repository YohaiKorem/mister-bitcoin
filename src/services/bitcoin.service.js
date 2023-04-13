import Axios from 'axios'
import { storageService } from './storage.service'
export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
}
async function getRate(coins) {
  const KEY = 'rate'
  const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`

  try {
    return await getData(url, KEY)
  } catch (err) {
    console.log(err, `could not fetch ${KEY}`)
  }
}
async function getMarketPrice() {
  const KEY = 'market-price'
  const url = `https://api.blockchain.info/charts/market-price?timespan=5days&format=json&cors=true`

  try {
    return await getData(url, KEY)
  } catch (err) {
    console.log(err, `could not fetch ${KEY}`)
  }
}

async function getConfirmedTransactions() {
  const KEY = 'confirmed-transactions'
  const url =
    'https://api.blockchain.info/charts/trade-volume?timespan=5days&format=json&cors=true'

  try {
    return await getData(url, KEY)
  } catch (err) {
    console.log(err, `could not fetch ${KEY}`)
  }
}

async function getData(url, KEY) {
  let res = storageService.load(KEY)
  if (res || res?.length) {
    return res
  }
  try {
    res = await Axios(url)
    storageService.store(KEY, res.data)
    return res.data
  } catch (err) {
    console.log(err, 'could not fetch data')
  }
}
