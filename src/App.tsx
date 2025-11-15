import { useState, useEffect } from 'react';
import TopicSelector from './components/TopicSelector';
import ChallengeView from './components/ChallengeView';
import CodeEditor from './components/CodeEditor';
import EvaluationFeedback from './components/EvaluationFeedback';
import SettingsModal from './components/SettingsModal';
import { Topic, Difficulty, Challenge, Evaluation } from './types';
import { AIConfig } from './types/api';
import { aiService } from './services/aiService';
import { Rocket, Settings, Star, Trophy, AlertCircle } from 'lucide-react';

type AppState = 'topic-selection' | 'challenge' | 'evaluation';

function App() {
  const [state, setState] = useState<AppState>('topic-selection');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [challengeHistory, setChallengeHistory] = useState<Challenge[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Progress tracking
  const [totalStarGems, setTotalStarGems] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  // Check if AI is configured on mount
  useEffect(() => {
    setIsConfigured(aiService.isConfigured());
    // Load progress from localStorage
    const savedGems = localStorage.getItem('starGems');
    const savedCompleted = localStorage.getItem('challengesCompleted');
    if (savedGems) setTotalStarGems(parseInt(savedGems));
    if (savedCompleted) setChallengesCompleted(parseInt(savedCompleted));
  }, []);

  // Save progress to localStorage
  const updateProgress = (gemsEarned: number) => {
    const newTotal = totalStarGems + gemsEarned;
    const newCompleted = challengesCompleted + 1;
    setTotalStarGems(newTotal);
    setChallengesCompleted(newCompleted);
    localStorage.setItem('starGems', newTotal.toString());
    localStorage.setItem('challengesCompleted', newCompleted.toString());
  };

  // Start a new challenge when topic is selected
  const handleTopicSelect = async (topic: Topic, difficulty: Difficulty) => {
    // Check if AI is configured
    if (!aiService.isConfigured()) {
      setShowSettings(true);
      return;
    }

    setSelectedTopic(topic);
    setSelectedDifficulty(difficulty);
    setChallengeHistory([]);
    await loadNewChallenge(topic, difficulty, []);
  };

  // Load a new challenge
  const loadNewChallenge = async (
    topic: Topic,
    difficulty: Difficulty,
    history: Challenge[]
  ) => {
    setIsLoading(true);
    setShowHints(false);
    setEvaluation(null);
    setError(null);

    try {
      const challenge = await aiService.generateChallenge(topic, difficulty, history);
      setCurrentChallenge(challenge);
      setUserCode(challenge.starterCode);
      setState('challenge');
      setChallengeHistory([...history, challenge]);
    } catch (error: any) {
      console.error('Error loading challenge:', error);
      setError(error.message || 'Failed to load challenge. Please check your API configuration.');

      // If it's a configuration error, show settings
      if (error.message?.includes('not configured') || error.message?.includes('API')) {
        setShowSettings(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Submit code for evaluation
  const handleSubmit = async () => {
    if (!currentChallenge || !selectedTopic || !userCode.trim()) {
      setError('Please write some code before submitting!');
      return;
    }

    setIsEvaluating(true);
    setError(null);

    try {
      const result = await aiService.evaluateCode(
        currentChallenge,
        userCode,
        selectedTopic
      );
      setEvaluation(result);
      setState('evaluation');

      // Award star gems if correct
      if (result.isCorrect) {
        updateProgress(50);
      }
    } catch (error: any) {
      console.error('Error evaluating code:', error);
      setError(error.message || 'Failed to evaluate code. Please check your API configuration.');

      // If it's a configuration error, show settings
      if (error.message?.includes('not configured') || error.message?.includes('API')) {
        setShowSettings(true);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Reset to starter code
  const handleReset = () => {
    if (currentChallenge) {
      setUserCode(currentChallenge.starterCode);
    }
  };

  // Load next challenge
  const handleNextChallenge = () => {
    if (selectedTopic) {
      loadNewChallenge(selectedTopic, selectedDifficulty, challengeHistory);
    }
  };

  // Try the same challenge again
  const handleTryAgain = () => {
    setState('challenge');
    setEvaluation(null);
    setError(null);
  };

  // Go back to topic selection
  const handleBackToTopics = () => {
    setState('topic-selection');
    setSelectedTopic(null);
    setCurrentChallenge(null);
    setUserCode('');
    setEvaluation(null);
    setChallengeHistory([]);
    setError(null);
  };

  // Handle settings save
  const handleSettingsSave = (config: AIConfig) => {
    aiService.saveConfig(config);
    setIsConfigured(true);
    setError(null);
  };

  // Calculate cadet rank based on star gems
  const getCadetRank = () => {
    if (totalStarGems >= 500) return { rank: 'Mission Commander', icon: '🚀', color: 'text-energetic-orange' };
    if (totalStarGems >= 250) return { rank: 'Space Cadet', icon: '⭐', color: 'text-sunshine-yellow' };
    return { rank: 'Beginner Explorer', icon: '🌟', color: 'text-friendly-green' };
  };

  const cadetRank = getCadetRank();

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Rocket className="w-20 h-20 text-sky-blue animate-bounce-soft mx-auto mb-6" />
          <div className="animate-spin mb-4 mx-auto w-16 h-16 text-6xl">⚙️</div>
          <h2 className="text-deep-navy text-3xl font-playful font-bold mb-2">
            Creating Your Challenge...
          </h2>
          <p className="text-gray-700 text-lg font-friendly">
            Your AI buddy is crafting the perfect mission for you!
          </p>
        </div>
      </div>
    );
  }

  // Settings button component
  const SettingsButton = () => (
    <button
      onClick={() => setShowSettings(true)}
      className="fixed top-4 right-4 z-40 flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-deep-navy rounded-child border-2 border-sky-blue transition-all shadow-card hover:shadow-hover font-friendly font-semibold"
      title="Configure AI API"
    >
      <Settings size={18} />
      <span className="hidden sm:inline">
        {isConfigured ? 'Settings' : 'Setup Required'}
      </span>
      {!isConfigured && (
        <span className="w-2 h-2 bg-energetic-orange rounded-full animate-pulse" />
      )}
    </button>
  );

  // Progress Header Component
  const ProgressHeader = () => (
    <div className="fixed top-4 left-4 z-40 bg-white rounded-card border-3 border-playful-purple p-4 shadow-playful max-w-sm">
      <div className="flex items-center gap-3 mb-3">
        <Trophy className={`${cadetRank.color} animate-wiggle`} size={32} />
        <div className="flex-1">
          <h3 className="font-playful font-bold text-lg text-deep-navy flex items-center gap-2">
            {cadetRank.icon} {cadetRank.rank}
          </h3>
          <p className="text-sm text-gray-600 font-friendly">
            Missions Completed: {challengesCompleted}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Star className="text-sunshine-yellow fill-sunshine-yellow animate-sparkle" size={24} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-playful font-bold text-deep-navy">Star Gems</span>
            <span className="text-lg font-playful font-bold text-energetic-orange">{totalStarGems} 💎</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border-2 border-sunshine-yellow">
            <div
              className="bg-gradient-to-r from-sunshine-yellow to-energetic-orange h-full transition-all duration-500 animate-pulse"
              style={{ width: `${Math.min((totalStarGems % 100), 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Error banner component
  const ErrorBanner = () => error ? (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 max-w-lg w-full mx-4">
      <div className="bg-energetic-orange rounded-card p-4 border-3 border-orange-400 shadow-hover animate-slide-up">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-white flex-shrink-0 mt-0.5" size={24} />
          <div className="flex-1">
            <p className="text-white font-friendly font-semibold">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // Render topic selection
  if (state === 'topic-selection') {
    return (
      <>
        <SettingsButton />
        {challengesCompleted > 0 && <ProgressHeader />}
        <ErrorBanner />
        <TopicSelector onSelectTopic={handleTopicSelect} />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsSave}
        />
      </>
    );
  }

  // Render challenge/evaluation view
  return (
    <>
      <SettingsButton />
      <ProgressHeader />
      <ErrorBanner />
      <div className="min-h-screen p-4 pt-32 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Left Panel - Challenge Instructions */}
            <div className="flex flex-col min-h-[500px] lg:min-h-[calc(100vh-8rem)]">
              {currentChallenge && selectedTopic && (
                <ChallengeView
                  challenge={currentChallenge}
                  topic={selectedTopic}
                  difficulty={selectedDifficulty}
                  onBack={handleBackToTopics}
                  showHints={showHints}
                  onToggleHints={() => setShowHints(!showHints)}
                />
              )}
            </div>

            {/* Right Panel - Code Editor / Evaluation */}
            <div className="flex flex-col gap-4">
              {/* Code Editor */}
              <div className="min-h-[400px] lg:min-h-[calc(100vh-8rem)]">
                <CodeEditor
                  code={userCode}
                  onChange={setUserCode}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                  isEvaluating={isEvaluating}
                  starterCode={currentChallenge?.starterCode || ''}
                />
              </div>

              {/* Evaluation Feedback */}
              {state === 'evaluation' && evaluation && (
                <div className="animate-slide-up">
                  <EvaluationFeedback
                    evaluation={evaluation}
                    onNextChallenge={handleNextChallenge}
                    onTryAgain={handleTryAgain}
                    onChangeTopic={handleBackToTopics}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSettingsSave}
      />
    </>
  );
}

export default App;
