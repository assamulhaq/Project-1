
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('ERROR: Gemini API key is missing from .env');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const response = await ai.models.generateContent({
   
    model: 'gemini-3.5-flash',
    contents: 'Reply with exactly: Gemini API connection successful.',
  });

  console.log(response.text);
}

main().catch((error) => {
  console.error('Gemini API test failed:', error.message);
  process.exitCode = 1;
});
