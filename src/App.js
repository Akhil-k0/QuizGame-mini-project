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
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/quiz-Game" component={QuizGame} />
    <ProtectedRoute exact path="/game-results" component={GameResults} />
    <ProtectedRoute exact path="/game-report" component={GameReport} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
