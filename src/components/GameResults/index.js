import {useHistory, useLocation} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameResults = () => {
  const location = useLocation()
  const {correctCount, totalQuestions, unattemptedQuestions} =
    location.state || {}
  const incorrectCount =
    totalQuestions - correctCount - (unattemptedQuestions?.length || 0)
  const percentage = Math.round((correctCount / totalQuestions) * 100)
  const history = useHistory()

  const handleReportClick = () => {
    history.push({
      pathname: '/game-report',
      state: {
        unattemptedQuestions,
        correctCount,
        totalQuestions,
        incorrectCount,
      },
    })
  }

  const isSuccess = percentage >= 60

  const failure = () => (
    <div className="result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
        alt="lose"
        className="lose-img"
      />
      <div className="result-text-container">
        <h1 className="game-result">You lose</h1>
        <h1 className="result-percentage">{percentage}% Correctly Answered</h1>
        <p className="answers-count">
          You attempted {correctCount} out of {totalQuestions} questions as
          correct.
        </p>
        <button
          type="button"
          className="report-btn"
          onClick={handleReportClick}
        >
          Report
        </button>
      </div>
    </div>
  )

  const congratulations = () => (
    <div className="result-container result-container2">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
        alt="won"
        className="won-img"
      />
      <div className="result-text-container">
        <h1 className="game-result">Congrats</h1>
        <h1 className="result-percentage">{percentage}% Correctly Answered</h1>
        <p className="game-result">Quiz completed successfully.</p>
        <p className="answers-count">
          You attempted {correctCount} out of {totalQuestions} questions as
          correct.
        </p>
        <button
          type="button"
          className="report-btn"
          onClick={handleReportClick}
        >
          Report
        </button>
      </div>
    </div>
  )

  const renderResults = () => (isSuccess ? congratulations() : failure())

  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-card-container">{renderResults()}</div>
      </div>
    </>
  )
}

export default GameResults
