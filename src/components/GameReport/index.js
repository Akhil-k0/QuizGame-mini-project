import {useLocation} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReport = () => {
  const location = useLocation()
  const unattemptedQuestions = location.state?.unattemptedQuestions || []
  const correctCount = location.state?.correctCount
  const incorrectCount = location.state?.incorrectCount
  const totalQuestions = location.state?.totalQuestions

  const renderReport = () => (
    <div className="report-details-container">
      <div className="score-container">
        <p className="score-text">
          <span className="span-text">{correctCount}</span>{' '}
          <span className="slash">/</span> {totalQuestions}
        </p>
      </div>
      <div className="score-details-container">
        <div className="score-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
            alt="correct answer icon"
            className="result-icon"
          />
          <p className="score-details-text">{correctCount} Correct answers</p>
        </div>
        <div className="score-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
            alt="incorrect answer icon"
            className="result-icon"
          />
          <p className="score-details-text">
            {incorrectCount} Incorrect answers
          </p>
        </div>
        <div className="score-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
            alt="unattempted icon"
            className="result-icon"
          />
          <p className="score-details-text">
            {unattemptedQuestions.length} Unattempted
          </p>
        </div>
      </div>
    </div>
  )

  const renderQuizReport = () => {
    const getOptionLabel = index => {
      const labels = ['A', 'B', 'C', 'D']
      return `${labels[index]}.`
    }

    const renderOptionButton = (option, index, optionType) => {
      const isCorrect = option.is_correct === 'true'
      const buttonColor = isCorrect ? '#1c944b' : '#CBD5E1'
      const buttonText = isCorrect ? '#F8FAFC' : '#334155'

      if (optionType === 'DEFAULT') {
        return (
          <div className="option-item-container" key={option.id}>
            <button
              key={option.id}
              type="button"
              style={{background: buttonColor, color: buttonText}}
              className="option-btn"
            >
              {getOptionLabel(index)} {option.text}
            </button>
            {isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked"
                className="check-img"
              />
            )}
          </div>
        )
      }
      if (optionType === 'IMAGE') {
        return (
          <div className="image-item-container" key={option.id}>
            <button type="button" className="image-option-btn">
              <img
                src={option.image_url}
                alt={option.text}
                className="option-image"
              />
            </button>
            {isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked"
                className="check-img"
              />
            )}
          </div>
        )
      }

      if (optionType === 'SINGLE_SELECT') {
        return (
          <div className="radio-item-container" key={option.id}>
            <input
              type="radio"
              id={option.id}
              value={option.id}
              className="radio-option"
            />
            <label htmlFor={option.id} className="radio-option-text">
              {option.text}
            </label>
            {isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked"
                className="check-img"
              />
            )}
          </div>
        )
      }

      return null
    }

    return (
      <div className="unattempted-questions-container">
        <h1 className="questions-header">Unattempted Questions</h1>
        {unattemptedQuestions.map(question => (
          <div
            className="quiz-details-container each-question-container"
            key={question.id}
          >
            <p className="quiz-question">{question.question_text}</p>
            <div className="options-container">
              {question.options.map((option, index) =>
                renderOptionButton(option, index, question.options_type),
              )}
            </div>
            <div className="correct-answer">
              Correct Answer:{' '}
              {question.options.find(opt => opt.is_correct === 'true').text}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="report-bg-container">
        <div className="report-card-container">
          {renderReport()}
          {unattemptedQuestions.length === 0 ? (
            <div className="unattempted-none-container">
              <h1 className="questions-header2">Attempted all the questions</h1>
            </div>
          ) : (
            renderQuizReport()
          )}
        </div>
      </div>
    </>
  )
}

export default GameReport
