import { GoogleGenerativeAI } from '@google/generative-ai'


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);




const aiReply = async(req, res) => {
    const { idea } = req.body;

    if (!idea) {
        return res.status(400).json({ error: "Startup idea is required" });
    }

    const prompt = `
You are an expert startup mentor and venture capitalist. Analyze the following startup idea and provide a clear, professional review.
 But if the question doesnt associate with any idea or startups thing reply with more casual way and ask for idea yourself.
Break down your feedback into the following detailed sections:

1. Originality – Is this idea innovative? Has it been done before? What makes it stand out?
2. Market Analysis – How large is the potential market? What current trends or gaps does it address? Who are the main competitors?
3. Target Audience – Who are the ideal users or customers? Is the problem clearly defined and painful enough for them to seek a solution?
4. Feasibility – How realistic is this idea from a technical and financial standpoint? What challenges might arise during execution?
5. Scalability – Can this idea grow to serve a large market? What would scaling look like geographically, technically, or financially?
6. Monetization Potential – What are the most likely revenue streams? Is the business model sustainable and profitable in the long run?
7. Strengths – List the key advantages or unique selling points of the idea.
8. Weaknesses / Risks – Identify major risks, challenges, or assumptions that could lead to failure or require rethinking.
9. User Validation / Feedback – Has the idea been validated with real users or a minimum viable product (MVP)? If not, what would be a good approach?
10. Suggestions for Improvement – Offer realistic, constructive ideas to improve the startup or pivot if necessary.
11. Team Considerations – What kind of founding team would be best suited to execute this idea?
12. Funding Readiness – Would this idea be attractive to investors? At what stage should the founder seek funding?
13. Overall Rating – Give a final rating out of 10 and a short summary (1-2 lines) that reflects the potential of this startup.

Startup Idea:
"""
${idea}
"""

Respond in a structured, clear, and professional tone with bullet points where necessary. Make it useful for a young founder trying to improve their concept.
`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.json({ reply: text });


    } catch (error) {
        console.error("Error calling Gemini API:", error.message);
    }

}

export default aiReply