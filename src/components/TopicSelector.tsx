import { Topic, Difficulty } from '../types';
import { topics } from '../data/topics';
import { Rocket, Star, Sparkles } from 'lucide-react';

interface TopicSelectorProps {
  onSelectTopic: (topic: Topic, difficulty: Difficulty) => void;
}

export default function TopicSelector({ onSelectTopic }: TopicSelectorProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  const difficultyLabels = {
    easy: '🌟 Beginner Explorer',
    medium: '⭐ Space Cadet',
    hard: '🚀 Mission Commander'
  };

  const difficultyColors = {
    easy: 'bg-friendly-green hover:bg-green-600 border-green-400',
    medium: 'bg-sunshine-yellow hover:bg-yellow-600 border-yellow-400 text-deep-navy',
    hard: 'bg-energetic-orange hover:bg-orange-600 border-orange-400'
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-12 h-12 md:w-16 md:h-16 text-sky-blue animate-bounce-soft" />
            <h1 className="text-4xl md:text-6xl font-playful font-bold text-deep-navy">
              Code Adventure Academy
            </h1>
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-sunshine-yellow animate-sparkle" />
          </div>
          <p className="text-xl md:text-2xl text-deep-navy font-friendly mb-3">
            Welcome, Young Coder! Ready for an amazing coding adventure?
          </p>
          <p className="text-lg text-gray-700 font-friendly">
            Pick your mission below and let's start exploring the world of JavaScript together!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Star className="w-6 h-6 text-sunshine-yellow fill-sunshine-yellow" />
            <p className="text-md text-playful-purple font-semibold">
              Collect Star Gems 💎 as you complete challenges!
            </p>
            <Star className="w-6 h-6 text-sunshine-yellow fill-sunshine-yellow" />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topics.map((topic, index) => {
            // Alternate border colors for visual variety
            const borderColors = [
              'border-sky-blue',
              'border-energetic-orange',
              'border-friendly-green',
              'border-playful-purple',
              'border-happy-pink',
              'border-sunshine-yellow'
            ];
            const borderColor = borderColors[index % borderColors.length];

            return (
              <div
                key={topic.id}
                className={`card-playful ${borderColor} animate-fadeIn hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Topic Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-5xl animate-wiggle hover:animate-bounce-soft transition-all">
                    {topic.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-playful font-bold text-deep-navy mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-base text-gray-700 font-friendly leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Subtopics */}
                <div className="mb-5 bg-soft-cream rounded-child p-4">
                  <h4 className="text-sm font-playful font-bold text-playful-purple mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Cool Things You'll Discover:
                  </h4>
                  <ul className="text-sm text-gray-800 space-y-2 font-friendly">
                    {topic.subtopics.slice(0, 3).map((subtopic, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-blue text-lg mt-0.5">✨</span>
                        <span>{subtopic}</span>
                      </li>
                    ))}
                    {topic.subtopics.length > 3 && (
                      <li className="text-playful-purple text-sm font-semibold ml-6">
                        +{topic.subtopics.length - 3} more awesome things!
                      </li>
                    )}
                  </ul>
                </div>

                {/* Difficulty Buttons */}
                <div className="space-y-3">
                  <h4 className="text-sm font-playful font-bold text-deep-navy flex items-center gap-2">
                    <Star className="w-4 h-4 text-sunshine-yellow fill-sunshine-yellow" />
                    Choose Your Rank:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => onSelectTopic(topic, difficulty)}
                        className={`px-4 py-3 rounded-child text-base font-bold text-white transition-all duration-200 border-2 ${difficultyColors[difficulty]} hover:scale-105 hover:shadow-hover active:scale-95 font-playful`}
                      >
                        {difficultyLabels[difficulty]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center bg-white rounded-card p-6 shadow-card border-2 border-sky-blue">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Rocket className="w-8 h-8 text-energetic-orange" />
            <h3 className="text-2xl font-playful font-bold text-deep-navy">
              Your AI Coding Buddy is Ready!
            </h3>
          </div>
          <p className="text-lg text-gray-700 font-friendly mb-2">
            I'll be your friendly guide through every challenge, cheering you on and helping when you need it!
          </p>
          <p className="text-md text-playful-purple font-friendly font-semibold">
            Remember: Every coder makes mistakes - that's how we learn and grow! 🌱
          </p>
        </div>
      </div>
    </div>
  );
}
