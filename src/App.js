import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import GameResults from './components/GameResults'
import GameReport from './components/GameReport'

const App = () => (
  <Switch>
    <Route path="/Login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/quiz-Game" component={QuizGame} />
    <ProtectedRoute path="/game-results" component={GameResults} />
    <ProtectedRoute path="/game-report" component={GameReport} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
