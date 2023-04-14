import logo from '../assets/imgs/mister-bitcoin-logo.png'

export function MainHeader() {
  return (
    <header className="main-header flex space-between full">
      <div className="logo ">
        <img src={logo} />
      </div>
      <nav>
        <ul className="flex space-between ">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Contacts</a>
          </li>
          <li>
            <a href="">Statistics</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
