# Book Recommendation App

A full-stack web application that displays book recommendations and generates AI summaries based on each book's genre using OpenAI's GPT-4 API.

## Features

- Browse a collection of recommended books on the homepage
- Click on any book to view its details and an AI-generated summary
- Summaries are tailored to match the genre style of each book
- Modern, responsive UI using Tailwind CSS
- Real-time API integration with OpenAI GPT-4

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express
- **API Integration**: OpenAI GPT-4

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- NPM or Yarn
- OpenAI API key

### Backend Setup

1. Navigate to the server directory:
   ```
   cd book-app/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add your OpenAI API key in the `.env` file:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm start
   ```
   
The server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal window and navigate to the client directory:
   ```
   cd book-app/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

The frontend will be available at http://localhost:3000

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/summarize` - Generate a book summary (requires title and genre in request body)

## How It Works

1. The app displays a responsive grid of book recommendations on the homepage
2. When a user clicks on a book, they're taken to the book detail page
3. The app automatically calls the OpenAI API to generate a summary customized to the book's genre
4. The AI-generated summary is displayed to the user with appropriate loading states and error handling

## Notes

- To use the OpenAI API, you need a valid API key. Sign up at [OpenAI](https://openai.com) to get your key.
- If you experience rate limiting from the OpenAI API, you may need to upgrade your account or adjust the request frequency.
- For production deployment, remember to secure your API keys with environment variables. 