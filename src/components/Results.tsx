import { Trophy } from 'lucide-react'

export default function Results({
  results,
  onRestart,
}: {
  results: { question: string; time: number }[]
  onRestart: () => void
}) {
  const totalTime = results.reduce((sum, result) => sum + result.time, 0)
  const averageTime = (totalTime / results.length).toFixed(2)

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Results</h2>
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg">Total Time: {totalTime}s</p>
          <p className="text-lg">Average Time: {averageTime}s</p>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <div key={index} className="flex justify-between p-2 even:bg-gray-50">
              <span>{result.question}</span>
              <span>{result.time}s</span>
            </div>
          ))}
        </div>
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
