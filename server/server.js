require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure OpenAI with the API key from .env
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY || 
    process.env.OPENAI_API_KEY === 'your_openai_api_key_here' ||
    process.env.OPENAI_API_KEY === 'sk-your-valid-api-key-here') {
  console.warn('\x1b[33m%s\x1b[0m', 'Warning: OpenAI API key is not set or using default value. Summary generation will fail.');
}

// Function to generate summary using OpenAI API
async function generateSummary(text) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating summary:", error.response ? error.response.data : error.message);
    throw error;
  }
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Book database (dummy data)
const books = [
  { id: 1, title: 'Dune', author: 'Frank Herbert', genre: 'science fiction', coverUrl: 'https://source.unsplash.com/300x450/?book,scifi' },
  { id: 2, title: 'The Shining', author: 'Stephen King', genre: 'horror', coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg' },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'romance', coverUrl: 'https://source.unsplash.com/300x450/?book,romance' },
  { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasy', coverUrl: 'https://source.unsplash.com/300x450/?book,fantasy' },
  { id: 5, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'thriller', coverUrl: 'https://source.unsplash.com/300x450/?book,thriller' },
  { id: 6, title: 'The Martian', author: 'Andy Weir', genre: 'science fiction', coverUrl: 'https://source.unsplash.com/300x450/?book,mars' },
  { id: 7, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'classic', coverUrl: 'https://source.unsplash.com/300x450/?book,classic' },
  { id: 8, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'mystery', coverUrl: 'https://source.unsplash.com/300x450/?book,mystery' },
  { id: 9, title: '1984', author: 'George Orwell', genre: 'dystopian', coverUrl: 'https://source.unsplash.com/300x450/?book,dystopian' },
  { id: 10, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'classic', coverUrl: 'https://source.unsplash.com/300x450/?book,gatsby' },
  { id: 11, title: 'Atomic Habits', author: 'James Clear', genre: 'self development', coverUrl: 'https://source.unsplash.com/300x450/?book,habits' },
  { id: 12, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', genre: 'self development', coverUrl: 'https://source.unsplash.com/300x450/?book,effective' },
  { id: 13, title: 'Good Omens', author: 'Terry Pratchett & Neil Gaiman', genre: 'comedy', coverUrl: 'https://source.unsplash.com/300x450/?book,comedy' },
  { id: 14, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'comedy', coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559986152i/386162.jpg' },
  { id: 15, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'finance', coverUrl: 'https://source.unsplash.com/300x450/?book,finance' }
];

// Helper function to fetch book cover from Google Books API
async function fetchBookCover(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author}`);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`,
      { 
        timeout: 3000, // Add timeout to prevent long-hanging requests
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (response.data.items && response.data.items[0] && 
        response.data.items[0].volumeInfo && 
        response.data.items[0].volumeInfo.imageLinks) {
      // Return thumbnail URL or larger image if available
      const imageLinks = response.data.items[0].volumeInfo.imageLinks;
      return imageLinks.thumbnail || imageLinks.smallThumbnail;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching book cover for ${title}:`, error.message);
    // Don't let the error propagate up
    return null;
  }
}

// Mock summaries for books when API key is invalid
const mockSummaries = {
  "The Martian": "In Andy Weir's 'The Martian,' astronaut Mark Watney finds himself stranded alone on Mars after his crew evacuates during a violent dust storm, believing him dead. Using his botanical expertise and engineering skills, Watney faces the harsh Martian environment with limited supplies while devising ingenious solutions to grow food, create water, and establish communication with NASA. The novel masterfully balances scientific accuracy with Watney's irreverent humor and determination as he solves one seemingly impossible problem after another. Through his struggle and the global effort to rescue him, the novel explores themes of human ingenuity, resilience, and the practical application of scientific knowledge, demonstrating how human creativity and problem-solving can overcome the most daunting challenges even in the most hostile environment imaginable.",
  "Dune": "Frank Herbert's 'Dune' follows young Paul Atreides, whose family accepts stewardship of the desert planet Arrakis, the universe's only source of the valuable spice melange. When treachery leads to his father's downfall, Paul escapes into the desert and is adopted by the native Fremen. Developing heightened awareness and prescient abilities due to spice exposure, Paul becomes the messianic leader 'Muad'Dib,' using Fremen's fierce fighting skills to reclaim Arrakis. Herbert masterfully weaves ecological concerns, political intrigue, and religious prophecy into this science fiction epic, examining themes of power, religion, and human evolution while creating a richly detailed universe with complex characters who navigate treacherous waters of imperial politics and environmental extremes.",
  "Pride and Prejudice": "Jane Austen's 'Pride and Prejudice' follows the spirited Elizabeth Bennet as she navigates the rigid social hierarchies of early 19th-century England. When she meets the wealthy, reserved Mr. Darcy, their mutual prejudice prevents any romantic possibility. After Darcy's surprise proposal and subsequent rejection, Elizabeth gradually reassesses her opinions as she learns of his true character through his letter and actions at Pemberley. Meanwhile, family crises involving her sister Lydia's elopement reveal Darcy's quiet generosity. Austen's wit and precise social commentary shine through the romantic plot as both protagonists overcome their flaws—Elizabeth her prejudice and Darcy his pride—to find mutual respect and love. The novel brilliantly examines personal growth, class distinctions, and how preconceptions can cloud judgment while celebrating independent thinking and the possibility of societal change through individual transformation.",
  "1984": "George Orwell's '1984' depicts a dystopian world where Winston Smith, a low-ranking member of the ruling Party in Oceania, secretly rebels against the totalitarian government and its figurehead, Big Brother. In a society where independent thought is 'thoughtcrime,' constant surveillance is the norm, and history is continuously rewritten to suit Party needs, Winston finds forbidden love with Julia and seeks connection with a rumored resistance movement. Orwell's chilling narrative follows Winston's doomed attempts at freedom as he's eventually captured by the Thought Police and subjected to devastating torture in Room 101 until he betrays everything he values. With its exploration of psychological manipulation, perversion of truth, and the systematic crushing of human spirit, the novel remains a definitive warning about the dangers of totalitarianism and the fragility of individual liberty in the face of overwhelming state power."
};

// Function to get a mock summary based on book title
function getMockSummary(title, author, genre) {
  // Check for exact matches first
  if (mockSummaries[title]) {
    return mockSummaries[title];
  }
  
  // Look for partial matches
  for (const bookTitle in mockSummaries) {
    if (title.toLowerCase().includes(bookTitle.toLowerCase()) || 
        bookTitle.toLowerCase().includes(title.toLowerCase())) {
      return mockSummaries[bookTitle];
    }
  }
  
  // Generate a generic summary if no match found
  return `This ${genre || 'interesting'} book by ${author || 'the author'} titled "${title}" follows a compelling protagonist through various challenges. The main character must overcome significant obstacles while navigating complex relationships and situations. Through vivid storytelling and character development, the narrative explores themes of resilience, growth, and human connection. The book's unique perspective offers readers insights into the human condition while maintaining an engaging plot that keeps readers invested until the final page.`;
}

// Routes
// Health check endpoint to verify server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    console.log('GET /api/books called');
    // Loop through books and fetch covers if needed
    const booksWithCovers = await Promise.all(
      books.map(async (book) => {
        // If using placeholder images from Unsplash, try to get a real cover
        if (book.coverUrl.includes('unsplash')) {
          const coverUrl = await fetchBookCover(book.title, book.author);
          if (coverUrl) {
            return { ...book, coverUrl };
          }
        }
        return book;
      })
    );
    console.log(`Returning ${booksWithCovers.length} books`);
    res.json(booksWithCovers);
  } catch (error) {
    console.error('Error fetching book covers:', error);
    res.json(books); // Fallback to original books
  }
});

// Search books by genre, title, or author
app.get('/api/books/search', async (req, res) => {
  const searchTerm = req.query.q?.toLowerCase() || '';
  
  if (!searchTerm) {
    return res.json(books);
  }

  const filteredBooks = books.filter(book => 
    book.genre.toLowerCase().includes(searchTerm) || 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );

  try {
    // Loop through filtered books and fetch covers if needed
    const booksWithCovers = await Promise.all(
      filteredBooks.map(async (book) => {
        // If using placeholder images from Unsplash, try to get a real cover
        if (book.coverUrl.includes('unsplash')) {
          const coverUrl = await fetchBookCover(book.title, book.author);
          if (coverUrl) {
            return { ...book, coverUrl };
          }
        }
        return book;
      })
    );
    res.json(booksWithCovers);
  } catch (error) {
    console.error('Error fetching book covers:', error);
    res.json(filteredBooks); // Fallback to filtered books without real covers
  }
});

// Get specific book by ID
app.get('/api/books/:id', async (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  
  try {
    // If using placeholder images from Unsplash, try to get a real cover
    if (book.coverUrl.includes('unsplash')) {
      const coverUrl = await fetchBookCover(book.title, book.author);
      if (coverUrl) {
        return res.json({ ...book, coverUrl });
      }
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book cover:', error);
    res.json(book); // Fallback to original book without real cover
  }
});

// Generate AI summary based on book title and genre
app.post('/api/summarize', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    console.log(`Generating summary for "${title}" by ${author || 'unknown author'} (${genre || 'no genre specified'})`);

    // Check if OpenAI API key is valid
    if (!process.env.OPENAI_API_KEY || 
        process.env.OPENAI_API_KEY === 'your_openai_api_key_here' ||
        process.env.OPENAI_API_KEY === 'sk-your-valid-api-key-here' ||
        process.env.OPENAI_API_KEY.length < 20) {
      
      console.warn('Using mock summary due to API key issues');
      const mockSummary = getMockSummary(title, author, genre);
      
      // Add a slight delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return res.json({ 
        summary: mockSummary,
        source: 'mock' // Indicate this is a mock response
      });
    }

    // Format the prompt for the summary
    const promptTemplate = `Summarize the following book:
Title: ${title}
Author: ${author || 'Unknown'}
Genre: ${genre || 'Not specified'}

Your summary should:
- Introduce the protagonist and the setting.
- Describe the main conflict and survival strategies employed.
- Highlight the novel's tone, emphasizing ${genre ? `elements common in ${genre} novels` : 'the novel\'s unique style'}.
- Conclude with the overarching themes of resilience and human ingenuity.
Format the summary as a single paragraph in plain text.`;

    try {
      // Try to generate the summary with OpenAI
      const summary = await generateSummary(promptTemplate);
      console.log('Summary generated successfully');
      res.json({ 
        summary,
        source: 'api' // Indicate this is from the actual API
      });
    } catch (apiError) {
      // Fallback to mock summary if API call fails
      console.error('API call failed, using mock summary:', apiError.message);
      const mockSummary = getMockSummary(title, author, genre);
      res.json({ 
        summary: mockSummary,
        source: 'mock' // Indicate this is a mock response
      });
    }
  } catch (error) {
    console.error('Error in summary generation:', error);
    
    // More detailed error response
    let errorMessage = 'Failed to generate summary';
    let errorDetails = error.message;
    
    if (error.response) {
      errorDetails = `API Error: ${JSON.stringify(error.response.data || {})}`;
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to OpenAI API';
      errorDetails = 'Network connection issue. Please check your internet connection.';
    } else if (error.message.includes('authentication')) {
      errorMessage = 'Authentication failed with OpenAI';
      errorDetails = 'Your API key may be invalid or expired.';
    } else if (error.message.includes('rate limit')) {
      errorMessage = 'OpenAI API rate limit exceeded';
      errorDetails = 'The application has hit OpenAI rate limits. Please try again later.';
    }
    
    res.status(500).json({ 
      error: errorMessage, 
      details: errorDetails 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 