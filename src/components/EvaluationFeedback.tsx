import { Evaluation } from '../types';
import { Trophy, Heart, MessageCircle, ArrowRight, Sparkles, Star, Zap, RotateCcw } from 'lucide-react';

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
    <div className="bg-white rounded-card border-4 border-sunshine-yellow p-4 md:p-6 shadow-playful animate-fadeIn">
      {/* Status Header with Celebration */}
      <div className={`rounded-card p-6 mb-6 ${
        evaluation.isCorrect
          ? 'bg-gradient-to-r from-friendly-green to-energetic-orange'
          : 'bg-gradient-to-r from-sunshine-yellow to-happy-pink'
      }`}>
        <div className="flex items-start gap-4">
          {evaluation.isCorrect ? (
            <Trophy className="text-white flex-shrink-0 animate-celebration" size={48} />
          ) : (
            <Heart className="text-white flex-shrink-0 animate-bounce-soft" size={48} />
          )}
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-playful font-bold text-white mb-2 flex items-center gap-2">
              {evaluation.isCorrect ? (
                <>
                  Amazing Work, Space Cadet!
                  <Star className="animate-starCollect fill-sunshine-yellow text-sunshine-yellow" size={32} />
                </>
              ) : (
                <>
                  Great Try, Keep Going!
                  <Zap className="animate-wiggle text-sunshine-yellow" size={32} />
                </>
              )}
            </h3>
            <p className="text-white/90 font-friendly text-lg">
              {evaluation.isCorrect
                ? "You're becoming a coding superstar! Let's see what your AI buddy thinks!"
                : "You're on the right track! Every mistake is a step towards success!"
              }
            </p>
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <MessageCircle className="text-sky-blue flex-shrink-0 mt-1 animate-bounce-soft" size={28} />
          <h4 className="text-2xl font-playful font-bold text-deep-navy">
            Your AI Buddy's Feedback
          </h4>
        </div>
        <div className="bg-gradient-to-br from-sky-blue/10 to-playful-purple/10 rounded-card p-5 border-3 border-sky-blue shadow-card">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-friendly text-base md:text-lg">
            {evaluation.feedback}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      {evaluation.suggestions && evaluation.suggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="text-playful-purple flex-shrink-0 mt-1 animate-sparkle" size={28} />
            <h4 className="text-2xl font-playful font-bold text-deep-navy">
              Ways to Level Up Your Skills
            </h4>
          </div>
          <ul className="space-y-3">
            {evaluation.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-gradient-to-r from-playful-purple/10 to-happy-pink/10 rounded-child p-4 border-2 border-playful-purple/30 hover:border-playful-purple hover:shadow-card transition-all">
                <span className="flex-shrink-0 w-8 h-8 bg-playful-purple text-white font-bold rounded-full flex items-center justify-center text-base">
                  {idx + 1}
                </span>
                <span className="text-gray-800 font-friendly text-base leading-relaxed flex-1">
                  {suggestion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Step */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <ArrowRight className="text-energetic-orange flex-shrink-0 mt-1 animate-wiggle" size={28} />
          <h4 className="text-2xl font-playful font-bold text-deep-navy">
            What's Next on Your Adventure?
          </h4>
        </div>
        <div className="bg-gradient-to-r from-energetic-orange/10 to-sunshine-yellow/10 border-3 border-energetic-orange rounded-card p-5 shadow-card">
          <p className="text-gray-800 font-friendly text-base md:text-lg leading-relaxed">
            {evaluation.nextStep}
          </p>
        </div>
      </div>

      {/* Star Gem Reward (if correct) */}
      {evaluation.isCorrect && (
        <div className="mb-6 p-5 bg-gradient-to-r from-sunshine-yellow to-energetic-orange rounded-card border-3 border-sunshine-yellow text-center shadow-hover">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Star className="text-white fill-white animate-starCollect" size={32} />
            <p className="text-2xl md:text-3xl font-playful font-bold text-white">
              +50 Star Gems Earned!
            </p>
            <Star className="text-white fill-white animate-starCollect" size={32} />
          </div>
          <p className="text-white/90 font-friendly text-base">
            Keep collecting gems to unlock special badges!
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <button
          onClick={onNextChallenge}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-friendly-green to-sky-blue hover:from-green-600 hover:to-blue-600 text-white font-playful font-bold text-lg rounded-child transition-all duration-200 hover:scale-105 hover:shadow-hover active:scale-95 border-2 border-green-400 flex-1"
        >
          <ArrowRight size={24} className="animate-bounce-soft" />
          🚀 Next Mission!
        </button>

        {!evaluation.isCorrect && (
          <button
            onClick={onTryAgain}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-energetic-orange to-happy-pink hover:from-orange-600 hover:to-pink-600 text-white font-playful font-bold text-lg rounded-child transition-all duration-200 hover:scale-105 hover:shadow-hover active:scale-95 border-2 border-orange-400 flex-1"
          >
            <RotateCcw size={24} />
            💪 Try Again!
          </button>
        )}

        <button
          onClick={onChangeTopic}
          className="px-6 py-4 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-playful font-bold text-lg rounded-child transition-all duration-200 hover:scale-105 hover:shadow-card active:scale-95 border-2 border-gray-400"
        >
          🎯 Change Mission
        </button>
      </div>

      {/* Encouragement Footer */}
      <div className="mt-6 p-4 bg-gradient-to-r from-sky-blue/10 to-playful-purple/10 rounded-child border-2 border-sky-blue/30 text-center">
        <p className="text-base text-gray-700 font-friendly">
          <strong className="text-sky-blue font-playful">Remember:</strong> Every great coder started exactly where you are now. You're doing awesome! 🌟
        </p>
      </div>
    </div>
  );
}
