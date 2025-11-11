import { Evaluation } from '../types';
import { CheckCircle, XCircle, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

interface EvaluationFeedbackProps {
  evaluation: Evaluation;
  onNextChallenge: () => void;
  onTryAgain: () => void;
  onChangeTopic: () => void;
}

export default function EvaluationFeedback({
  evaluation,
  onNextChallenge,
  onTryAgain,
  onChangeTopic
}: EvaluationFeedbackProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 animate-fadeIn">
      {/* Status Header */}
      <div className={`flex items-start gap-3 mb-4 pb-4 border-b ${
        evaluation.isCorrect ? 'border-green-500/30' : 'border-yellow-500/30'
      }`}>
        {evaluation.isCorrect ? (
          <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={28} />
        ) : (
          <XCircle className="text-yellow-400 flex-shrink-0 mt-1" size={28} />
        )}
        <div>
          <h3 className={`text-2xl font-bold mb-2 ${
            evaluation.isCorrect ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {evaluation.isCorrect ? 'Great Job! 🎉' : 'Good Effort! 💪'}
          </h3>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <MessageCircle className="text-primary-400 flex-shrink-0 mt-1" size={20} />
          <h4 className="text-lg font-semibold text-white">AI Feedback</h4>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {evaluation.feedback}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      {evaluation.suggestions && evaluation.suggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="text-purple-400 flex-shrink-0 mt-1" size={20} />
            <h4 className="text-lg font-semibold text-white">Suggestions for Improvement</h4>
          </div>
          <ul className="space-y-2">
            {evaluation.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-gray-900 rounded-lg p-3 border border-gray-700">
                <span className="text-purple-400 font-bold mt-0.5">{idx + 1}.</span>
                <span className="text-gray-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Step */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <ArrowRight className="text-blue-400 flex-shrink-0 mt-1" size={20} />
          <h4 className="text-lg font-semibold text-white">Next Step</h4>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-200">{evaluation.nextStep}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onNextChallenge}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <ArrowRight size={18} />
          Next Challenge
        </button>

        {!evaluation.isCorrect && (
          <button
            onClick={onTryAgain}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}

        <button
          onClick={onChangeTopic}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          Change Topic
        </button>
      </div>
    </div>
  );
}
