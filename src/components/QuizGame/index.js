import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusInfo = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class QuizGame extends Component {
  state = {
    apiStatus: apiStatusInfo.initial,
    questions: [],
    currentQuestionIndex: 0,
    selectedOption: null,
    timeLeft: 15,
    intervalId: null,
    timeExpired: false,
    correctOptionCount: 0,
    incorrectOptionCount: 0,
    unattemptedQuestions: [],
  }

  componentDidMount() {
    this.getQuizDetails()
    this.startTimer()
  }

  componentWillUnmount() {
    const {intervalId} = this.state
    clearInterval(intervalId)
  }

  getQuizDetails = async () => {
    this.setState({apiStatus: apiStatusInfo.inProgress})

    const apiUrl = 'https://apis.ccbp.in/assess/questions'

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          questions: data.questions,
          apiStatus: apiStatusInfo.success,
        })
      } else {
        this.setState({apiStatus: apiStatusInfo.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusInfo.failure})
    }
  }

  startTimer = () => {
    const intervalId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLeft > 0) {
          return {timeLeft: prevState.timeLeft - 1}
        }
        clearInterval(prevState.intervalId)
        return {timeExpired: true}
      })
    }, 1000)

    this.setState({intervalId})
  }

  handleNextQuestion = () => {
    const {
      currentQuestionIndex,
      questions,
      selectedOption,
      unattemptedQuestions,
      correctOptionCount,
      incorrectOptionCount,
    } = this.state
    const currentQuestion = questions[currentQuestionIndex]

    // Store unattempted question if no option selected
    if (selectedOption === null) {
      this.setState(prevState => ({
        unattemptedQuestions: [
          ...prevState.unattemptedQuestions,
          currentQuestion,
        ],
      }))
    }

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          selectedOption: null,
          timeLeft: 15,
          timeExpired: false,
        }),
        this.startTimer,
      )
    } else {
      const {history} = this.props
      const totalQuestions = questions.length
      history.push({
        pathname: '/game-results',
        state: {
          correctCount: correctOptionCount,
          incorrectCount: incorrectOptionCount,
          totalQuestions,
          unattemptedQuestions,
        },
      })
    }
  }

  handleOptionSelect = optionId => {
    const {
      questions,
      currentQuestionIndex,
      intervalId,
      timeExpired,
    } = this.state
    const currentQuestion = questions[currentQuestionIndex]
    if (!timeExpired) {
      clearInterval(intervalId)
      const selectedOptionData = currentQuestion.options.find(
        option => option.id === optionId,
      )

      if (selectedOptionData.is_correct === 'true') {
        this.setState(prevState => ({
          selectedOption: optionId,
          correctOptionCount: prevState.correctOptionCount + 1,
        }))
      } else {
        this.setState(prevState => ({
          selectedOption: optionId,
          incorrectOptionCount: prevState.incorrectOptionCount + 1,
        }))
      }
    }
  }

  renderOptionButton = (option, index, optionType) => {
    const {selectedOption, timeExpired} = this.state
    const isSelected = selectedOption === option.id
    const isCorrect = option.is_correct === 'true'
    let buttonColor
    let buttonText
    const checkCircleImg =
      'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
    const closeCircleImg =
      'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'

    if (isSelected) {
      buttonColor = isCorrect ? '#1c944b' : '#bf2626'
      buttonText = '#F8FAFC'
    } else if (selectedOption === null && timeExpired) {
      buttonColor = '#CBD5E1'
    } else if (selectedOption && isCorrect) {
      buttonColor = '#1c944b'
      buttonText = '#F8FAFC'
    } else {
      buttonColor = '#CBD5E1'
    }
    switch (optionType) {
      case 'DEFAULT':
        return (
          <li key={option.id} className="option-item-container">
            <button
              type="button"
              onClick={() => this.handleOptionSelect(option.id)}
              disabled={selectedOption !== null || timeExpired}
              style={{background: buttonColor, color: buttonText}}
              className="option-btn"
            >
              {String.fromCharCode(65 + index)}. {option.text}
            </button>
            {(isSelected || (!isSelected && selectedOption && isCorrect)) && (
              <img
                src={isCorrect ? checkCircleImg : closeCircleImg}
                alt={
                  isCorrect
                    ? 'correct checked circle'
                    : 'incorrect close circle'
                }
                className="check-img"
              />
            )}
          </li>
        )

      case 'IMAGE':
        return (
          <li key={option.id} className="image-item-container">
            <button
              type="button"
              onClick={() => this.handleOptionSelect(option.id)}
              disabled={selectedOption !== null || timeExpired}
              className="image-option-btn"
            >
              <img
                src={option.image_url}
                alt={option.text}
                className="option-image"
              />
            </button>
            {(isSelected || (!isSelected && selectedOption && isCorrect)) && (
              <img
                src={isCorrect ? checkCircleImg : closeCircleImg}
                alt={
                  isCorrect
                    ? 'correct checked circle'
                    : 'incorrect close circle'
                }
                className="check-img"
              />
            )}
          </li>
        )

      case 'SINGLE_SELECT':
        return (
          <li key={option.id} className="radio-item-container">
            <input
              type="radio"
              id={option.id}
              name="option"
              value={option.id}
              checked={isSelected}
              onChange={() => this.handleOptionSelect(option.id)}
              disabled={selectedOption !== null || timeExpired}
              className="radio-option"
            />
            <label htmlFor={option.id} className="radio-option-text">
              {option.text}
            </label>
            {(isSelected || (!isSelected && selectedOption && isCorrect)) && (
              <img
                src={isCorrect ? checkCircleImg : closeCircleImg}
                alt={
                  isCorrect
                    ? 'correct checked circle'
                    : 'incorrect close circle'
                }
                className="check-img"
              />
            )}
          </li>
        )

      default:
        return null
    }
  }

  renderQuizStart = () => {
    const {
      questions,
      currentQuestionIndex,
      selectedOption,
      timeLeft,
      timeExpired,
    } = this.state
    const currentQuestion = questions[currentQuestionIndex]
    const optionType = currentQuestion.options_type

    return (
      <>
        <div className="q-count-timer-container">
          <div className="questions-count-container">
            <p className="q-header">Question</p>
            <p className="q-count">
              {currentQuestionIndex + 1}/{questions.length}
            </p>
          </div>
          <div className="timer-container">
            <p className="timer">{timeLeft}</p>
          </div>
        </div>
        <div className="quiz-details-container">
          <p className="quiz-question">{currentQuestion.question_text}</p>
          <ul className="options-container">
            {currentQuestion.options.map((option, index) =>
              this.renderOptionButton(option, index, optionType),
            )}
          </ul>
        </div>
        <button
          type="button"
          onClick={this.handleNextQuestion}
          className="next-btn"
          disabled={selectedOption === null && !timeExpired}
          style={{
            background:
              selectedOption === null && !timeExpired ? '#CBD5E1' : '#0EA5E9',
            color: '#F8FAFC',
          }}
        >
          {currentQuestionIndex === questions.length - 1
            ? 'Submit'
            : 'Next Question'}
        </button>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0EA5E9" height="55" width="55" />
    </div>
  )

  handleRetry = () => {
    this.setState({
      apiStatus: apiStatusInfo.initial,
      currentQuestionIndex: 0,
      selectedOption: null,
      timeLeft: 15,
      timeExpired: false,
      correctOptionCount: 0,
      incorrectOptionCount: 0,
      unattemptedQuestions: [],
    })
    this.getQuizDetails()
  }

  renderQuizFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <div className="failure-msg-container">
        <h1 className="failure-msg1">Something went wrong</h1>
        <p className="failure-msg2">Our servers are busy please try again</p>
        <button className="retry-btn" type="button" onClick={this.handleRetry}>
          Retry
        </button>
      </div>
    </div>
  )

  renderPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusInfo.success:
        return this.renderQuizStart()
      case apiStatusInfo.failure:
        return this.renderQuizFailure()
      case apiStatusInfo.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="home-card-container quiz-card">
            {this.renderPageView()}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(QuizGame)
