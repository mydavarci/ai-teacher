# AI Code Trainer 🚀

An interactive, AI-powered code training platform that helps you master JavaScript through personalized challenges and intelligent feedback.

## Features ✨

- **Built-in IDE Interface**: Write and test your code directly in a professional Monaco Editor (VS Code's editor)
- **Real AI Integration**: Powered by OpenAI GPT-4, Anthropic Claude, or Google Gemini
- **AI-Generated Challenges**: Dynamic challenges tailored to your selected topic and difficulty level
- **12 Comprehensive Topics**: From variables and functions to async JavaScript and OOP
- **3 Difficulty Levels**: Easy, Medium, and Hard challenges to match your skill level
- **Verbal AI Feedback**: Get conversational, encouraging feedback on your code - no formal tests required
- **Continuous Learning**: Practice as many challenges as you want until you're ready to stop
- **Hints System**: Get helpful hints when you need a nudge in the right direction
- **Modern UI**: Beautiful, responsive design with dark mode
- **Flexible Configuration**: Easy-to-use settings UI with API key management

## Topics Covered 📚

1. **Variables & Data Types** - var, let, const, primitive types
2. **Operators** - Arithmetic, comparison, logical operators
3. **Conditionals** - if/else, switch statements
4. **Loops** - for, while, do-while loops
5. **Functions** - Function declarations, arrow functions, callbacks
6. **Arrays** - Array methods, iteration, manipulation
7. **Objects** - Object literals, properties, methods
8. **String Manipulation** - String methods, template literals
9. **DOM Manipulation** - Working with HTML elements
10. **Asynchronous JavaScript** - Promises, async/await
11. **Classes & OOP** - Object-oriented programming
12. **Modules** - ES6 imports and exports

## Getting Started 🏁

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- An API key from one of these providers:
  - [OpenAI](https://platform.openai.com/api-keys) (GPT-4, GPT-3.5)
  - [Anthropic](https://console.anthropic.com/settings/keys) (Claude 3.5 Sonnet)
  - [Google AI](https://makersuite.google.com/app/apikey) (Gemini 2.0 Flash)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-teacher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AI API (Choose one method)**

   **Method 1: Using the Settings UI (Recommended)**
   - Start the app and click the "Settings" button in the top-right
   - Select your AI provider (OpenAI, Anthropic, or Google Gemini)
   - Enter your API key
   - Click "Test Connection" to verify
   - Click "Save & Close"

   **Method 2: Using Environment Variables**
   - Copy `.env.example` to `.env`
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your API key:
     ```env
     # For OpenAI
     VITE_OPENAI_API_KEY=sk-...
     VITE_DEFAULT_PROVIDER=openai

     # For Anthropic Claude
     VITE_ANTHROPIC_API_KEY=sk-ant-...
     VITE_DEFAULT_PROVIDER=anthropic

     # For Google Gemini
     VITE_GEMINI_API_KEY=...
     VITE_DEFAULT_PROVIDER=gemini
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Use 🎯

1. **Configure AI**: Click the "Settings" button and add your API key (first-time setup only)
2. **Select a Topic**: Choose from 12 JavaScript topics based on what you want to learn
3. **Pick Difficulty**: Select Easy, Medium, or Hard based on your comfort level
4. **Read the Challenge**: Carefully read the AI-generated challenge instruction
5. **Write Your Code**: Use the built-in editor to write your solution
6. **Submit for Evaluation**: Click "Submit Code" to get AI feedback
7. **Learn from Feedback**: Read the personalized feedback and suggestions
8. **Continue or Change**: Move to the next challenge, try again, or change topics

### Supported AI Providers

| Provider | Models | Best For |
|----------|--------|----------|
| **OpenAI** | GPT-4, GPT-4 Turbo, GPT-3.5 | Most reliable, excellent code generation |
| **Anthropic** | Claude 3.5 Sonnet, Claude 3 Opus | Detailed feedback, very conversational |
| **Google Gemini** | Gemini 2.0 Flash, Gemini 1.5 Pro | Fast responses, good for quick iterations |

## Project Structure 📁

```
ai-teacher/
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx        # Monaco editor component
│   │   ├── TopicSelector.tsx     # Topic selection screen
│   │   ├── ChallengeView.tsx     # Challenge display
│   │   └── EvaluationFeedback.tsx # AI feedback display
│   ├── data/
│   │   └── topics.ts              # JavaScript topics curriculum
│   ├── services/
│   │   └── aiService.ts           # AI challenge generation & evaluation
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Technology Stack 💻

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: OpenAI API, Anthropic API, Google Generative AI
- **State Management**: React Hooks + localStorage

## Configuration 🛠️

### API Key Security

Your API key is:
- Stored locally in your browser's localStorage
- Never sent to any server except your chosen AI provider
- Can be cleared anytime through the settings

For production deployments, consider:
- Using a backend proxy to keep API keys server-side
- Implementing rate limiting
- Adding user authentication

### Adding New Topics

To add new topics:

1. Open `src/data/topics.ts`
2. Add a new topic object to the `topics` array
3. Update the AI service to handle the new topic's challenges

## Building for Production 🏗️

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail 🔍

### AI Challenge Generation

The AI generates unique challenges based on:
- Selected topic and its subtopics
- Difficulty level (easy, medium, hard)
- Your previous challenges (to avoid repetition)
- Best practices for that specific JavaScript concept

### Intelligent Code Evaluation

The AI evaluates your code by:
- Analyzing syntax and structure
- Checking if it solves the challenge correctly
- Providing conversational, encouraging feedback
- Offering specific suggestions for improvement
- Recommending next steps (continue, try harder, or new topic)

### Continuous Learning Flow

The app supports unlimited practice:
- Complete a challenge → Get feedback → Choose next action
- Options: Next challenge, Try again, or Change topic
- No time limits or pressure
- Learn at your own pace

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the MIT License.

## Support 💬

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy Coding! 🎉**

Master JavaScript one challenge at a time with AI-powered guidance!
