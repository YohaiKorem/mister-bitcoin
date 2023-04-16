import { Component } from 'react'
import { eventBus } from '../services/event-bus.service'
import { contactService } from '../services/contact.service'
import defaultImg from '../assets/imgs/defaultUserImg.jpg'
import { SubNav } from '../cmps/SubNav'
import { Link } from 'react-router-dom'

export class ContactDetails extends Component {
  state = {
    contact: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  loadContact = async () => {
    try {
      const contact = await contactService.getContactById(
        this.props.match.params.id
      )
      this.setState({ contact })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  render() {
    const { contact } = this.state
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
        {/* <button
          onClick={() =>
            eventBus.emit('onToggleContactDetails', null)
          }></button> */}
        <img src={contact.imgUrl ? contact.imgUrl : defaultImg} />
        <h2 className="contact-name"> {contact.name}</h2>
        <h3 className="contact-phone"> {contact.phone}</h3>
        <h3 className="contact-email"> {contact.email}</h3>
        <form className="transfer-form">
          <input type="text" />
          <button className="btn btn-purple">Transfer</button>
        </form>
      </section>
    )
  }
}
