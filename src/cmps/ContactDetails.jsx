import { Component } from 'react'
import { eventBus } from '../services/event-bus.service'
import { contactService } from '../services/contact.service'
import defaultImg from '../assets/imgs/defaultUserImg.jpg'
import { SubNav } from './SubNav'
export class ContactDetails extends Component {
  state = {
    contact: null,
  }

  async componentDidMount() {
    const contact = await contactService.getContactById(this.props.contactId)
    this.setState({ contact })
  }

  render() {
    const { contact } = this.state
    if (!contact) return <div>Loading...</div>

    return (
      <section className="contact-details">
        {/* <SubNav /> */}
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
