import { useState } from 'react'
import NicknameForm from './components/NicknameForm'
import QuestionCountSelector from './components/QuestionCountSelector'
import MathQuestion from './components/MathQuestion'
import Results from './components/Results'

function App() {
  const [nickname, setNickname] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [results, setResults] = useState<{ question: string; time: number }[]>([])
  const [totalTime, setTotalTime] = useState(0)

  const generateQuestions = (count: number) => {
    return Array.from({ length: count }, () => ({
      num1: Math.floor(Math.random() * 12) + 1,
      num2: Math.floor(Math.random() * 12) + 1,
    }))
  }

  const questions = generateQuestions(questionCount)

  const handleAnswer = (timeTaken: number) => {
    const current = questions[currentQuestion]
    setResults((prev) => [
      ...prev,
      { question: `${current.num1} × ${current.num2}`, time: timeTaken },
    ])
    setCurrentQuestion((prev) => prev + 1)
  }

  const handleRestart = () => {
    setNickname('')
    setQuestionCount(0)
    setCurrentQuestion(0)
    setResults([])
    setTotalTime(0)
  }

  if (!nickname) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <NicknameForm onSubmit={setNickname} />
      </div>
    )
  }

  if (!questionCount) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <QuestionCountSelector onSelect={setQuestionCount} />
      </div>
    )
  }

  if (currentQuestion < questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <MathQuestion
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          onTimeUpdate={setTotalTime}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Results results={results} onRestart={handleRestart} />
    </div>
  )
}

export default App
