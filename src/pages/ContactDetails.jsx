import { Component } from 'react'
import { eventBus } from '../services/event-bus.service'
import { contactService } from '../services/contact.service'
import defaultImg from '../assets/imgs/defaultUserImg.jpg'
import { SubNav } from '../cmps/SubNav'
import { Link } from 'react-router-dom'
import { TransferFunds } from '../cmps/TransferFunds'
import { MovesList } from '../cmps/MovesList'
import { userService } from '../services/user.service'
import { spendBalance } from '../store/actions/user.actions'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
export function ContactDetails({ match }) {
  const dispatch = useDispatch()

  const [contact, setContact] = useState(null)
  const [user, setUser] = useState(userService.getLoggedinUser())

  useEffect(() => {
    loadContact()
  }, [match.params.id])

  const loadContact = async () => {
    try {
      const contact = await contactService.getContactById(match.params.id)
      setContact(contact)
    } catch (err) {
      console.log(err)
    }
  }

  const onTransferCoins = async (amount) => {
    dispatch(spendBalance(amount))
    // try {
    //   const user = await dispatch(spendBalance(amount))
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const contactMoves = () => {
    return user.moves.filter((move) => move.to._id === contact._id)
  }
  if (!contact) return <div>Loading...</div>

  return (
    <section className="contact-details">
      <nav className="sub-nav">
        <Link to={`/contact/edit/${contact._id}`} className="btn btn-purple">
          Edit
        </Link>
        <Link to={`/contact`} className="btn btn-purple">
          back
        </Link>
      </nav>{' '}
      <img src={contact.imgUrl ? contact.imgUrl : defaultImg} />
      <h2 className="contact-name"> {contact.name}</h2>
      <h3 className="contact-phone"> {contact.phone}</h3>
      <h3 className="contact-email"> {contact.email}</h3>
      <TransferFunds
        contact={contact}
        maxcCoins={user.coins}
        onTransferCoins={(amount) => onTransferCoins(amount)}
      />
      <MovesList
        moves={contactMoves()}
        title={`Your moves to ${contact.name}`}
        isDetailsCmp={true}
      />
    </section>
  )
}
