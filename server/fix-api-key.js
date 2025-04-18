// Script to update the OpenAI API key in the .env file
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=============================================');
console.log('       OpenAI API Key Setup Helper');
console.log('=============================================\n');

console.log('This script will help you set up your OpenAI API key.\n');
console.log('You need a valid OpenAI API key to use the book summary feature.');
console.log('If you don\'t have one, get it from: https://platform.openai.com/api-keys\n');

// Path to the .env file
const envPath = path.join(__dirname, '.env');

// Read the current .env file
let envContent;
try {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('Current .env file found.\n');
} catch (error) {
  console.error('Error reading .env file:', error.message);
  process.exit(1);
}

// Ask for the API key
rl.question('Please enter your OpenAI API key (starts with "sk-"): ', (apiKey) => {
  // Validate the API key format
  if (!apiKey.trim()) {
    console.log('\nError: API key cannot be empty.');
    rl.close();
    return;
  }

  if (!apiKey.startsWith('sk-')) {
    console.log('\nWarning: OpenAI API keys typically start with "sk-". Your key might not be valid.');
    console.log('Do you want to continue anyway? (y/n)');
    
    rl.question('', (answer) => {
      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('\nOperation cancelled. Please get a valid API key and try again.');
        rl.close();
        return;
      } else {
        updateEnvFile(apiKey);
      }
    });
  } else {
    updateEnvFile(apiKey);
  }
});

function updateEnvFile(apiKey) {
  try {
    // Replace the API key in the .env file
    const updatedContent = envContent.replace(
      /OPENAI_API_KEY=.*/,
      `OPENAI_API_KEY=${apiKey}`
    );

    // Write the updated content back to the .env file
    fs.writeFileSync(envPath, updatedContent);

    console.log('\n✅ API key successfully updated in .env file!');
    console.log('\nNext steps:');
    console.log('1. Stop the current running application (Ctrl+C)');
    console.log('2. Restart the application with "npm start"');
    
    rl.close();
  } catch (error) {
    console.error('\nError updating .env file:', error.message);
    rl.close();
  }
} 