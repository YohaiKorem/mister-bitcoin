import { Component } from 'react'
import { eventBus } from '../services/event-bus.service'
import { contactService } from '../services/contact.service'
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
        <img
          src={
            contact.imgUrl
              ? contact.imgUrl
              : 'src/assets/imgs/defaultUserImg.jpg'
          }
        />
        <h3>Name: {contact.name}</h3>
        <h3>Phone: {contact.phone}</h3>
        <h3>Email: {contact.email}</h3>
        <button onClick={() => eventBus.emit('onToggleContactDetails', null)}>
          back
        </button>
      </section>
    )
  }
}
