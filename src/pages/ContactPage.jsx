import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
import { eventBus } from '../services/event-bus.service'
import { Link } from 'react-router-dom'
export class ContactPage extends Component {
  state = {
    contacts: null,
    selectedContactId: null,
    filterBy: {
      name: '',
      phone: '',
      email: '',
    },
  }
  async componentDidMount() {
    this.loadContacts()
    eventBus.on('onToggleContactDetails', (contactId) => {
      this.toggleContactDetails(contactId)
    })
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.forceUpdate()
  }
  loadContacts = async () => {
    try {
      const contacts = await contactService.query(this.state.filterBy)
      this.setState({ contacts })
    } catch (err) {
      console.log(err)
    }
  }
  onChangeFilter = (filterBy) => {
    this.setState({ filterBy: { ...filterBy } }, this.loadContacts)
  }
  componentDidUpdate() {
    this.render()
  }

  toggleContactDetails = (contactId) => {
    this.setState({ selectedContactId: contactId })
  }

  render() {
    const btnTxt = window.innerWidth < 768 ? '+' : 'Add a new contact'
    const { contacts, selectedContactId, filterBy } = this.state
    if (!contacts) return <div className="page-loading-screen ">Loading...</div>
    return (
      <>
        <main className="contact-page main-layout ">
          <Link to="contact/edit" className="btn btn-add-contact btn-purple">
            {btnTxt}
          </Link>
          <ContactFilter
            onChangeFilter={this.onChangeFilter}
            filterBy={filterBy}
          />

          <ContactList contacts={contacts} />
        </main>
      </>
    )
  }
}
