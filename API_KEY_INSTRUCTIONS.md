# Complete Guide to Getting a Valid OpenAI API Key

Follow these instructions carefully to get a valid OpenAI API key for your application.

## Step 1: Create or log in to your OpenAI account

1. Go to [https://platform.openai.com/signup](https://platform.openai.com/signup) to create an account if you don't have one
2. If you already have an account, log in at [https://platform.openai.com/login](https://platform.openai.com/login)

## Step 2: Set up billing (REQUIRED for API access)

Your OpenAI API key won't work without setting up billing, even if you have free credits.

1. Go to [https://platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview)
2. Click "Set up paid account"
3. Enter your payment details (credit card, etc.)
4. Set usage limits if desired (recommended to avoid unexpected charges)

## Step 3: Create a new API key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click the "Create new secret key" button
3. Give your key a name (e.g., "Book Summarizer App")
4. Click "Create secret key"
5. **COPY YOUR API KEY IMMEDIATELY** - you won't be able to see it again!
   - It should look like: `sk-abc123def456ghi789jklmnopqrstuvwxyz0123456789`
   - It should be approximately 51 characters long
   - It always starts with `sk-`

## Step 4: Update your .env file

1. Open the file at `server/.env`
2. Find the line:
   ```
   OPENAI_API_KEY=sk-your-valid-api-key-here
   ```
3. Replace `sk-your-valid-api-key-here` with your actual API key that you copied
4. Save the file

## Step 5: Verify your API key

1. In your terminal, navigate to the server directory:
   ```
   cd server
   ```
2. Run the verification script:
   ```
   node verify-api-key.js
   ```
3. If successful, you'll see: "✅ Success! Your OpenAI API key is working correctly."

## Step 6: Restart your application

1. Stop any running instances (press Ctrl+C in your terminal)
2. Navigate to your project root:
   ```
   cd ..
   ```
3. Start the application:
   ```
   npm start
   ```

## Common issues and solutions:

### "Authentication failed" or 401 error
- Make sure you've set up billing in your OpenAI account
- Ensure the API key is copied correctly with no extra spaces
- Check if the API key has been revoked or expired
- Verify that your OpenAI account is in good standing

### Rate limit exceeded
- Your account may have hit usage limits
- Check your usage at [https://platform.openai.com/account/usage](https://platform.openai.com/account/usage)
- Increase your usage limits or wait until they reset

### Need more help?
- OpenAI documentation: [https://platform.openai.com/docs/quickstart](https://platform.openai.com/docs/quickstart)
- OpenAI support: [https://help.openai.com/en/](https://help.openai.com/en/) 