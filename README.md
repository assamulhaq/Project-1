<h1 align="center">🌱 KisanLens AI</h1>

<p align="center"><strong>An AI-Powered Crop Leaf Health Assistant</strong></p>

<p align="center">Making preliminary crop disease information more accessible through artificial intelligence.</p>

<hr/>

<h2>🌾 The Problem</h2>

Farmers in Pakistan face crop diseases that can damage their crops, reduce yields, and cause serious financial losses. Access to timely agricultural expertise is not always easy, especially for small farmers.

**KisanLens AI aims to help address this challenge** by allowing users to upload a crop leaf photo and receive an understandable, AI-generated report about possible diseases, visible symptoms, preventive measures, and suggested next steps.

<h2>💡 My Motivation</h2>

I developed KisanLens AI during a short hackathon development period of approximately **2–3 hours**. My primary focus was not on building a perfect user interface, but on using AI to develop a working solution for a real-world agricultural problem.

The goal was to turn an idea into a functional application that demonstrates how AI can make agricultural information more accessible. The project is an initial step that I can continue improving with better features, testing, and user feedback.

<h2>🔍 What It Does</h2>

- **Image Analysis:** Users upload a crop leaf photo and select the crop.
- **Symptom Identification:** The AI describes visible symptoms and possible causes.
- **Preventive Guidance:** Provides suggested preventive actions and remedies.
- **Accessible Information:** Presents results in simple, understandable language.

<h2>🤖 Open-Weight AI Model</h2>

**Model:** Gemma 4 (`gemma-4-26b-a4b-it`)

Developed by Google, Gemma is an open-weight model family. KisanLens AI accesses the configured model through the Gemini API using a key obtained from Google AI Studio.

The model receives the crop image and relevant details to generate a diagnostic report.

**Model information and terms:** [Google Gemma](https://ai.google.dev/gemma)

<h2>⚙️ How It Works</h2>

1. The user uploads a leaf photo and selects the crop.
2. The browser sends the image and crop details to the Node.js server.
3. `server.js` sends the image and instructions to Gemma through the Gemini API.
4. The generated report is returned to the browser and displayed to the user.

**Security:** The Gemini API key remains on the server in the `.env` file and is not sent to the browser.

<h2>🛠️ Technology Stack</h2>

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Image Uploads:** Multer
- **AI Integration:** `@google/genai`
- **Configuration:** `dotenv`
- **Version Control:** Git and GitHub
- **Deployment:** Render

<h2>🚀 Run Locally</h2>

**1. Install dependencies**

```bash
npm install
```

**2. Create a `.env` file**

```env
GEMINI_API_KEY=your_key_from_google_ai_studio
```

**3. Start the application**

```bash
node server.js
```

**4. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

<h2>🔮 Future Improvements</h2>

KisanLens AI is an initial working prototype with opportunities for further development, including:

- Improved mobile-friendly design and accessibility.
- Support for more crops and disease categories.
- More detailed, locally relevant agricultural guidance.
- Better evaluation of diagnostic accuracy using verified crop images.
- Urdu-language support for improved accessibility among Pakistani farmers.

<h2>⚠️ Limitations</h2>

A leaf photograph alone cannot confirm a crop disease. AI-generated results may be incorrect or incomplete and should be treated as preliminary guidance. Consult a qualified agricultural expert before applying treatments.

<h2>📄 License</h2>

This project is licensed under the **MIT License**. See the `LICENSE` file for details.