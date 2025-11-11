# AI Code Trainer 🚀

An interactive, AI-powered code training platform that helps you master JavaScript through personalized challenges and intelligent feedback.

## Features ✨

- **Built-in IDE Interface**: Write and test your code directly in a professional Monaco Editor (VS Code's editor)
- **AI-Generated Challenges**: Dynamic challenges tailored to your selected topic and difficulty level
- **12 Comprehensive Topics**: From variables and functions to async JavaScript and OOP
- **3 Difficulty Levels**: Easy, Medium, and Hard challenges to match your skill level
- **Verbal AI Feedback**: Get conversational, encouraging feedback on your code - no formal tests required
- **Continuous Learning**: Practice as many challenges as you want until you're ready to stop
- **Hints System**: Get helpful hints when you need a nudge in the right direction
- **Modern UI**: Beautiful, responsive design with dark mode

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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Use 🎯

1. **Select a Topic**: Choose from 12 JavaScript topics based on what you want to learn
2. **Pick Difficulty**: Select Easy, Medium, or Hard based on your comfort level
3. **Read the Challenge**: Carefully read the AI-generated challenge instruction
4. **Write Your Code**: Use the built-in editor to write your solution
5. **Submit for Evaluation**: Click "Submit Code" to get AI feedback
6. **Learn from Feedback**: Read the personalized feedback and suggestions
7. **Continue or Change**: Move to the next challenge, try again, or change topics

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
- **AI Integration**: Mock service (ready for real AI API integration)

## Customization 🛠️

### Integrating a Real AI API

The current implementation uses mock AI responses. To integrate a real AI service (like OpenAI, Claude, or Google Gemini):

1. Open `src/services/aiService.ts`
2. Replace the `mockAICall` and `mockAIEvaluation` methods with actual API calls
3. Add your API key to the service

Example for OpenAI:

```typescript
async generateChallenge(topic: Topic, difficulty: Difficulty): Promise<Challenge> {
  const prompt = this.buildChallengePrompt(topic, difficulty);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
```

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
