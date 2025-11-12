import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIConfig, APIMessage, AIResponse } from '../types/api';

/**
 * Abstract base class for AI API clients
 */
abstract class AIClient {
  abstract sendMessage(messages: APIMessage[], temperature?: number): Promise<AIResponse>;
}

/**
 * OpenAI API Client (GPT-4, GPT-3.5)
 */
export class OpenAIClient extends AIClient {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4') {
    super();
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
    });
    this.model = model;
  }

  async sendMessage(messages: APIMessage[], temperature: number = 0.7): Promise<AIResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content
        })),
        temperature,
        max_tokens: 2000
      });

      return {
        content: completion.choices[0]?.message?.content || '',
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0
        }
      };
    } catch (error: any) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  }
}

/**
 * Anthropic Claude API Client
 */
export class AnthropicClient extends AIClient {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = 'claude-3-5-sonnet-20241022') {
    super();
    this.client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
    });
    this.model = model;
  }

  async sendMessage(messages: APIMessage[], temperature: number = 0.7): Promise<AIResponse> {
    try {
      // Separate system message from other messages
      const systemMessage = messages.find(m => m.role === 'system');
      const conversationMessages = messages.filter(m => m.role !== 'system');

      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 2000,
        temperature,
        system: systemMessage?.content,
        messages: conversationMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }))
      });

      const content = response.content[0];
      const textContent = content.type === 'text' ? content.text : '';

      return {
        content: textContent,
        usage: {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens
        }
      };
    } catch (error: any) {
      throw new Error(`Anthropic API Error: ${error.message}`);
    }
  }
}

/**
 * Google Gemini API Client
 */
export class GeminiClient extends AIClient {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-2.0-flash-exp') {
    super();
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  async sendMessage(messages: APIMessage[], temperature: number = 0.7): Promise<AIResponse> {
    try {
      const model = this.client.getGenerativeModel({
        model: this.model,
        generationConfig: {
          temperature,
          maxOutputTokens: 2000,
        }
      });

      // Gemini doesn't use system messages in the same way
      // We'll prepend the system message to the first user message
      const systemMessage = messages.find(m => m.role === 'system');
      const conversationMessages = messages.filter(m => m.role !== 'system');

      // Convert messages to Gemini format
      const history = conversationMessages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const lastMessage = conversationMessages[conversationMessages.length - 1];
      const prompt = systemMessage
        ? `${systemMessage.content}\n\n${lastMessage.content}`
        : lastMessage.content;

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      const response = result.response;

      return {
        content: response.text(),
        usage: {
          promptTokens: 0, // Gemini doesn't provide token counts in the same way
          completionTokens: 0,
          totalTokens: 0
        }
      };
    } catch (error: any) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }
}

/**
 * Factory function to create the appropriate AI client
 */
export function createAIClient(config: AIConfig): AIClient {
  switch (config.provider) {
    case 'openai':
      return new OpenAIClient(config.apiKey, config.model || 'gpt-4');
    case 'anthropic':
      return new AnthropicClient(config.apiKey, config.model || 'claude-3-5-sonnet-20241022');
    case 'gemini':
      return new GeminiClient(config.apiKey, config.model || 'gemini-2.0-flash-exp');
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
}
