require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here', // Replace with your API key in .env file
});

// Book database (static for this example)
const books = [
  { id: 1, title: 'Dune', author: 'Frank Herbert', genre: 'science fiction', coverUrl: 'https://source.unsplash.com/300x450/?book,scifi' },
  { id: 2, title: 'The Shining', author: 'Stephen King', genre: 'horror', coverUrl: 'https://source.unsplash.com/300x450/?book,horror' },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'romance', coverUrl: 'https://source.unsplash.com/300x450/?book,romance' },
  { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasy', coverUrl: 'https://source.unsplash.com/300x450/?book,fantasy' },
  { id: 5, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'thriller', coverUrl: 'https://source.unsplash.com/300x450/?book,thriller' },
  { id: 6, title: 'The Martian', author: 'Andy Weir', genre: 'science fiction', coverUrl: 'https://source.unsplash.com/300x450/?book,mars' },
  { id: 7, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'fiction', coverUrl: 'https://source.unsplash.com/300x450/?book,classic' },
  { id: 8, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'mystery', coverUrl: 'https://source.unsplash.com/300x450/?book,mystery' },
  { id: 9, title: '1984', author: 'George Orwell', genre: 'dystopian', coverUrl: 'https://source.unsplash.com/300x450/?book,dystopian' },
  { id: 10, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'classic', coverUrl: 'https://source.unsplash.com/300x450/?book,gatsby' },
  { id: 11, title: 'Atomic Habits', author: 'James Clear', genre: 'self development', coverUrl: 'https://source.unsplash.com/300x450/?book,habits' },
  { id: 12, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', genre: 'self development', coverUrl: 'https://source.unsplash.com/300x450/?book,effective' },
  { id: 13, title: 'Good Omens', author: 'Terry Pratchett & Neil Gaiman', genre: 'comedy', coverUrl: 'https://source.unsplash.com/300x450/?book,comedy' },
  { id: 14, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'comedy', coverUrl: 'https://source.unsplash.com/300x450/?book,galaxy' },
  { id: 15, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'finance', coverUrl: 'https://source.unsplash.com/300x450/?book,finance' }
];

// API Routes
// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get books by search term (genre, title, author)
app.get('/api/books/search', (req, res) => {
  const searchTerm = req.query.q?.toLowerCase() || '';
  
  if (!searchTerm) {
    return res.json(books);
  }

  const filteredBooks = books.filter(book => 
    book.genre.toLowerCase().includes(searchTerm) || 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );
  
  res.json(filteredBooks);
});

// Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Generate a book summary using OpenAI API
app.post('/api/summarize', async (req, res) => {
  try {
    const { title, genre } = req.body;
    
    if (!title || !genre) {
      return res.status(400).json({ error: 'Title and genre are required' });
    }

    // Format the prompt based on the genre
    let prompt = `Summarize the book "${title}" in the tone and style of a ${genre} novel.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: `You are an AI that generates book summaries in the style of ${genre} novels.` },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary', details: error.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 