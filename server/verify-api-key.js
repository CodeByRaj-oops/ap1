// Simple script to verify the OpenAI API key
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

// Main function to test OpenAI API connectivity
async function testApiKey() {
  console.log('\n=== OpenAI API Key Verification ===\n');
  
  // Check if key exists
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ Error: No API key found in the .env file.');
    console.log('Make sure you have a .env file with OPENAI_API_KEY defined.');
    return;
  }
  
  // Check if still using default key
  if (process.env.OPENAI_API_KEY === 'sk-your-valid-api-key-here' || 
      process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log('❌ Error: You are still using a placeholder API key.');
    console.log('Please replace it with your actual OpenAI API key in the .env file.');
    return;
  }
  
  // Initialize the OpenAI API client
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  // Test the API connection
  try {
    console.log('Testing connection to OpenAI API...');
    
    const response = await openai.createCompletion({
      model: "text-ada-001", // Using a simple, fast model for testing
      prompt: "Hello, this is a test.",
      max_tokens: 5
    });
    
    console.log('✅ Success! Your OpenAI API key is working correctly.');
    console.log(`Response received from model: ${response.data.model}`);
    console.log('\nYou can now use the book summary feature in the application.');
  } catch (error) {
    console.log('❌ Error: Failed to connect to the OpenAI API.');
    
    if (error.response) {
      console.log(`Status code: ${error.response.status}`);
      console.log(`Error message: ${error.response.data.error.message}`);
      
      if (error.response.status === 401) {
        console.log('\nThis is an authentication error. Your API key is invalid.');
        console.log('Please get a valid API key from https://platform.openai.com/api-keys');
      }
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
}

// Run the test
testApiKey(); 