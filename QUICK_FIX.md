# QUICK FIX: How to Solve the OpenAI API Key Error

You're getting this error because you're using a **placeholder API key** instead of a real one.

## Here's how to fix it in 2 minutes:

### 1. Get a Real OpenAI API Key
- Go to https://platform.openai.com/api-keys
- Sign in to your OpenAI account (or create one)
- Click "Create new secret key"
- Name it "Book Summarizer" and click Create
- **COPY THE KEY IMMEDIATELY** (it starts with "sk-")

### 2. Update Your `.env` File
- Open the file at `server/.env`
- Find the line: `OPENAI_API_KEY=sk-your-valid-api-key`
- Replace the placeholder with your actual key
- Save the file

### 3. Restart the Application
- Stop the current running instance (Ctrl+C)
- Run `npm start` again

## Example of How Your .env Should Look:
```
PORT=5000
# API key configuration
OPENAI_API_KEY=sk-abc123def456ghi789jklmnopqrstuvwxyz0123456789
NODE_ENV=development
```

Remember: You need a valid payment method on your OpenAI account to use the API.

For detailed instructions, see the API_KEY_SETUP_GUIDE.md file. 