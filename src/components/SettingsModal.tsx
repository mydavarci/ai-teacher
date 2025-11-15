import { useState, useEffect } from 'react';
import { X, Settings, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { AIConfig, AIProvider } from '../types/api';
import { aiService } from '../services/aiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AIConfig) => void;
}

export default function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const config = aiService.getConfig();
      if (config) {
        setProvider(config.provider);
        setApiKey(config.apiKey);
        setModel(config.model || '');
      }
    }
  }, [isOpen]);

  const providers = [
    {
      id: 'openai' as AIProvider,
      name: 'OpenAI',
      description: 'GPT-4, GPT-3.5 Turbo',
      defaultModel: 'gpt-4',
      models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      icon: '🤖',
      getKeyUrl: 'https://platform.openai.com/api-keys',
      docUrl: 'https://platform.openai.com/docs'
    },
    {
      id: 'anthropic' as AIProvider,
      name: 'Anthropic',
      description: 'Claude 3.5 Sonnet, Claude 3 Opus',
      defaultModel: 'claude-3-5-sonnet-20241022',
      models: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229'],
      icon: '🧠',
      getKeyUrl: 'https://console.anthropic.com/settings/keys',
      docUrl: 'https://docs.anthropic.com/'
    },
    {
      id: 'gemini' as AIProvider,
      name: 'Google Gemini',
      description: 'Gemini 2.0 Flash, Gemini Pro',
      defaultModel: 'gemini-2.0-flash-exp',
      models: ['gemini-2.0-flash-exp', 'gemini-1.5-pro-latest', 'gemini-1.5-flash-latest'],
      icon: '✨',
      getKeyUrl: 'https://makersuite.google.com/app/apikey',
      docUrl: 'https://ai.google.dev/docs'
    }
  ];

  const selectedProvider = providers.find(p => p.id === provider)!;

  const handleProviderChange = (newProvider: AIProvider) => {
    setProvider(newProvider);
    const providerInfo = providers.find(p => p.id === newProvider)!;
    setModel(providerInfo.defaultModel);
    setTestResult(null);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const testConfig: AIConfig = {
        provider,
        apiKey: apiKey.trim(),
        model: model || selectedProvider.defaultModel
      };

      // Temporarily save config for testing
      aiService.saveConfig(testConfig);

      // Try to generate a simple test challenge
      const testTopic = {
        id: 'test',
        title: 'Variables',
        description: 'Testing API connection',
        icon: '📦',
        subtopics: ['var', 'let', 'const']
      };

      await aiService.generateChallenge(testTopic, 'easy', []);

      setTestResult({
        success: true,
        message: `Successfully connected to ${selectedProvider.name}!`
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Connection failed: ${error.message || 'Unknown error'}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key' });
      return;
    }

    const config: AIConfig = {
      provider,
      apiKey: apiKey.trim(),
      model: model || selectedProvider.defaultModel
    };

    onSave(config);
    onClose();
  };

  const handleClear = () => {
    aiService.clearConfig();
    setApiKey('');
    setModel('');
    setTestResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-sky-blue shadow-playful">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-sky-blue bg-gradient-to-r from-sky-blue to-playful-purple">
          <div className="flex items-center gap-3">
            <Settings className="text-white" size={28} />
            <h2 className="text-2xl md:text-3xl font-playful font-bold text-white">AI Configuration</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-soft-cream transition-colors bg-white/20 rounded-child p-2 hover:bg-white/30"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-sky-blue/10 border-2 border-sky-blue rounded-child p-4">
            <p className="text-deep-navy text-sm font-friendly">
              <strong className="font-playful">Note:</strong> Your API key is stored locally in your browser and never sent to our servers.
              It's only used to communicate directly with your chosen AI provider.
            </p>
          </div>

          {/* Provider Selection */}
          <div>
            <label className="block text-base font-playful font-bold text-deep-navy mb-3">
              Select AI Provider
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {providers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`p-4 rounded-child border-2 transition-all text-left hover:shadow-card ${
                    provider === p.id
                      ? 'border-sky-blue bg-sky-blue/10'
                      : 'border-gray-300 bg-white hover:border-sky-blue/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{p.icon}</div>
                  <div className="font-playful font-bold text-deep-navy mb-1">{p.name}</div>
                  <div className="text-xs text-gray-600 font-friendly">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-base font-playful font-bold text-deep-navy mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${selectedProvider.name} API key`}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-child text-deep-navy placeholder-gray-400 focus:outline-none focus:border-sky-blue font-friendly"
            />
            <div className="flex items-center gap-4 mt-2">
              <a
                href={selectedProvider.getKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
              >
                <ExternalLink size={14} />
                Get {selectedProvider.name} API Key
              </a>
              <a
                href={selectedProvider.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-1"
              >
                <ExternalLink size={14} />
                Documentation
              </a>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Model (Optional)
            </label>
            <select
              value={model || selectedProvider.defaultModel}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              {selectedProvider.models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Default: {selectedProvider.defaultModel}
            </p>
          </div>

          {/* Test Result */}
          {testResult && (
            <div
              className={`p-4 rounded-lg border ${
                testResult.success
                  ? 'bg-green-900/20 border-green-500/30'
                  : 'bg-red-900/20 border-red-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                {testResult.success ? (
                  <Check className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                ) : (
                  <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                )}
                <p className={`text-sm ${testResult.success ? 'text-green-200' : 'text-red-200'}`}>
                  {testResult.message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-6 border-t-4 border-sky-blue bg-soft-cream">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 hover:text-deep-navy transition-colors font-friendly font-semibold"
          >
            Clear Configuration
          </button>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleTest}
              disabled={isTesting}
              className="px-5 py-3 bg-gray-300 hover:bg-gray-400 text-deep-navy rounded-child transition-all font-playful font-bold disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-400"
            >
              {isTesting ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-sky-blue to-playful-purple hover:from-blue-600 hover:to-purple-600 text-white font-playful font-bold rounded-child transition-all border-2 border-sky-blue"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
