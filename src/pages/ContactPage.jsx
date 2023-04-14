import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from '../cmps/ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
import { eventBus } from '../services/event-bus.service'
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
  }

  loadContacts = async () => {
    try {
      const contacts = await contactService.getContacts(this.state.filterBy)
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
    const { contacts, selectedContactId, filterBy } = this.state
    if (!contacts) return <div className="page-loading-screen ">Loading...</div>
    return (
      <main className="contact-page main-layout ">
        <ContactFilter
          onChangeFilter={this.onChangeFilter}
          filterBy={filterBy}
        />
        {selectedContactId ? (
          <ContactDetails contactId={this.state.selectedContactId} />
        ) : (
          <ContactList contacts={contacts} />
        )}
      </main>
    )
  }
}
