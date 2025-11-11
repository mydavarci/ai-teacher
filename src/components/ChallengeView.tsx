import { Challenge, Topic, Difficulty } from '../types';
import { Lightbulb, BookOpen, ArrowLeft } from 'lucide-react';

interface ChallengeViewProps {
  challenge: Challenge;
  topic: Topic;
  difficulty: Difficulty;
  onBack: () => void;
  showHints: boolean;
  onToggleHints: () => void;
}

export default function ChallengeView({
  challenge,
  topic,
  difficulty,
  onBack,
  showHints,
  onToggleHints
}: ChallengeViewProps) {
  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Topics
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{topic.icon}</span>
          <div>
            <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded text-white ${difficultyColors[difficulty]}`}>
                {difficulty.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Instruction */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-start gap-3 mb-4">
          <BookOpen className="text-primary-400 mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Challenge</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {challenge.instruction}
            </p>
          </div>
        </div>

        {/* Hints Section */}
        {challenge.hints && challenge.hints.length > 0 && (
          <div className="mt-6">
            <button
              onClick={onToggleHints}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-3"
            >
              <Lightbulb size={20} />
              <span className="font-medium">
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </span>
            </button>

            {showHints && (
              <div className="bg-gray-900 rounded-lg p-4 border border-yellow-500/30">
                <ul className="space-y-2">
                  {challenge.hints.map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <span className="text-yellow-400 font-bold mt-0.5">{idx + 1}.</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Encouragement */}
        <div className="mt-6 p-4 bg-primary-900/20 border border-primary-500/30 rounded-lg">
          <p className="text-sm text-primary-200">
            <strong>Remember:</strong> There's no time limit! Take your time to think through the problem.
            The AI will provide personalized feedback when you submit your solution.
          </p>
        </div>
      </div>
    </div>
  );
}
