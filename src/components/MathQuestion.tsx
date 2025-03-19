import { useState, useEffect, useRef } from 'react'
import { Timer } from 'lucide-react'

export default function MathQuestion({
  question,
  onAnswer,
  onTimeUpdate,
}: {
  question: { num1: number; num2: number }
  onAnswer: (timeTaken: number) => void
  onTimeUpdate: (time: number) => void
}) {
  const [answer, setAnswer] = useState('')
  const [time, setTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1)
      onTimeUpdate(time + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [time, onTimeUpdate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearInterval(intervalRef.current)
    onAnswer(time)
    setAnswer('')
    setTime(0)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Question</h2>
        <div className="flex items-center gap-1 text-gray-600">
          <Timer size={18} />
          <span>{time}s</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center text-4xl font-bold py-8">
          {question.num1} × {question.num2} = ?
        </div>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-2xl"
          autoFocus
        />
        <button
          type="submit"
          disabled={!answer}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Submit Answer
        </button>
      </form>
    </div>
  )
}
