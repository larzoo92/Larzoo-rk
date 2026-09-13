import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Active AI assistant will run in simulation mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Simulated replies for fallback when API key is not present
const SIMULATED_REPLIES = [
  "Hello from Larzoo AI Commerce Assistant! I am here to help you coordinate B2B procurement, source hard-to-find custom bulk materials, or set up automated logistics pipelines for your business.",
  "As the intelligent backbone of India's First Unified Commerce Ecosystem, I can verify trade licenses for standard B2B discounts, look up rates for 10 metric tons of custom construction steel, or arrange daily dairy supplies for hotels.",
  "That sounds like an intensive procurement requirement! Our logistics fleet handles oversized bulky cargo as well as rapid 10-minute consumer deliveries. Would you like me to flag this sourcing request to our premium tier-1 suppliers in Bengaluru?",
];

// API Route for the Larzoo AI Assistant
app.post("/api/assistant", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const client = getGeminiClient();
  if (!client) {
    // Return simulated, highly context-aware response if API key is not provided
    const lower = message.toLowerCase();
    let reply = "";
    if (lower.includes("wedding") || lower.includes("event")) {
      reply = `**Larzoo Sourcing Engine Analysis**: I've detected a wedding/event supply query. For custom wedding procurement (such as seating setups, floral decor bulk orders, and gourmet catering procurement), Larzoo coordinates directly with verified local event planners. We can aggregate bulk paper plates, chairs, lights, and luxury supplies, delivering them matching your scheduling thresholds. I've draft-saved a Wedding Supplies sourcing sheet for you!`;
    } else if (lower.includes("bulk") || lower.includes("wholesale") || lower.includes("price") || lower.includes("ton") || lower.includes("kg")) {
      reply = `**B2B Pricing Matrix Activated**: For bulk produce or raw inventory (such as onions, rice, or paper items), Larzoo bypasses standard retail intermediaries to connect you to tier-1 farming warehouses immediately. Current average spot-price for graded bulk crops sits at ₹22-₹26/kg for wholesale onions. Deliveries above 500kg automatically qualify for our flat-rate logistics credit.`;
    } else if (lower.includes("hotel") || lower.includes("restaurant") || lower.includes("pg") || lower.includes("procurement")) {
      reply = `**SaaS Enterprise Channel**: Hotels, restaurants, and PG accommodations are onboarded to Larzoo enterprise portal. This ensures monthly invoicing, custom quality inspection criteria, and daily automatic deliveries at 5:00 AM (pre-kitchen prep). I can automatically configure your recurring order of raw fresh items, vegetables, and milk with a strict 99.6% on-time delivery commitment.`;
    } else {
      reply = SIMULATED_REPLIES[Math.floor(Math.random() * SIMULATED_REPLIES.length)];
    }
    return res.json({ text: reply, simulated: true });
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: h.text }]
    }));

    // System Instructions directing the persona to represent Larzoo premium commerce ecosystem
    const systemInstruction = 
      "You are the Larzoo AI Commerce Assistant, the active cognitive engine behind India's first unified commerce ecosystem. " +
      "Larzoo is NOT a basic quick commerce app. It is a highly robust B2B and B2C operational system for hyperlocal delivery, custom sourcing requests, " +
      "and complex business procurement (catering, hotel chains, weddings, commercial bulk warehouses).\n\n" +
      "Provide premium, structured, precise, professional, investor-grade sourcing recommendations.\n" +
      "Use tables, bullet lists, bold highlights, and clear pricing structure. Always assure custom capability: 'If it exists, Larzoo can get it.'\n" +
      "Keep replies focused on business credibility, fast delivery, quality checks (100% QA), and verified suppliers.";

    const contents = [...formattedHistory, { role: "user" as const, parts: [{ text: message }] }];

    const model = "gemini-3.5-flash";
    const response = await client.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || "I apologize, I didn't catch that. Could you reformulate?", simulated: false });
  } catch (error: any) {
    console.error("Gemini API Error in /api/assistant:", error);
    return res.status(500).json({ error: error.message || "Something went wrong while connecting with Gemini AI." });
  }
});

// Sourcing requisition save API mock (creates higher interactive fidelity)
app.post("/api/custom-sourcing", (req, res) => {
  const reqData = req.body;
  console.log("Custom sourcing requested:", reqData);
  return res.json({
    success: true,
    requestId: "LZS-" + Math.floor(100000 + Math.random() * 900000),
    message: "Custom sourcing requisition submitted to the Larzoo vendor network.",
    estimatedQuoteTime: "Within 45 minutes",
  });
});

// Vite middleware flow for development & static serving for production
async function run() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Larzoo full-stack server running on http://localhost:${PORT}`);
  });
}

run().catch((err) => {
  console.error("Failed to start Larzoo server:", err);
});
