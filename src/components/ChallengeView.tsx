import { Challenge, Topic, Difficulty } from '../types';
import { Lightbulb, ArrowLeft, Trophy, Sparkles, Rocket } from 'lucide-react';

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
  const difficultyLabels = {
    easy: '🌟 Beginner Explorer',
    medium: '⭐ Space Cadet',
    hard: '🚀 Mission Commander'
  };

  const difficultyColors = {
    easy: 'bg-friendly-green text-white border-green-400',
    medium: 'bg-sunshine-yellow text-deep-navy border-yellow-400',
    hard: 'bg-energetic-orange text-white border-orange-400'
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-card border-4 border-sky-blue shadow-playful">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 bg-gradient-to-r from-sky-blue to-playful-purple rounded-t-card">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-soft-cream transition-colors bg-white/20 px-4 py-2 rounded-child hover:bg-white/30 font-friendly font-semibold"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Missions</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className={`px-4 py-2 rounded-child font-playful font-bold text-sm border-2 ${difficultyColors[difficulty]}`}>
            {difficultyLabels[difficulty]}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl md:text-5xl animate-bounce-soft">{topic.icon}</span>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-playful font-bold text-white mb-1">
              Mission: {topic.title}
            </h2>
            <p className="text-white/90 font-friendly text-sm md:text-base">
              Let's discover something amazing together!
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Instruction */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* Main Challenge Card */}
        <div className="bg-gradient-to-br from-soft-cream to-white rounded-card p-5 md:p-6 border-3 border-energetic-orange shadow-card mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Trophy className="text-energetic-orange flex-shrink-0 animate-wiggle" size={32} />
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-playful font-bold text-deep-navy mb-3 flex items-center gap-2">
                Your Mission
                <Sparkles className="text-sunshine-yellow animate-sparkle" size={24} />
              </h3>
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-friendly text-base md:text-lg">
                {challenge.instruction}
              </div>
            </div>
          </div>
        </div>

        {/* Hints Section */}
        {challenge.hints && challenge.hints.length > 0 && (
          <div className="mb-6">
            <button
              onClick={onToggleHints}
              className="flex items-center gap-3 bg-sunshine-yellow hover:bg-yellow-500 text-deep-navy px-6 py-3 rounded-child font-playful font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-hover active:scale-95 border-2 border-yellow-400 w-full md:w-auto"
            >
              <Lightbulb size={24} className={showHints ? 'animate-wiggle' : ''} />
              <span>
                {showHints ? '🙈 Hide My Helper Hints' : '💡 Need a Hint? Click Here!'}
              </span>
            </button>

            {showHints && (
              <div className="mt-4 bg-gradient-to-br from-yellow-50 to-sunshine-yellow/20 rounded-card p-5 md:p-6 border-3 border-sunshine-yellow shadow-card animate-slide-up">
                <h4 className="font-playful font-bold text-xl text-deep-navy mb-4 flex items-center gap-2">
                  <Lightbulb className="text-sunshine-yellow fill-sunshine-yellow" size={24} />
                  Helper Hints
                </h4>
                <ul className="space-y-3">
                  {challenge.hints.map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-child border-2 border-yellow-200">
                      <span className="flex-shrink-0 w-7 h-7 bg-sunshine-yellow text-deep-navy font-bold rounded-full flex items-center justify-center text-sm">
                        {idx + 1}
                      </span>
                      <span className="text-gray-800 font-friendly text-base leading-relaxed flex-1">
                        {hint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Encouragement Cards */}
        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-r from-sky-blue/10 to-playful-purple/10 border-2 border-sky-blue rounded-card">
            <div className="flex items-start gap-3">
              <Rocket className="text-sky-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-base md:text-lg font-friendly text-gray-800 leading-relaxed">
                  <strong className="text-sky-blue font-playful">Take Your Time!</strong> There's no rush, Space Cadet!
                  Think it through, try things out, and have fun experimenting. That's how real coders learn!
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-friendly-green/10 to-energetic-orange/10 border-2 border-friendly-green rounded-card">
            <div className="flex items-start gap-3">
              <Sparkles className="text-friendly-green flex-shrink-0 mt-1 animate-sparkle" size={24} />
              <div>
                <p className="text-base md:text-lg font-friendly text-gray-800 leading-relaxed">
                  <strong className="text-friendly-green font-playful">Your AI Buddy is Watching!</strong> When you submit
                  your code, I'll give you friendly feedback and help you become an even better coder!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
