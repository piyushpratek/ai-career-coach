import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    name: "AI Career Coach",
    id: "ai-career-coach", credentials: {
        gemini: {
            apiKey: process.env.GEMINI_API_KEY,
        },
    },
});
