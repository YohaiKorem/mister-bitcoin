import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'

function _TransferFunds(props) {
  let { contact, maxCoins, onTransferCoins } = props
  const [transferAmount, setTransferAmount] = useState(0)

  const handleChange = (ev) => {
    const { value } = ev.target
    setTransferAmount(+value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (transferAmount > maxCoins || transferAmount <= 0) return
    onTransferCoins(transferAmount)
    userService.addMove(contact, transferAmount)
  }

  return (
    <section className="transfer-funds">
      <form onSubmit={handleSubmit} className="transfer-form">
        <input type="text" onChange={handleChange} />
        <button className="btn btn-purple">Transfer</button>
      </form>
    </section>
  )
}
const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
})

export const TransferFunds = connect(mapStateToProps)(
  withRouter(_TransferFunds)
)
