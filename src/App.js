import './assets/scss/main.scss'
import { HomePage } from './pages/HomePage'
import { MainHeader } from './cmps/MainHeader'
import { ContactPage } from './pages/ContactPage'
import { ContactDetails } from './pages/ContactDetails'
import { StatisticsPage } from './pages/StatisticsPage'
import { Signup } from './pages/Signup'
import {
  Route,
  HashRouter as Router,
} from 'react-router-dom/cjs/react-router-dom.min'
import { Switch } from 'react-router-dom/cjs/react-router-dom'
import { ContactEdit } from './pages/ContactEdit'

function App() {
  return (
    <Router>
      <div className="App main-layout">
        <MainHeader />
        <Switch>
          <Route path="/contact/edit/:id?" component={ContactEdit} />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/statistics" component={StatisticsPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
