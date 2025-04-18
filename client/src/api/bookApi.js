import axios from 'axios';

// Try with both absolute and relative URLs - some setups need one or the other
const API_BASE_ABSOLUTE = 'http://localhost:5000/api';
const API_BASE_RELATIVE = '/api';

// Function to test if the server is reachable
const testApiConnection = async (url) => {
  try {
    const response = await axios.get(`${url}/health`, { timeout: 2000 });
    return response.status === 200;
  } catch (error) {
    console.log(`Failed to connect to ${url}: ${error.message}`);
    return false;
  }
};

// Determine which base URL to use
let baseURL = API_BASE_ABSOLUTE;

// Create axios instance with better error handling
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// If the first API call fails, try the alternate URL
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Only try URL switching on the first failed request
    if (error.code === 'ERR_NETWORK' && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try the other URL
      const alternateURL = baseURL === API_BASE_ABSOLUTE ? API_BASE_RELATIVE : API_BASE_ABSOLUTE;
      const isAlternateReachable = await testApiConnection(alternateURL);
      
      if (isAlternateReachable) {
        console.log(`Switching to alternate URL: ${alternateURL}`);
        baseURL = alternateURL;
        originalRequest.baseURL = alternateURL;
        return axios(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

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

// Search books by term
export const searchBooks = async (searchTerm) => {
  try {
    const response = await api.get(`/books/search?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Get a book by ID
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

// Generate book summary
export const generateBookSummary = async (title, author, genre) => {
  try {
    const response = await api.post('/summarize', { title, author, genre });
    return response.data;
  } catch (error) {
    console.error('Error generating book summary:', error);
    throw error;
  }
};

const bookApi = {
  getAllBooks,
  searchBooks,
  getBookById,
  generateBookSummary,
};

export default bookApi; 