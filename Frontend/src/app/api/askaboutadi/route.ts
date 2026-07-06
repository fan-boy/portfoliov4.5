import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import portfolioKnowledge from '@/data/portfolio-knowledge.json';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Build the system prompt from portfolio knowledge (cached)
const buildSystemPrompt = (): string => {
    const { about, projects } = portfolioKnowledge;
    
    let prompt = `You are a friendly, conversational AI representing ${about.name} (${about.nickname})'s portfolio.
You know everything about Aadi's work, projects, and design philosophy. Answer questions naturally and conversationally.

## About Aadi
- Current Role: ${about.currentRole}
- Location: ${about.location}
- Background: ${about.background}
- ${about.summary}
- Philosophy: "${about.philosophy}"
- Skills: ${about.skills.join(', ')}

## Experience
${about.experience.map(exp => `- ${exp.title} at ${exp.company} (${exp.years}): ${exp.description}`).join('\n')}

## Projects
`;

    for (const project of projects) {
        prompt += `
### ${project.name}
- URL: ${project.url}
- Company: ${project.company} | Year: ${project.year} | Role: ${project.role}
- Headline: ${project.headline}
- Summary: ${project.summary}

Sections:
${project.sections.map(s => `[${s.id}] ${s.title}: ${s.content}`).join('\n\n')}
`;
    }

    prompt += `

## Response Guidelines
1. Be conversational and friendly
2. MAX 2 sentences. Never more. Be ruthlessly brief.
3. One idea per response — don't try to cover everything
4. No preamble, no "great question", no summaries — just answer
5. If listing projects, pick ONE and mention it, don't list them all
6. Always complete your thought — don't leave sentences unfinished
7. NEVER use markdown formatting. No **bold**, no *italics*, no bullet points with -, no headers with #. Plain conversational text only. The ONLY exception is [[ref:...]] tags — always include those.

## Page Context Awareness
When the user's message starts with [User is currently viewing...], they're on that specific project page.
- If they ask "tell me about this project" or "what is this", answer about THAT project
- If they ask generic questions like "what challenges did you face here", relate it to the current project
- Use the project ID to include relevant reference links
- Don't repeat the project name excessively — they're already looking at it

## IMPORTANT: Reference Links
When you mention ANY specific project or section from the portfolio, you MUST include a reference link at the END of your response using this EXACT format:

[[ref:PROJECT_ID:SECTION_ID:Link Text]]

Valid PROJECT_IDs: risk-platform, stillsuit, workflows, aep-creation, universitypark, chainreactive, crashr, cadence, everestos

Valid SECTION_IDs per project:
- risk-platform: the-challenge, four-pillars, the-redesign, drilldown, impact, outcomes, learnings
- stillsuit: token-architecture, component-library, outcomes, learnings
- workflows: the-opportunity, business-case, the-challenge, solution, trust, strategic-impact, my-role, learnings
- aep-creation: the-opportunity, business-case, the-challenge, solution, ai-design, control, strategic-impact, my-role, learnings
- universitypark: the-challenge, solution, outcomes, learnings
- chainreactive: the-opportunity, market-sizing, key-insight, solution, multi-problem, optimization, business-influence, outcomes, learnings
- crashr: the-challenge, solution, outcomes, learnings
- cadence: the-challenge, solution, outcomes, learnings
- everestos: the-challenge, solution, outcomes, learnings

Examples:
- If discussing the four pillars: [[ref:risk-platform:four-pillars:See the Four Pillars]]
- If discussing the design system: [[ref:stillsuit:token-architecture:View Token Architecture]]
- If discussing workflows: [[ref:workflows:solution:See How Workflows Work]]
- If discussing AEP Builder: [[ref:aep-creation:solution:See the AEP Builder]]
- If discussing the AI training system: [[ref:aep-creation:ai-design:See the AI Design]]
- If discussing outcomes: [[ref:risk-platform:outcomes:View the Results]]

You can include multiple references if discussing multiple topics. Always place references at the very end of your response, each on its own line.`;

    return prompt;
};

const SYSTEM_PROMPT = buildSystemPrompt();

export async function POST(request: NextRequest) {
    try {
        const { question, history, currentPage } = await request.json();

        if (!question) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }

        // Build messages from history if provided
        const messages: Anthropic.MessageParam[] = [];
        
        if (history && Array.isArray(history)) {
            for (const turn of history.slice(-6)) { // Keep last 6 turns for context
                messages.push({
                    role: turn.role === 'user' ? 'user' : 'assistant',
                    content: turn.text
                });
            }
        }
        
        // Build the question with page context if available
        let contextualQuestion = question;
        if (currentPage && currentPage.id && currentPage.name) {
            contextualQuestion = `[User is currently viewing the "${currentPage.name}" project page (${currentPage.id})]\n\n${question}`;
        }
        
        // Add current question
        messages.push({
            role: 'user',
            content: contextualQuestion
        });

        const response = await anthropic.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 200,
            system: SYSTEM_PROMPT,
            messages
        });

        // Extract text content
        const textContent = response.content
            .filter((block): block is Anthropic.TextBlock => block.type === 'text')
            .map(block => block.text)
            .join('');

        // Parse references from response
        const refPattern = /\[\[ref:([^:]+):([^:]+):([^\]]+)\]\]/g;
        let cleanText = textContent;
        const references: Array<{ project: string; section: string; label: string }> = [];
        
        let match;
        while ((match = refPattern.exec(textContent)) !== null) {
            references.push({
                project: match[1],
                section: match[2],
                label: match[3]
            });
            cleanText = cleanText.replace(match[0], '');
        }

        return NextResponse.json({
            response: cleanText.trim(),
            references,
            cached: response.usage?.cache_read_input_tokens ? true : false
        });

    } catch (error) {
        console.error('API Error:', JSON.stringify(error, null, 2));
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: `Something went wrong: ${message}` },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
