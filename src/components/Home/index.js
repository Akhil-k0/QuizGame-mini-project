import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-card-container">
        <div className="home-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
            className="quiz-start-img"
          />
          <div className="text-details-container">
            <h1 className="text1">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="text2">
              Test yourself with these easy quiz questions and answers
            </p>
          </div>
          <Link to="/quiz-game">
            <button className="start-btn" type="button">
              Start Quiz
            </button>
          </Link>
        </div>
        <div className="warning-msg-container">
          <div className="warning-msg-details">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              alt="warning icon"
              className="start-warning-img"
            />
            <p className="warning-msg">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Home
