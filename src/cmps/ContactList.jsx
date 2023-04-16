import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts }) {
  return (
    <ul className="contact-list clean-list full">
      {contacts?.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} />
        // <li >
        // </li>
      ))}
    </ul>
  )
}
