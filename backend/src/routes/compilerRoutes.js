// backend/src/routes/compilerRoutes.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/run', async (req, res) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({ error: "Language and code are required" });
    }

    try {
        // Create submission on Judge0
        const submission = await axios.post(
            'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
            {
                source_code: code,
                language_id: getLanguageId(language),
                stdin: ""
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Add this in .env
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            }
        );

        const result = submission.data;
        const output = result.stdout || result.stderr || result.compile_output || "No output";
        
        res.json({ output });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Code execution failed" });
    }
});

// Map frontend languages to Judge0 language IDs
function getLanguageId(lang) {
    const mapping = {
        python: 71, // Python 3
        java: 62,
        c: 50,
        ruby: 72
    };
    return mapping[lang] || 71; // Default to Python
}

export default router;
