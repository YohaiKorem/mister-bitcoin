import { Component } from 'react'

export class ContactFilter extends Component {
  state = { filterBy: null }

  componentDidMount() {
    this.setState({ filterBy: { ...this.props.filterBy } })
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
      default:
        break
    }
    this.setState(
      ({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }),
      () => this.props.onChangeFilter(this.state.filterBy)
    )
  }
  render() {
    if (!this.state.filterBy) return <div>loading...</div>
    const { name, phone, email } = this.state.filterBy

    return (
      <form className="filter">
        <section>
          <label htmlFor="name">Name</label>
          <input
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
          />
        </section>
        <section>
          <label htmlFor="phone">Phone</label>
          <input
            onChange={this.handleChange}
            value={phone}
            type="text"
            name="phone"
          />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            value={email}
            type="text"
            name="email"
          />
        </section>
      </form>
    )
  }
}
