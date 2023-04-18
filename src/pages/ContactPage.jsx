import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
import { eventBus } from '../services/event-bus.service'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'
export function ContactPage() {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contactModule.contacts)
  const filterBy = useSelector((state) => state.contactModule.filterBy)

  useEffect(() => {
    dispatch(loadContacts())
  }, [dispatch, filterBy])

  const onChangeFilter = (filterBy) => {
    dispatch(setFilterBy(filterBy))
  }
  const btnTxt = window.innerWidth < 768 ? '+' : 'Add a new contact'
  if (!contacts) return <div className="page-loading-screen ">Loading...</div>
  return (
    <main className="contact-page main-layout ">
      <Link to="contact/edit" className="btn btn-add-contact btn-purple">
        {btnTxt}
      </Link>
      <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />

      <ContactList contacts={contacts} />
    </main>
  )
}
