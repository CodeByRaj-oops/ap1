import axios from 'axios';

// Base API URL (will use the proxy in package.json in development)
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all books
export const getBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a specific book by ID
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get AI-generated summary for a book
export const getBookSummary = async (title, genre) => {
  try {
    const response = await api.post('/summary', { title, genre });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getBooks,
  getBookById,
  getBookSummary,
}; 