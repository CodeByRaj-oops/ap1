import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">About This Project</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary-700">Project Overview</h2>
        <p className="mb-4">
          This college-level full-stack web application demonstrates the integration of modern web technologies with 
          artificial intelligence. The app allows users to discover books by genre and generates AI-powered summaries
          that match the tone and style of each book's genre.
        </p>
        <p>
          The summaries are generated using OpenAI's GPT-4 model, which has been prompted to create content
          that captures the essence and writing style typically found in different literary genres.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary-700">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Frontend</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>React.js for UI components</li>
              <li>Tailwind CSS for styling</li>
              <li>React Router for navigation</li>
              <li>Axios for API requests</li>
              <li>Vite for build tooling</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Backend</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Node.js runtime</li>
              <li>Express.js framework</li>
              <li>OpenAI API integration</li>
              <li>RESTful API architecture</li>
              <li>Environment-based configuration</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary-700">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong>Search for Books</strong>: Use the search bar to filter books by genre, title, or author.
          </li>
          <li>
            <strong>Select a Book</strong>: Click on any book card to view its details.
          </li>
          <li>
            <strong>AI Summary Generation</strong>: The app sends the book title and genre to the OpenAI API with a 
            prompt designed to create a summary that matches the genre's style.
          </li>
          <li>
            <strong>View Summary</strong>: Read the AI-generated summary presented in a modal dialog.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AboutPage; 