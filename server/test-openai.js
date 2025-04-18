require('dotenv').config();
const { OpenAI } = require('openai');

// Function to test OpenAI API connectivity
async function testOpenAIConnection() {
  console.log('=== OpenAI API Connection Test ===');
  console.log(`API Key Status: ${process.env.OPENAI_API_KEY ? 'Present' : 'Missing'}`);
  
  // Check if API key is in the correct format
  if (process.env.OPENAI_API_KEY) {
    // Safely display part of the API key for debugging
    const keyLength = process.env.OPENAI_API_KEY.length;
    const firstChars = process.env.OPENAI_API_KEY.substring(0, 5);
    const lastChars = process.env.OPENAI_API_KEY.substring(keyLength - 4);
    console.log(`API Key Format: ${firstChars}...${lastChars} (${keyLength} characters)`);
    
    if (process.env.OPENAI_API_KEY === 'sk-your-actual-openai-api-key' || 
        process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('❌ Error: Using placeholder API key. Replace with an actual OpenAI API key.');
      return false;
    }
    
    if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
      console.log('❌ Error: API key does not have the correct format. Should start with "sk-"');
      return false;
    }
    
    console.log('✓ API key format appears valid');
  } else {
    console.log('❌ Error: No API key found in environment');
    return false;
  }
  
  // Test actual API call
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    console.log('Attempting to call OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using a smaller model for testing
      messages: [
        { role: "system", content: "You are a test assistant." },
        { role: "user", content: "Reply with 'OpenAI API is working!' if you receive this message." }
      ],
      max_tokens: 20,
    });
    
    console.log('✓ API call successful!');
    console.log('Response:', response.choices[0].message.content);
    return true;
  } catch (error) {
    console.log('❌ API call failed:');
    console.log('Error type:', error.constructor.name);
    console.log('Error message:', error.message);
    // If there's an API error response, show it
    if (error.response) {
      console.log('API error status:', error.response.status);
      console.log('API error data:', error.response.data);
    }
    return false;
  }
}

// Run the test
testOpenAIConnection()
  .then(success => {
    if (success) {
      console.log('✓ All tests passed! OpenAI API is configured correctly.');
    } else {
      console.log('❌ Test failed. Please fix the issues before continuing.');
    }
  })
  .catch(err => {
    console.error('Unexpected error during testing:', err);
  }); 