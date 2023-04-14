import './assets/scss/main.scss'
import { HomePage } from './pages/HomePage'
import { MainHeader } from './cmps/MainHeader'
import { MainFooter } from './cmps/MainFooter'
import { ContactPage } from './pages/ContactPage'
import { StatisticsPage } from './pages/StatisticsPage'

function App() {
  return (
    <div className="App main-layout">
      <MainHeader />
      {/* <HomePage /> */}
      <ContactPage />
      {/* <StatisticsPage /> */}
    </div>
  )
}

export default App
