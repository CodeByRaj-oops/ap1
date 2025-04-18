/**
 * OpenAI API Key Verification Script
 * 
 * This script checks if your OpenAI API key is properly configured and working.
 * Run it with: node check-api-key.js
 */

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}========================================${colors.reset}`);
console.log(`${colors.cyan}${colors.bold}     OpenAI API Key Verification Tool${colors.reset}`);
console.log(`${colors.cyan}${colors.bold}========================================${colors.reset}\n`);

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
  console.log(`${colors.red}ERROR: No API key found in .env file${colors.reset}`);
  console.log(`Make sure you have a .env file with OPENAI_API_KEY defined.\n`);
  process.exit(1);
}

// Check if API key is still a placeholder
if (
  process.env.OPENAI_API_KEY === 'your_openai_api_key_here' || 
  process.env.OPENAI_API_KEY === 'sk-your-valid-api-key'
) {
  console.log(`${colors.red}ERROR: You're still using a placeholder API key${colors.reset}`);
  console.log(`Your current key is: ${colors.yellow}${process.env.OPENAI_API_KEY}${colors.reset}`);
  console.log(`\nYou need to replace this with a real OpenAI API key from:`);
  console.log(`${colors.blue}https://platform.openai.com/api-keys${colors.reset}\n`);
  process.exit(1);
}

// Check format of API key
if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
  console.log(`${colors.red}ERROR: API key has invalid format${colors.reset}`);
  console.log(`OpenAI API keys should start with "sk-" followed by a string of letters and numbers.\n`);
  process.exit(1);
}

console.log(`API key format check: ${colors.green}PASSED${colors.reset}`);
console.log(`Found API key starting with: ${colors.yellow}${process.env.OPENAI_API_KEY.substring(0, 5)}...${colors.reset}\n`);

// Test the API key with a simple request
console.log(`${colors.blue}Testing connection to OpenAI API...${colors.reset}`);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function testApiKey() {
  try {
    const response = await openai.createCompletion({
      model: 'text-ada-001',  // Using the simplest model for a quick test
      prompt: 'This is a test of the OpenAI API.',
      max_tokens: 5
    });
    
    console.log(`\nAPI connection: ${colors.green}SUCCESS${colors.reset}`);
    console.log(`API response received for model: ${colors.yellow}${response.data.model}${colors.reset}`);
    console.log(`\n${colors.green}${colors.bold}Your OpenAI API key is working correctly!${colors.reset}`);
    console.log(`You can now use the book summary application.`);
    
  } catch (error) {
    console.log(`\nAPI connection: ${colors.red}FAILED${colors.reset}`);
    
    if (error.response) {
      // OpenAI API error
      console.log(`Error status: ${error.response.status}`);
      console.log(`Error message: ${colors.red}${error.response.data.error.message}${colors.reset}\n`);
      
      if (error.response.status === 401) {
        console.log(`${colors.yellow}This error means your API key is invalid or has been revoked.${colors.reset}`);
        console.log(`Please get a new API key from: ${colors.blue}https://platform.openai.com/api-keys${colors.reset}`);
      } else if (error.response.status === 429) {
        console.log(`${colors.yellow}This error means you've exceeded your rate limits or have insufficient quota.${colors.reset}`);
        console.log(`Check your usage and billing at: ${colors.blue}https://platform.openai.com/account/usage${colors.reset}`);
      }
    } else {
      // Network or other error
      console.log(`Error: ${colors.red}${error.message}${colors.reset}\n`);
      console.log(`${colors.yellow}This might be a network issue or a problem with the OpenAI service.${colors.reset}`);
    }
  }
}

testApiKey(); 