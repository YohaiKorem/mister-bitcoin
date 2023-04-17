import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contact.service'
import defaultImg from '../assets/imgs/defaultUserImg.jpg'

export class ContactEdit extends Component {
  state = {
    contact: contactService.getEmptyContact(),
  }

  async componentDidMount() {
    const contactId = this.props.match.params.id
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact })
      } catch (err) {
        console.log(err, 'could not load contact')
      }
    }
  }

  onSaveContact = async (ev) => {
    ev.preventDefault()
    try {
      await contactService.saveContact({ ...this.state.contact })
      this.props.history.push('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  onRemoveContact = async () => {
    try {
      await contactService.removeContact({ ...this.state.contact._id })
      this.props.history.push('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    this.setState(({ contact }) => ({
      contact: { ...contact, [field]: value },
    }))
  }

  render() {
    const { contact } = this.state
    const { phone, email, name } = contact
    return (
      <section className="contact-edit">
        <img src={contact.imgUrl ? contact.imgUrl : defaultImg} />
        <form onSubmit={this.onSaveContact} className="contact-edit-form">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="phone">Phone</label>
          <input
            value={phone}
            onChange={this.handleChange}
            type="text"
            name="phone"
            id="phone"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
          />
          <button onClick={() => this.onSaveContact} className="btn btn-blue">
            Save
          </button>
        </form>
        <div className="btns-container">
          <Link
            to={contact._id ? `/contact/${contact._id}` : '/contact'}
            className="btn btn-purple btn-back">
            Back
          </Link>
          <button
            onClick={() => this.onRemoveContact()}
            className="btn btn-red btn-remove">
            Delete
          </button>
        </div>
      </section>
    )
  }
}
