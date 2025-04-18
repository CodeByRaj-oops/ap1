# 📚 AI-Powered Book Recommender and Genre-Based Summarizer

A full-stack web application that recommends books based on genre and generates AI-powered summaries that match the tone and style of each genre.

![Book Recommender App](https://source.unsplash.com/1200x630/?books,library)

## 🌟 Features

- **Genre-Based Book Search**: Find books by searching for genres like "horror", "comedy", "science fiction", etc.
- **AI-Generated Summaries**: Get custom book summaries written in the style of the book's genre using OpenAI's GPT model
- **Responsive Design**: Modern, clean UI built with React and Tailwind CSS that works on all device sizes
- **Real Book Covers**: Integration with Google Books API to display authentic book covers

## 🛠️ Tech Stack

### Frontend
- React 18 with hooks for state management
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Vite for fast development and optimized builds

### Backend
- Node.js runtime environment
- Express.js web framework
- OpenAI API for generating book summaries
- Axios for external API requests
- CORS enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- OpenAI API key (for AI-generated summaries)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CodeByRaj-oops/bookf.git
   cd bookf
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server and client dependencies
   npm run install:server
   npm run install:client
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the `server` directory with the following content:
     ```
     PORT=5000
     OPENAI_API_KEY=your_openai_api_key_here
     NODE_ENV=development
     ```
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

### Running the Application

#### Using npm scripts (recommended):
```bash
# Start both frontend and backend
npm start

# Start only the backend
npm run server

# Start only the frontend
npm run client
```

#### For Windows PowerShell users:
```powershell
# Start both frontend and backend using the batch file
./start.bat

# Or run the server and client individually
cd server; npm run dev
cd client; npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📋 API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/search?q=term` - Search books by genre, title, or author
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/summarize` - Generate a genre-based summary (requires title and genre in request body)

## 🔍 How It Works

1. **Search for Books**: Use the search bar to find books by genre, title, or author
2. **Select a Book**: Click on any book card to view its details
3. **AI Summary Generation**: The app sends the book title and genre to OpenAI API with a prompt designed to create a summary in the genre's style
4. **View Summary**: Read the AI-generated summary in a modal dialog

## ⚠️ Troubleshooting

### "Failed to fetch books" or Network Error
If you encounter connection issues:

1. **Verify the server is running:**
   ```bash
   # Windows PowerShell
   cd server; npm run dev
   ```
   - Check that the server outputs: "Server running on http://localhost:5000"

2. **Check if the port is in use:**
   ```bash
   # Windows
   netstat -an | find "5000"
   ```

3. **Verify your OpenAI API key:**
   - Make sure you've added a valid API key in `server/.env`

4. **Run the diagnostic script:**
   ```bash
   node diagnose.js
   ```

5. **Run the network fix utility (Windows):**
   ```bash
   ./fix-network.bat
   ```

### Book Covers Not Loading
The application uses Google Books API to fetch book covers. If covers aren't loading:

1. Check your internet connection
2. Verify the book title and author are correct
3. The application will automatically fall back to placeholder images

## 🧑‍💻 Development

### Project Structure
```
bookf/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── api/           # API service functions
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── App.jsx        # Main application component
│       └── main.jsx       # Entry point
│
├── server/                # Backend Node.js application
│   ├── .env               # Environment variables
│   └── server.js          # Express server setup
│
├── start.bat              # Windows startup script
├── diagnose.js            # Connection diagnostic utility
├── fix-network.bat        # Network issue repair utility
└── package.json           # Root package.json with scripts
```

### Building for Production
```bash
npm run build
```

## 📝 License

This project is open-source and available under the MIT License.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for the GPT API
- [Google Books API](https://developers.google.com/books) for book cover images
- [Unsplash](https://unsplash.com/) for fallback book cover images
- [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework 