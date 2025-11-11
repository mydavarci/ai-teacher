import { Topic, Difficulty } from '../types';
import { topics } from '../data/topics';

interface TopicSelectorProps {
  onSelectTopic: (topic: Topic, difficulty: Difficulty) => void;
}

export default function TopicSelector({ onSelectTopic }: TopicSelectorProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  const difficultyColors = {
    easy: 'bg-green-500 hover:bg-green-600',
    medium: 'bg-yellow-500 hover:bg-yellow-600',
    hard: 'bg-red-500 hover:bg-red-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            AI Code Trainer
          </h1>
          <p className="text-xl text-gray-300">
            Master JavaScript through interactive AI-powered challenges
          </p>
          <p className="text-gray-400 mt-2">
            Select a topic and difficulty level to begin your training
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary-500 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20"
            >
              {/* Topic Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {topic.description}
                  </p>
                </div>
              </div>

              {/* Subtopics */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  What you'll learn:
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {topic.subtopics.slice(0, 3).map((subtopic, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{subtopic}</span>
                    </li>
                  ))}
                  {topic.subtopics.length > 3 && (
                    <li className="text-gray-500 text-xs">
                      +{topic.subtopics.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>

              {/* Difficulty Buttons */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase">
                  Select Difficulty:
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => onSelectTopic(topic, difficulty)}
                      className={`px-3 py-2 rounded text-sm font-medium text-white transition-colors ${difficultyColors[difficulty]}`}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>The AI will guide you through challenges and provide personalized feedback.</p>
          <p className="mt-1">You can continue practicing until you're ready to stop!</p>
        </div>
      </div>
    </div>
  );
}
