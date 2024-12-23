import type { Question } from '../models/Question.js';

const BASE_URL = 'http://127.0.0.1:3001'; // Backend URL, update if necessary

/**
 * Fetch random questions from the API.
 * @returns {Promise<Question[]>} A promise that resolves to an array of questions.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getQuestions = async (): Promise<Question[]> => {
  try {
    console.log('Attempting to fetch questions from API...');

    // Make the fetch request
    const response = await fetch(`${BASE_URL}/api/questions/random`);
    console.log('Response received with status:', response.status);

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parse and return the data
    const data: Question[] = await response.json();
    console.log('Fetched questions:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

