import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { memo } from 'react'

export const TransferFunds = memo((props) => {
  let { contact, maxCoins, onTransferCoins } = props
  const [transferAmount, setTransferAmount] = useState(0)
  const navigate = useNavigate()
  const handleChange = (ev) => {
    const { value } = ev.target
    setTransferAmount(+value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (transferAmount > maxCoins || transferAmount <= 0) return
    onTransferCoins(transferAmount, contact)
    // navigate('/contact')
  }

  return (
    <section className="transfer-funds">
      <form onSubmit={handleSubmit} className="transfer-form">
        <input type="text" onChange={handleChange} />
        <button className="btn btn-purple">Transfer</button>
      </form>
    </section>
  )
})
