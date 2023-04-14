import { eventBus } from '../services/event-bus.service'
import defaultImg from '../assets/imgs/defaultUserImg.jpg'
export function ContactPreview({ contact }) {
  return (
    <article
      onClick={() => eventBus.emit('onToggleContactDetails', contact._id)}
      className="contact-preview">
      <div className="user-img-container">
        <img
          className="user-img"
          src={contact.imgUrl ? contact.imgUrl : defaultImg}
        />
      </div>
      <div className="contact-info-container">
        <h3>{contact.name}</h3>
        <h4>{contact.phone}</h4>
        <h5>{contact.email}</h5>
      </div>
    </article>
  )
}
