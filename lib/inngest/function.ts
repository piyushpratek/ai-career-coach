import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../prisma";
import { inngest } from "./client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
    { name: "Generate Industry Insights", id: "generate-industry-insights", },
    { cron: "0 0 * * 0" }, // Run every Sunday at midnight
    async ({ step }) => {
        const industries = await step.run("Fetch industries", async () => {
            return await db.industryInsight.findMany({
                select: { industry: true },
            });
        });

        for (const { industry } of industries) {
            const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

            const res = await step.ai.wrap(
                "gemini",
                async (p) => {
                    return await model.generateContent(p);
                },
                prompt
            );

            if (!res.response?.candidates?.length) {
                throw new Error("No candidates found in the response from Gemini API");
            }

            const candidate = res.response.candidates[0];
            let text = "";

            if (candidate && candidate.content && Array.isArray(candidate.content.parts) && candidate.content.parts.length > 0) {
                const part = candidate.content.parts[0];
                if ('text' in part) {
                    text = part.text;
                } else {
                    throw new Error("Text property not found in the response part");
                }
            } else {
                throw new Error("Unexpected response structure from Gemini API");
            }

            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

            const insights = JSON.parse(cleanedText);

            await step.run(`Update ${industry} insights`, async () => {
                await db.industryInsight.update({
                    where: { industry },
                    data: {
                        ...insights,
                        lastUpdated: new Date(),
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
            });
        }
    }
);


// export const myFunction = inngest.createFunction(
//     {
//         name: "My Function",
//         id: "my-function-id"
//     },
//     { event: "app/event.name" },
//     async ({ event }) => {
//         console.log("Function triggered:", event);
//     }
// );