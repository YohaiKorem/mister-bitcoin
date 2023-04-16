import { Link } from 'react-router-dom'

export function SubNav() {
  return (
    <nav className="sub-nav">
      <Link className="btn btn-purple">Edit</Link>
      <Link className="btn btn-purple">back</Link>
    </nav>
  )
}
