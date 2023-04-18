import React, { Component } from 'react'
import { useFormRegister } from '../customHooks/useFormRegister'

export function ContactFilter(props) {
  const [register] = useFormRegister(
    { ...props.filterBy },
    props.onChangeFilter
  )
  const filterBy = props.filterBy
  // state = { filterBy: null }

  // componentDidMount() {
  //   this.setState({ filterBy: { ...this.props.filterBy } })
  // }
  // handleChange = ({ target }) => {
  //   const field = target.name
  //   let value = target.value

  //   switch (target.type) {
  //     case 'number':
  //     case 'range':
  //       value = +value
  //       break
  //     case 'checkbox':
  //       value = target.checked
  //       break
  //     default:
  //       break
  //   }
  //   this.setState(
  //     ({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }),
  //     () => this.props.onChangeFilter(this.state.filterBy)
  //   )
  // }
  // render() {
  if (!filterBy) return <div>loading...</div>
  const { name, phone, email } = filterBy

  return (
    <form className="contact-filter">
      {[
        { field: 'name', type: 'text' },
        { field: 'phone', type: 'text' },
        { field: 'email', type: 'text' },
      ].map((by) => {
        return (
          <section key={by.field}>
            <label htmlFor={by.field}>{by.field}</label>
            <input {...register(by.field, by.type)} />
          </section>
        )
      })}
      {/* <section>
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
      </section> */}
    </form>
  )
}
// }
