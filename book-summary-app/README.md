# Book Summary App

A full-stack web application that displays books and generates AI summaries based on the book's genre using OpenAI's GPT API.

## Features

- Display a responsive grid of books on the homepage
- Click on a book to view its details and an AI-generated summary
- Summaries are tailored to the genre of the book
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express
- **API Integration**: OpenAI GPT-4

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- NPM or Yarn

### Backend Setup

1. Navigate to the server directory:
   ```
   cd book-summary-app/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory and add your OpenAI API key:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```
   
The server will start on http://localhost:5000

### Frontend Setup

1. Open a new terminal window and navigate to the client directory:
   ```
   cd book-summary-app/client
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

## Usage

1. Browse through the collection of books on the homepage
2. Click on any book to view its details
3. The app will automatically generate an AI summary of the book based on its genre
4. The summary is tailored to match the style of the book's genre

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/summary` - Generate a book summary (requires title and genre in request body)

## Notes

- The OpenAI API requires an API key. Sign up at [OpenAI](https://openai.com) to get your key.
- The application uses the GPT-4 model, but you can modify it to use other models if needed.
- In a production environment, make sure to secure your API key and implement rate limiting. 