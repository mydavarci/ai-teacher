import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'variables',
    title: 'Variables & Data Types',
    description: 'Learn about var, let, const, and different data types in JavaScript',
    icon: '📦',
    subtopics: [
      'Variable declarations (var, let, const)',
      'Primitive types (string, number, boolean)',
      'Type coercion and conversion',
      'Undefined and null',
      'Symbols and BigInt'
    ]
  },
  {
    id: 'operators',
    title: 'Operators',
    description: 'Master arithmetic, comparison, logical, and assignment operators',
    icon: '➕',
    subtopics: [
      'Arithmetic operators',
      'Comparison operators',
      'Logical operators (&&, ||, !)',
      'Assignment operators',
      'Ternary operator'
    ]
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    description: 'Control program flow with if, else, and switch statements',
    icon: '🔀',
    subtopics: [
      'if/else statements',
      'else if chains',
      'switch statements',
      'Truthy and falsy values',
      'Short-circuit evaluation'
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    description: 'Iterate with for, while, and do-while loops',
    icon: '🔄',
    subtopics: [
      'for loops',
      'while loops',
      'do-while loops',
      'for...of loops',
      'for...in loops',
      'break and continue'
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Create reusable code with functions, arrow functions, and callbacks',
    icon: '⚡',
    subtopics: [
      'Function declarations',
      'Function expressions',
      'Arrow functions',
      'Parameters and arguments',
      'Return values',
      'Callback functions',
      'Higher-order functions'
    ]
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Work with arrays and array methods',
    icon: '📚',
    subtopics: [
      'Creating arrays',
      'Accessing elements',
      'Array methods (push, pop, shift, unshift)',
      'Array iteration (map, filter, reduce)',
      'Array searching (find, includes, indexOf)',
      'Sorting and reversing'
    ]
  },
  {
    id: 'objects',
    title: 'Objects',
    description: 'Understand object literals, properties, and methods',
    icon: '🎯',
    subtopics: [
      'Object literals',
      'Properties and values',
      'Methods',
      'Accessing properties (dot vs bracket)',
      'Object destructuring',
      'Object methods (keys, values, entries)'
    ]
  },
  {
    id: 'strings',
    title: 'String Manipulation',
    description: 'Master string methods and template literals',
    icon: '📝',
    subtopics: [
      'String methods (slice, substring, substr)',
      'Template literals',
      'String searching',
      'String transformation',
      'Regular expressions basics'
    ]
  },
  {
    id: 'dom',
    title: 'DOM Manipulation',
    description: 'Interact with HTML elements using JavaScript',
    icon: '🌐',
    subtopics: [
      'Selecting elements',
      'Modifying content and attributes',
      'Event listeners',
      'Creating and removing elements',
      'Class manipulation'
    ]
  },
  {
    id: 'async',
    title: 'Asynchronous JavaScript',
    description: 'Handle async operations with promises and async/await',
    icon: '⏱️',
    subtopics: [
      'Callbacks',
      'Promises',
      'async/await',
      'Fetch API',
      'Error handling in async code'
    ]
  },
  {
    id: 'classes',
    title: 'Classes & OOP',
    description: 'Object-oriented programming with classes and inheritance',
    icon: '🏗️',
    subtopics: [
      'Class declarations',
      'Constructors',
      'Methods and properties',
      'Inheritance',
      'Static methods',
      'Getters and setters'
    ]
  },
  {
    id: 'modules',
    title: 'Modules',
    description: 'Organize code with ES6 modules',
    icon: '📦',
    subtopics: [
      'Export and import',
      'Default exports',
      'Named exports',
      'Module patterns',
      'Dynamic imports'
    ]
  }
];
