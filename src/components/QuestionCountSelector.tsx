import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const questionCounts = [5, 10, 20, 50, 100]

export default function QuestionCountSelector({ onSelect }: { onSelect: (count: number) => void }) {
  const [selectedCount, setSelectedCount] = useState(10)

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">How many questions?</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {questionCounts.map((count) => (
            <button
              key={count}
              onClick={() => setSelectedCount(count)}
              className={`px-4 py-2 rounded-md ${
                selectedCount === count
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
        <button
          onClick={() => onSelect(selectedCount)}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Start Quiz
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
