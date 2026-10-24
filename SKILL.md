<h1>KisanLens AI — Crop Analysis Skill</h1>

**Purpose**

Defines the instructions for analyzing crop leaf images and generating useful AI-assisted disease reports.

<hr/>

<h2>Core Responsibilities</h2>

- Analyze uploaded crop leaf images using the existing Gemini API integration.
- Identify possible diseases and describe visible symptoms.
- Provide relevant remedies and crop-management suggestions.
- Handle unclear images and unsuccessful API responses appropriately.

<h2>Technical Guidelines</h2>

- Use **Node.js and Express.js** for backend operations.
- Use **Multer** to process uploaded images in memory.
- Keep Gemini API requests and credentials on the server.
- Follow the existing project structure and coding conventions.

<h2>Security and Reliability</h2>

- Validate image types and file sizes before analysis.
- Store API keys in server-side environment variables.
- Present diagnoses as possible findings, not guaranteed results.
- Handle errors without exposing sensitive information.

<hr/>

**Expected Outcome:** Clear, useful, and responsibly generated crop disease analysis.