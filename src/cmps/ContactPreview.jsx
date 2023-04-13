import { eventBus } from '../services/event-bus.service'

export function ContactPreview({ contact }) {
  return (
    <article
      onClick={() => eventBus.emit('onToggleContactDetails', contact._id)}
      className="contact-preview">
      <img
        src={
          contact.imgUrl ? contact.imgUrl : 'src/assets/imgs/defaultUserImg.jpg'
        }
      />
      <h3>{contact.name}</h3>
    </article>
  )
}
