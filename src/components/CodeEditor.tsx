import { Editor } from '@monaco-editor/react';
import { Rocket, RotateCcw, Code2, Zap } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  isEvaluating: boolean;
  starterCode: string;
}

export default function CodeEditor({
  code,
  onChange,
  onSubmit,
  onReset,
  isEvaluating
}: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-card overflow-hidden border-4 border-playful-purple shadow-playful">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-playful-purple to-happy-pink">
        <h3 className="text-lg md:text-xl font-playful font-bold text-white flex items-center gap-2 mb-2">
          <Code2 size={24} className="animate-wiggle" />
          Your Code Laboratory
          <Zap size={20} className="text-sunshine-yellow animate-sparkle" />
        </h3>
        <p className="text-white/90 text-sm font-friendly">
          Write your code below and launch it when you're ready!
        </p>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-gray-900">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            fontFamily: 'Fira Code, JetBrains Mono, Consolas, monospace',
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            lineHeight: 24,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 bg-gradient-to-r from-soft-cream to-white border-t-4 border-playful-purple/20">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-5 py-3 text-base font-bold text-deep-navy bg-gray-200 hover:bg-gray-300 rounded-child transition-all duration-200 hover:scale-105 hover:shadow-card active:scale-95 border-2 border-gray-300 font-playful"
            title="Start fresh with the original code"
          >
            <RotateCcw size={20} />
            🔄 Start Over
          </button>
          <button
            onClick={onSubmit}
            disabled={isEvaluating}
            className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-energetic-orange to-happy-pink hover:from-orange-600 hover:to-pink-600 rounded-child transition-all duration-200 hover:scale-105 hover:shadow-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-orange-400 font-playful"
          >
            {isEvaluating ? (
              <>
                <div className="animate-spin">⚙️</div>
                Checking Your Code...
              </>
            ) : (
              <>
                <Rocket size={24} className="animate-bounce-soft" />
                🚀 Launch My Code!
              </>
            )}
          </button>
        </div>
        <div className="mt-3 p-3 bg-sky-blue/10 rounded-child border-2 border-sky-blue/30">
          <p className="text-sm text-gray-700 font-friendly text-center">
            <strong className="text-sky-blue font-playful">💡 Pro Tip:</strong> Press the "Start Over" button anytime to get back to the beginning!
          </p>
        </div>
      </div>
    </div>
  );
}
