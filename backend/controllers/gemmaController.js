const { GoogleGenAI } = require('@google/genai');
const Listing = require('../models/Listing');
const Preference = require('../models/Preference');

const testGemma = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Say hello and explain in one short sentence what you can do."
    });

    res.json({
      success: true,
      reply: response.text
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const askGemma = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const { listingId, question } = req.body;

    console.log("Gemma request:", { listingId, question });

    if (!question) {
      return res.status(400).json({ success: false, reply: "Missing question." });
    }

    let pref = null;
    if (req.user && req.user.id) {
      pref = await Preference.findOne({ user: req.user.id }).catch(() => null);
    }
    
    let listing = null;
    if (listingId) {
      listing = await Listing.findById(listingId).catch(() => null);
    }

    let percentage = 0;
    if (pref && listing) {
      let score = 0;
      let totalCriteria = 0;

      const compare = (p, l) => {
        if (p) {
          totalCriteria++;
          if (p.toLowerCase() === l?.toLowerCase()) score++;
        }
      };

      compare(pref.location, listing.location);
      compare(pref.roomType, listing.roomType);
      compare(pref.sharing, listing.sharing);
      compare(pref.sleepSchedule, listing.sleepSchedule);
      compare(pref.smoking, listing.smoking);
      compare(pref.pets, listing.pets);
      compare(pref.guests, listing.guests);
      compare(pref.social, listing.social);
      compare(pref.cleanliness, listing.cleanliness);

      if (pref.maxBudget && listing.rent) {
        totalCriteria++;
        if (listing.rent <= pref.maxBudget) score++;
      }
      percentage = totalCriteria === 0 ? 0 : Math.round((score / totalCriteria) * 100);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are Gemma, the AI Compatibility Assistant for Belong, a roommate and home-finding platform.

Answer the user's question clearly and naturally.

When listing information is provided, use that information to answer listing-related questions.

When user preference information is provided, use it to explain compatibility.

Never invent listing, roommate, rent, location, preference, or compatibility information.

The application's match percentage is authoritative. Do not calculate or change the percentage yourself.

If information is unavailable, honestly say that it is unavailable.

For general questions, answer normally even if listing or preference data is unavailable.

If the user asks a listing-specific question but no listing exists, return exactly: "Please open a listing first so I can answer questions about that property."

Keep answers concise, friendly, and useful.

User Question: "${question}"

Context:
- Overall Match Percentage: ${pref && listing ? percentage + '%' : 'N/A'}
- User Preferences: ${pref ? JSON.stringify(pref) : 'None'}
- Listing Details: ${listing ? JSON.stringify(listing) : 'None'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ 
      success: true,
      matchPercentage: percentage,
      reply: response.text 
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.json({ 
      success: false, 
      reply: "Gemma is temporarily unavailable. Please try again." 
    });
  }
};

module.exports = { askGemma, testGemma };
