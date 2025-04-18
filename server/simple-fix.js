/**
 * Simple OpenAI API Key Fix Script
 * 
 * This will help update your API key correctly
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n===== OpenAI API Key Fix =====\n');
console.log('Your current API key appears to be incomplete (sk-...4f0A).');
console.log('A valid OpenAI API key is about 51 characters long.\n');

rl.question('Please paste your FULL OpenAI API key here: ', (apiKey) => {
  if (!apiKey.trim()) {
    console.log('Error: No API key entered. No changes made.');
    rl.close();
    return;
  }

  // Validate key format
  if (!apiKey.startsWith('sk-')) {
    console.log('\nWarning: API key should start with "sk-". Are you sure this is correct?');
    rl.question('Continue anyway? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        updateApiKey(apiKey);
      } else {
        console.log('Operation canceled. No changes made.');
        rl.close();
      }
    });
  } else {
    updateApiKey(apiKey);
  }
});

function updateApiKey(apiKey) {
  try {
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace the API key
    envContent = envContent.replace(
      /OPENAI_API_KEY=.*/,
      `OPENAI_API_KEY=${apiKey}`
    );
    
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ API key updated successfully!');
    console.log('\nTo apply the changes:');
    console.log('1. Stop the current application (Ctrl+C)');
    console.log('2. Run: cd .. && npm start');
    rl.close();
  } catch (error) {
    console.error('Error updating API key:', error.message);
    rl.close();
  }
} 