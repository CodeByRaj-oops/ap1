# OpenAI API Key Setup Guide

This guide will walk you through the process of obtaining a valid OpenAI API key for your book summary application.

## Step 1: Create or Sign in to Your OpenAI Account

1. Go to [https://platform.openai.com/signup](https://platform.openai.com/signup) to create an account if you don't have one
2. If you already have an account, sign in at [https://platform.openai.com/login](https://platform.openai.com/login)

## Step 2: Set Up Billing (Required for API Usage)

1. After signing in, navigate to the Billing section: [https://platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview)
2. Click "Set up paid account"
3. Add a payment method (credit card or other available options)
4. Set a usage limit if desired to prevent unexpected charges

**Note:** New accounts often receive some free credits, but a valid payment method is still required to use the API.

## Step 3: Create an API Key

1. Go to the API Keys section: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Name your key (e.g., "Book Summarizer App")
4. Click "Create secret key"
5. **IMPORTANT:** Copy the displayed API key immediately! It will only be shown once.

## Step 4: Update Your Application

1. Open the file `server/.env` in your project
2. Find the line that says:
   ```
   OPENAI_API_KEY=sk-your-valid-api-key
   ```
3. Replace `sk-your-valid-api-key` with your actual API key that you copied
4. Save the file

## Step 5: Verify Your API Key

To make sure your API key is working:

1. Open a terminal in your project directory
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Run the verification tool:
   ```
   node check-api-key.js
   ```
4. If the test passes, you're all set!

## Example

Here's an example of what your `.env` file should look like (with a fake key):

```
PORT=5000
# API key configuration
OPENAI_API_KEY=sk-abcd1234efgh5678ijkl9012mnop3456qrst7890uvwxyz
NODE_ENV=development
```

## Troubleshooting

If you're seeing an error like:
```
Failed to generate summary: API Error: {"error":{"message":"Incorrect API key provided: sk-your-*********-key."}}
```

It means you're still using the placeholder API key instead of a real key. Make sure to:

1. Get a valid API key from OpenAI by following the steps above
2. Replace the placeholder text with your actual API key
3. Restart the application

## Security Notes

- Never share your API key publicly or commit it to a public repository
- Consider using environment variables in production environments
- Rotate your API keys periodically for better security
- Set up usage limits to prevent unexpected charges 