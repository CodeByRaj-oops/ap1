# Fixing the OpenAI API Key Error

You're encountering a **401 Incorrect API key provided** error because the application is using a placeholder API key instead of a valid OpenAI API key.

## How to Fix the Issue

1. **Get a Valid OpenAI API Key**:
   - Go to [OpenAI API Keys page](https://platform.openai.com/api-keys)
   - Sign in or create an account if you don't have one
   - Click "Create new secret key"
   - Give your key a name (e.g., "Book Summarizer App")
   - Copy the key (it should start with "sk-")

2. **Update Your .env File**:
   - Open the file at `server/.env`
   - Replace the placeholder text `your_openai_api_key_here` with your actual API key
   - Save the file

3. **Restart Your Application**:
   - Stop the current instance (Ctrl+C in the terminal)
   - Run `npm start` again

## Example of a Correctly Configured .env File

```
PORT=5000
# Keep your API key secure and never share it publicly
OPENAI_API_KEY=sk-abcdefghijklmnopqrstuvwxyz123456789
NODE_ENV=development
```

## Verifying Your API Key

You can test if your API key is working correctly by running:

```
cd server
node test-openai.js
```

This will attempt to make a test call to the OpenAI API and show you if there are any issues.

## Security Best Practices

- Never commit your API key to version control
- Don't share your .env file with others
- Consider using environment variables in production instead of a .env file
- Implement API key rotation periodically

## Need Help?

If you continue to experience issues, you can check the following:

1. Make sure there are no extra spaces or special characters in your API key
2. Verify that your OpenAI account has billing set up correctly
3. Check if your API key has any usage restrictions or limitations 