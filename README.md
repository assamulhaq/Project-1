KISANLENS AI
A crop-leaf health assistant

WHAT IT DOES
A farmer or student uploads a photo of a leaf and picks the crop. KisanLens gives a simple report of visible symptoms, possible causes, preventive actions, and when to ask an expert.

THE PROBLEM
Small farmers often cannot reach an agriculture expert quickly. KisanLens gives a first, plain-language look at a leaf photo. It is a guide, not a confirmed diagnosis.

OPEN-WEIGHT AI USED
Model: Gemma 4 (gemma-4-26b-a4b-it), an open-weight model from Google
How it is used: the image and crop details are sent to Gemma 4 through the Gemini API (key from Google AI Studio). Gemma 4 analyzes the image and writes the report.
Model license and terms: https://ai.google.dev/gemma

HOW IT WORKS
1. The browser uploads the leaf photo and crop details to our Node.js server.
2. server.js sends the image and instructions to Gemma 4.
3. The model's report is returned and shown on the page.
The API key stays on the server in .env and is never sent to the browser.

TECH STACK
HTML, CSS, JavaScript, Node.js, Express, Multer, @google/genai, dotenv

RUN LOCALLY
1. Run: npm install
2. Create a .env file containing: GEMINI_API_KEY=your_key_from_google_ai_studio
3. Run: node server.js
4. Open http://localhost:3000

LIMITATIONS
A photo alone cannot confirm a crop disease. Results are possible causes only. Always consult a local agriculture expert before treating a crop.

LICENSE
MIT. See the LICENSE file.