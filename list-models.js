
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('Gemini API key is missing from .env');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const models = await ai.models.list();

  for await (const model of models) {
    if (model.supportedActions?.includes('generateContent')) {
      console.log(model.name);
    }
  }
}

main().catch((error) => {
  console.error('Could not list models:', error.message);
});
