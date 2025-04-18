import axios from 'axios';

// Base API URL
const API_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Search books by term (genre, title, author)
export const searchBooks = async (searchTerm) => {
  try {
    const response = await api.get(`/books/search?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Get a specific book by ID
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

// Generate AI summary for a book
export const generateBookSummary = async (title, genre) => {
  try {
    const response = await api.post('/summarize', { title, genre });
    return response.data;
  } catch (error) {
    console.error('Error generating book summary:', error);
    throw error;
  }
}; 