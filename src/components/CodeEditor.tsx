import { Editor } from '@monaco-editor/react';
import { Play, RotateCcw } from 'lucide-react';

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
  isEvaluating,
  starterCode
}: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200">Code Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={onSubmit}
            disabled={isEvaluating}
            className="flex items-center gap-1 px-4 py-1 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={14} />
            {isEvaluating ? 'Evaluating...' : 'Submit Code'}
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 }
          }}
        />
      </div>
    </div>
  );
}
