import logo from '../assets/imgs/mister-bitcoin-logo.png'
export function MainHeader() {
  return (
    <header className="main-header flex space-between full">
      <div className="logo ">
        <img src={logo} />
      </div>
      <nav className="main-nav">
        <ul className="flex space-between ">
          <li>
            <a href="">
              <i class="fa-solid fa-house"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa-regular fa-address-book"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa-solid fa-chart-simple"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
