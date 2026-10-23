import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

dotenv.config();

const app = express();
const port = 3000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// Automatic retry mechanism if servers return temporary limits/errors
async function generateWithRetry(payload, retries = 3, delay = 1500) {
    for (let i = 0; i < retries; i++) {
        try {
            return await ai.models.generateContent(payload);
        } catch (error) {
            console.log(`API attempt ${i + 1} failed: ${error.message}`);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

app.post('/api/analyze', upload.single('cropImage'), async (req, res) => {
    let filePath = null;
    try {
        console.log('--- Received analyze request ---');
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image file.' });
        }

        filePath = req.file.path;
        const cropType = req.body.cropType || 'General Crop';
        const userSymptoms = req.body.symptoms || 'None specified';

        const imageBuffer = fs.readFileSync(filePath);
        const base64Image = imageBuffer.toString('base64');
        
        let mimeType = req.file.mimetype;
        if (!mimeType || mimeType === 'application/octet-stream' || mimeType.includes('text')) {
            mimeType = 'image/jpeg';
        }

        const promptText = `You are an expert agricultural assistant. Analyze this crop leaf image. 
Crop Type: ${cropType}
Farmer Noted Symptoms: ${userSymptoms}

CRITICAL INSTRUCTION: If the uploaded image is completely dark, black, blurry, or does not contain any plant leaf, do NOT generate a full disease report. Instead, immediately output only this exact message under Visible Symptoms: "Error: No plant leaf or visible crop symptoms detected. Please upload a clear, well-lit photo of an affected crop leaf."

Otherwise, provide a field report with the following clear section headers:
### 🔍 1. Visible Symptoms
### 🦠 2. Primary Cause / Identified Disease
### 🧪 3. Recommended Treatments & Sprays
### 🛡️ 4. Preventive Actions & Management
### ⚠️ 5. Field Disclaimer`;

        console.log('Sending request to Open-Weight Gemma API (gemma-4-26b-a4b-it)...');

        const response = await generateWithRetry({
            model: 'gemma-4-26b-a4b-it', // Using open-weight Gemma 4 model for hackathon compliance
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            inlineData: {
                                data: base64Image,
                                mimeType: mimeType
                            }
                        },
                        {
                            text: promptText
                        }
                    ]
                }
            ]
        });

        console.log('Received response successfully!');

        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ analysis: response.text });

    } catch (error) {
        console.error('SERVER ERROR:', error);
        
        if (filePath && fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch (e) {}
        }

        res.status(500).json({ 
            error: error.message || 'Failed to process image with Gemma.' 
        });
    }
});

app.listen(port, () => {
    console.log(`KisanLens AI running at http://localhost:${port}`);
});