import { useState, useEffect } from 'react';
import TopicSelector from './components/TopicSelector';
import ChallengeView from './components/ChallengeView';
import CodeEditor from './components/CodeEditor';
import EvaluationFeedback from './components/EvaluationFeedback';
import SettingsModal from './components/SettingsModal';
import { Topic, Difficulty, Challenge, Evaluation } from './types';
import { AIConfig } from './types/api';
import { aiService } from './services/aiService';
import { Loader2, Settings, AlertCircle } from 'lucide-react';

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

  // Check if AI is configured on mount
  useEffect(() => {
    setIsConfigured(aiService.isConfigured());
  }, []);

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

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Generating your challenge...</p>
          <p className="text-gray-400 text-sm mt-2">The AI is crafting a perfect challenge for you</p>
        </div>
      </div>
    );
  }

  // Settings button component
  const SettingsButton = () => (
    <button
      onClick={() => setShowSettings(true)}
      className="fixed top-4 right-4 z-40 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
      title="Configure AI API"
    >
      <Settings size={18} />
      <span className="hidden sm:inline">
        {isConfigured ? 'Settings' : 'Setup Required'}
      </span>
      {!isConfigured && (
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      )}
    </button>
  );

  // Error banner component
  const ErrorBanner = () => error ? (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-lg w-full mx-4">
      <div className="bg-red-900/90 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-red-100 text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
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
      <ErrorBanner />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Panel - Challenge Instructions */}
            <div className="flex flex-col">
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
              <div className="flex-1 min-h-0">
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
                <div className="max-h-[400px] overflow-y-auto">
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
