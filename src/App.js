import './assets/scss/main.scss'
import { HomePage } from './pages/HomePage'
import { MainHeader } from './cmps/MainHeader'
import { ContactPage } from './pages/ContactPage'
import { ContactDetails } from './pages/ContactDetails'
import { StatisticsPage } from './pages/StatisticsPage'
import { Signup } from './pages/Signup'
import { Route, HashRouter as Router, Routes, Switch } from 'react-router-dom'
import { ContactEdit } from './pages/ContactEdit'

function App() {
  return (
    <Router>
      <div className="App main-layout">
        <MainHeader />
        <Routes>
          <Route path="/contact/edit/:id?" element={<ContactEdit />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
