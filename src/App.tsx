import { useState, useEffect } from 'react';
import TopicSelector from './components/TopicSelector';
import ChallengeView from './components/ChallengeView';
import CodeEditor from './components/CodeEditor';
import EvaluationFeedback from './components/EvaluationFeedback';
import { Topic, Difficulty, Challenge, Evaluation } from './types';
import { aiService } from './services/aiService';
import { Loader2 } from 'lucide-react';

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

  // Start a new challenge when topic is selected
  const handleTopicSelect = async (topic: Topic, difficulty: Difficulty) => {
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

    try {
      const challenge = await aiService.generateChallenge(topic, difficulty, history);
      setCurrentChallenge(challenge);
      setUserCode(challenge.starterCode);
      setState('challenge');
      setChallengeHistory([...history, challenge]);
    } catch (error) {
      console.error('Error loading challenge:', error);
      alert('Failed to load challenge. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit code for evaluation
  const handleSubmit = async () => {
    if (!currentChallenge || !selectedTopic || !userCode.trim()) {
      alert('Please write some code before submitting!');
      return;
    }

    setIsEvaluating(true);

    try {
      const result = await aiService.evaluateCode(
        currentChallenge,
        userCode,
        selectedTopic
      );
      setEvaluation(result);
      setState('evaluation');
    } catch (error) {
      console.error('Error evaluating code:', error);
      alert('Failed to evaluate code. Please try again.');
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
  };

  // Go back to topic selection
  const handleBackToTopics = () => {
    setState('topic-selection');
    setSelectedTopic(null);
    setCurrentChallenge(null);
    setUserCode('');
    setEvaluation(null);
    setChallengeHistory([]);
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

  // Render topic selection
  if (state === 'topic-selection') {
    return <TopicSelector onSelectTopic={handleTopicSelect} />;
  }

  // Render challenge/evaluation view
  return (
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
  );
}

export default App;
