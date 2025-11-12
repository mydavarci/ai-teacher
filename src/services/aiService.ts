import { Challenge, Difficulty, Evaluation, Topic } from '../types';
import { AIConfig, APIMessage } from '../types/api';
import { createAIClient } from './apiClients';

/**
 * AI Service for generating challenges and evaluating code
 * Supports OpenAI, Anthropic Claude, and Google Gemini
 */

class AIService {
  private config: AIConfig | null = null;
  private readonly STORAGE_KEY = 'ai-trainer-config';

  constructor() {
    this.loadConfig();
  }

  /**
   * Load configuration from localStorage or environment variables
   */
  private loadConfig() {
    // Try localStorage first
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.config = JSON.parse(stored);
        return;
      } catch (e) {
        console.error('Failed to parse stored config');
      }
    }

    // Try environment variables
    const provider = import.meta.env.VITE_DEFAULT_PROVIDER as any;
    const apiKey =
      import.meta.env.VITE_OPENAI_API_KEY ||
      import.meta.env.VITE_ANTHROPIC_API_KEY ||
      import.meta.env.VITE_GEMINI_API_KEY;

    if (provider && apiKey) {
      this.config = { provider, apiKey };
    }
  }

  /**
   * Save configuration to localStorage
   */
  saveConfig(config: AIConfig) {
    this.config = config;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  /**
   * Get current configuration
   */
  getConfig(): AIConfig | null {
    return this.config;
  }

  /**
   * Check if AI is configured
   */
  isConfigured(): boolean {
    return this.config !== null && this.config.apiKey.length > 0;
  }

  /**
   * Clear configuration
   */
  clearConfig() {
    this.config = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Generate a coding challenge based on topic and difficulty
   */
  async generateChallenge(
    topic: Topic,
    difficulty: Difficulty,
    previousChallenges: Challenge[] = []
  ): Promise<Challenge> {
    if (!this.isConfigured()) {
      throw new Error('AI not configured. Please add your API key in settings.');
    }

    const prompt = this.buildChallengePrompt(topic, difficulty, previousChallenges);
    const messages: APIMessage[] = [
      {
        role: 'system',
        content: 'You are an expert programming instructor creating engaging coding challenges. Always respond with valid JSON only, no markdown code blocks or additional text.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      const client = createAIClient(this.config!);
      const response = await client.sendMessage(messages, 0.8);

      // Parse the JSON response
      const parsed = this.parseJSONResponse(response.content);

      return {
        id: `${topic.id}-${Date.now()}`,
        topic: topic.id,
        difficulty,
        instruction: parsed.instruction,
        starterCode: parsed.starterCode || '// Write your code here\n',
        hints: parsed.hints || []
      };
    } catch (error: any) {
      console.error('Challenge generation error:', error);
      throw new Error(`Failed to generate challenge: ${error.message}`);
    }
  }

  /**
   * Evaluate user's code and provide verbal feedback
   */
  async evaluateCode(
    challenge: Challenge,
    userCode: string,
    topic: Topic
  ): Promise<Evaluation> {
    if (!this.isConfigured()) {
      throw new Error('AI not configured. Please add your API key in settings.');
    }

    const prompt = this.buildEvaluationPrompt(challenge, userCode, topic);
    const messages: APIMessage[] = [
      {
        role: 'system',
        content: 'You are an encouraging programming tutor who provides constructive feedback. Always respond with valid JSON only, no markdown code blocks or additional text.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      const client = createAIClient(this.config!);
      const response = await client.sendMessage(messages, 0.7);

      // Parse the JSON response
      const parsed = this.parseJSONResponse(response.content);

      return {
        isCorrect: parsed.isCorrect || false,
        feedback: parsed.feedback,
        suggestions: parsed.suggestions || [],
        nextStep: parsed.nextStep
      };
    } catch (error: any) {
      console.error('Code evaluation error:', error);
      throw new Error(`Failed to evaluate code: ${error.message}`);
    }
  }

  /**
   * Parse JSON response, handling markdown code blocks
   */
  private parseJSONResponse(content: string): any {
    try {
      // Remove markdown code blocks if present
      let cleaned = content.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      return JSON.parse(cleaned);
    } catch (e) {
      // If parsing fails, try to extract JSON from the content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI response as JSON');
    }
  }

  /**
   * Build prompt for challenge generation
   */
  private buildChallengePrompt(
    topic: Topic,
    difficulty: Difficulty,
    previousChallenges: Challenge[]
  ): string {
    const previousInstructions = previousChallenges
      .slice(-3) // Only use last 3 to keep prompt manageable
      .map(c => `"${c.instruction}"`)
      .join(', ');

    return `Generate a ${difficulty} level JavaScript coding challenge for the topic: "${topic.title}"

Topic Description: ${topic.description}
Key Concepts: ${topic.subtopics.slice(0, 5).join(', ')}

Requirements:
1. Create a practical, hands-on challenge that teaches the concept
2. Write clear, conversational instructions (like talking to a student)
3. Include starter code if helpful (or an empty comment)
4. Provide 2-4 helpful hints
5. Make it appropriate for ${difficulty} difficulty level:
   - easy: Basic concepts, minimal complexity
   - medium: Combine concepts, require some problem-solving
   - hard: Complex logic, multiple concepts, edge cases
6. Avoid repeating these recent challenges: ${previousInstructions || 'none'}

Respond with ONLY a JSON object in this exact format (no markdown, no code blocks):
{
  "instruction": "Your conversational challenge instruction here",
  "starterCode": "// Optional starter code",
  "hints": ["Hint 1", "Hint 2", "Hint 3"]
}`;
  }

  /**
   * Build prompt for code evaluation
   */
  private buildEvaluationPrompt(
    challenge: Challenge,
    userCode: string,
    topic: Topic
  ): string {
    return `Evaluate this student's JavaScript code submission.

Challenge: ${challenge.instruction}
Topic: ${topic.title} (${topic.description})
Difficulty: ${challenge.difficulty}

Student's Code:
\`\`\`javascript
${userCode}
\`\`\`

Analyze the code and provide encouraging, constructive feedback:

1. Does it solve the challenge? (Check logic, not just syntax)
2. Is the approach appropriate for the topic?
3. What did they do well?
4. What could be improved?
5. What should they do next?

Guidelines:
- Be supportive and encouraging
- Focus on learning, not perfection
- Praise good attempts even if not perfect
- Provide specific, actionable suggestions
- Consider the difficulty level in your assessment

Respond with ONLY a JSON object in this exact format (no markdown, no code blocks):
{
  "isCorrect": true or false,
  "feedback": "Your warm, conversational feedback here (2-3 sentences)",
  "suggestions": ["Specific suggestion 1", "Specific suggestion 2", "Specific suggestion 3"],
  "nextStep": "What the student should do next (try harder challenge, practice more, new topic, etc.)"
}`;
  }
}

export const aiService = new AIService();
