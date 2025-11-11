import { Challenge, Difficulty, Evaluation, Topic } from '../types';

/**
 * AI Service for generating challenges and evaluating code
 * This is a mock implementation - replace with actual AI API calls
 */

class AIService {
  private apiKey: string = '';
  private model: string = 'gpt-4'; // or claude, gemini, etc.

  setApiKey(key: string) {
    this.apiKey = key;
  }

  /**
   * Generate a coding challenge based on topic and difficulty
   */
  async generateChallenge(
    topic: Topic,
    difficulty: Difficulty,
    previousChallenges: Challenge[] = []
  ): Promise<Challenge> {
    // In production, this would call an AI API
    // For now, we'll use a sophisticated prompt-based generation

    const prompt = this.buildChallengePrompt(topic, difficulty, previousChallenges);

    // Mock AI response - replace with actual API call
    const response = await this.mockAICall(prompt);

    return {
      id: `${topic.id}-${Date.now()}`,
      topic: topic.id,
      difficulty,
      instruction: response.instruction,
      starterCode: response.starterCode,
      hints: response.hints
    };
  }

  /**
   * Evaluate user's code and provide verbal feedback
   */
  async evaluateCode(
    challenge: Challenge,
    userCode: string,
    topic: Topic
  ): Promise<Evaluation> {
    const prompt = this.buildEvaluationPrompt(challenge, userCode, topic);

    // Mock AI response - replace with actual API call
    const response = await this.mockAIEvaluation(challenge, userCode);

    return {
      isCorrect: response.isCorrect,
      feedback: response.feedback,
      suggestions: response.suggestions,
      nextStep: response.nextStep
    };
  }

  private buildChallengePrompt(
    topic: Topic,
    difficulty: Difficulty,
    previousChallenges: Challenge[]
  ): string {
    return `Generate a ${difficulty} JavaScript coding challenge for the topic: ${topic.title}.

Topic description: ${topic.description}
Subtopics: ${topic.subtopics.join(', ')}

Requirements:
- Create a practical, hands-on challenge
- Provide clear, conversational instructions
- Include starter code if appropriate
- Make it progressively harder based on difficulty level
- Avoid repeating previous challenges

Previous challenges to avoid: ${previousChallenges.map(c => c.instruction).join(', ')}

Return a JSON object with: instruction, starterCode, and hints array.`;
  }

  private buildEvaluationPrompt(
    challenge: Challenge,
    userCode: string,
    topic: Topic
  ): string {
    return `Evaluate this JavaScript code submission:

Challenge: ${challenge.instruction}
Topic: ${topic.title}
User's code:
${userCode}

Analyze the code and provide:
1. Whether it correctly solves the challenge
2. Verbal, conversational feedback (be encouraging and constructive)
3. Specific suggestions for improvement
4. What the next step should be (continue with same topic, increase difficulty, or move to next topic)

Return a JSON object with: isCorrect, feedback, suggestions array, and nextStep.`;
  }

  /**
   * Mock AI call for generating challenges
   * Replace this with actual AI API integration
   */
  private async mockAICall(prompt: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate challenges based on topic patterns
    const challenges = this.getTopicChallenges(prompt);
    return challenges;
  }

  /**
   * Mock AI evaluation
   * Replace this with actual AI API integration
   */
  private async mockAIEvaluation(challenge: Challenge, userCode: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Basic code analysis
    const hasCode = userCode.trim().length > 10;
    const hasSyntaxError = this.checkBasicSyntax(userCode);

    if (!hasCode) {
      return {
        isCorrect: false,
        feedback: "I see you haven't written much code yet. Don't worry! Take your time and give it a try. Start with the basics and build from there.",
        suggestions: [
          "Re-read the challenge instruction carefully",
          "Think about what the expected output should be",
          "Start with a simple approach first"
        ],
        nextStep: "Try solving the current challenge"
      };
    }

    if (hasSyntaxError) {
      return {
        isCorrect: false,
        feedback: `I noticed there might be a syntax error in your code. ${hasSyntaxError}. It's a common mistake - let's fix it and try again!`,
        suggestions: [
          "Check for missing brackets, parentheses, or semicolons",
          "Make sure variable names are spelled consistently",
          "Review the syntax for the language feature you're using"
        ],
        nextStep: "Fix the syntax error and resubmit"
      };
    }

    // For demonstration, we'll provide constructive feedback
    const topicAnalysis = this.analyzeCodeByTopic(challenge, userCode);

    return topicAnalysis;
  }

  private checkBasicSyntax(code: string): string | null {
    // Basic syntax checking
    const openBrackets = (code.match(/\{/g) || []).length;
    const closeBrackets = (code.match(/\}/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;

    if (openBrackets !== closeBrackets) {
      return "You have mismatched curly braces { }";
    }
    if (openParens !== closeParens) {
      return "You have mismatched parentheses ( )";
    }

    return null;
  }

  private analyzeCodeByTopic(challenge: Challenge, userCode: string): any {
    const code = userCode.toLowerCase();

    // Topic-specific analysis
    if (challenge.topic === 'variables') {
      const hasLet = code.includes('let');
      const hasConst = code.includes('const');
      const hasVar = code.includes('var');

      if (hasLet || hasConst) {
        return {
          isCorrect: true,
          feedback: "Excellent work! You've correctly used modern JavaScript variable declarations. " +
                   (hasConst ? "Great choice using 'const' for values that don't change. " : "") +
                   (hasLet ? "Good use of 'let' for variables that need to be reassigned. " : "") +
                   "You're understanding the fundamentals well!",
          suggestions: [
            "Try to use 'const' by default and 'let' only when reassignment is needed",
            "Avoid using 'var' in modern JavaScript",
            "Consider using descriptive variable names"
          ],
          nextStep: "Ready for the next challenge"
        };
      }
    }

    if (challenge.topic === 'functions') {
      const hasFunction = code.includes('function') || code.includes('=>');
      const hasReturn = code.includes('return');
      const hasParams = /function\s*\w*\s*\([^)]+\)/.test(code) || /\([^)]+\)\s*=>/.test(code);

      if (hasFunction) {
        return {
          isCorrect: true,
          feedback: `Great job creating a function! ${hasParams ? "You've successfully added parameters. " : ""}${hasReturn ? "And you're returning a value, which is perfect! " : ""}` +
                   "Functions are the building blocks of JavaScript - you're mastering an essential concept.",
          suggestions: [
            hasParams ? "Think about edge cases for your parameters" : "Consider adding parameters to make your function more flexible",
            hasReturn ? "Good use of return statement" : "Remember to return a value if needed",
            "Try writing the same function as an arrow function for practice"
          ],
          nextStep: "Ready for a more complex challenge"
        };
      }
    }

    // Default positive response
    return {
      isCorrect: true,
      feedback: "Good effort! Your code shows you're thinking about the problem. Keep experimenting and building on what you've learned. Every line of code you write makes you a better programmer!",
      suggestions: [
        "Consider the challenge requirements carefully",
        "Test your code with different inputs",
        "Think about edge cases"
      ],
      nextStep: "Continue practicing or try a harder challenge"
    };
  }

  private getTopicChallenges(prompt: string): any {
    // Extract difficulty and topic from prompt
    const difficulty = prompt.includes('easy') ? 'easy' :
                      prompt.includes('hard') ? 'hard' : 'medium';

    // Return different challenges based on topic keywords
    if (prompt.includes('Variables')) {
      if (difficulty === 'easy') {
        return {
          instruction: "Let's start with the basics! Create a variable called 'userName' using 'const' and assign it your name as a string. Then create another variable called 'age' using 'let' and assign it a number.",
          starterCode: "// Write your code here\n",
          hints: [
            "Use 'const' for values that won't change",
            "Use 'let' for values that might change",
            "Strings are enclosed in quotes"
          ]
        };
      } else if (difficulty === 'medium') {
        return {
          instruction: "Create three variables: 'temperature' (number), 'isCold' (boolean), and 'message' (string). Set isCold to true if temperature is below 15, false otherwise. Create a message that says whether it's cold or not.",
          starterCode: "// Declare your variables here\nconst temperature = 10;\n\n",
          hints: [
            "Use comparison operators for the boolean",
            "Template literals can help with the message",
            "Think about the relationship between the variables"
          ]
        };
      } else {
        return {
          instruction: "Demonstrate your understanding of variable scoping. Create a function that uses let, const, and shows the difference in their scope. Include an example of block scope and why var is problematic.",
          starterCode: "// Show variable scoping\nfunction demonstrateScope() {\n  // Your code here\n}\n",
          hints: [
            "Use curly braces to create a block scope",
            "Try accessing variables outside their scope",
            "Compare var hoisting with let/const"
          ]
        };
      }
    }

    if (prompt.includes('Functions')) {
      if (difficulty === 'easy') {
        return {
          instruction: "Create a function called 'greet' that takes two parameters: 'name' and 'timeOfDay'. The function should return a greeting message like 'Good morning, John!' Make it friendly and conversational!",
          starterCode: "// Create your function here\n",
          hints: [
            "Functions are created with the 'function' keyword or arrow syntax",
            "Parameters go inside the parentheses",
            "Use 'return' to send back the result"
          ]
        };
      } else if (difficulty === 'medium') {
        return {
          instruction: "Write a function called 'calculate' that takes three parameters: two numbers and an operation ('+', '-', '*', '/'). The function should perform the operation and return the result. Handle division by zero gracefully.",
          starterCode: "function calculate(num1, num2, operation) {\n  // Your code here\n}\n",
          hints: [
            "Use conditional statements to check the operation",
            "Remember to handle edge cases",
            "Return meaningful values or messages"
          ]
        };
      } else {
        return {
          instruction: "Create a higher-order function called 'retry' that takes a function and a number of attempts. It should try to execute the function, and if it fails, retry up to the specified number of times. Use callbacks and error handling.",
          starterCode: "function retry(fn, attempts) {\n  // Your implementation\n}\n\n// Test with this:\n// retry(() => { throw new Error('Failed'); }, 3);\n",
          hints: [
            "Higher-order functions work with other functions",
            "Use try-catch for error handling",
            "Think about recursion or loops for retrying"
          ]
        };
      }
    }

    if (prompt.includes('Arrays')) {
      if (difficulty === 'easy') {
        return {
          instruction: "Create an array called 'fruits' with 5 different fruit names. Then write code to add a new fruit to the end and remove the first fruit. Print the final array.",
          starterCode: "// Create and manipulate your array\n",
          hints: [
            "Arrays are created with square brackets []",
            "Use push() to add to the end",
            "Use shift() to remove from the beginning"
          ]
        };
      } else if (difficulty === 'medium') {
        return {
          instruction: "Given an array of numbers, write code that uses map(), filter(), and reduce() to: 1) Filter out odd numbers, 2) Square the remaining numbers, 3) Sum them all up. Do this in a chain of methods.",
          starterCode: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Your code here\n",
          hints: [
            "Chain methods using dot notation",
            "filter() returns elements that match a condition",
            "map() transforms each element",
            "reduce() combines elements into a single value"
          ]
        };
      }
    }

    if (prompt.includes('Objects')) {
      if (difficulty === 'easy') {
        return {
          instruction: "Create an object called 'person' with properties: name, age, and city. Then add a method called 'introduce' that returns a string introducing the person.",
          starterCode: "// Create your object here\n",
          hints: [
            "Objects are created with curly braces {}",
            "Properties are key-value pairs",
            "Methods are functions inside objects"
          ]
        };
      } else if (difficulty === 'medium') {
        return {
          instruction: "Create an object representing a shopping cart with methods: addItem(name, price), removeItem(name), and getTotal(). The cart should maintain an array of items internally.",
          starterCode: "const shoppingCart = {\n  // Your implementation\n};\n",
          hints: [
            "Use an internal array to store items",
            "Methods can modify the object's properties",
            "Use 'this' to reference the object itself"
          ]
        };
      }
    }

    // Default challenge
    return {
      instruction: "Write a small program that demonstrates your understanding of the current topic. Be creative and show what you've learned!",
      starterCode: "// Your code here\n",
      hints: [
        "Review the topic description",
        "Start with something simple",
        "Build complexity gradually"
      ]
    };
  }
}

export const aiService = new AIService();
