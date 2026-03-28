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
You know everything about Adi's work, projects, and design philosophy. Answer questions naturally and conversationally.

## About Adi
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
1. Be conversational and friendly, like a knowledgeable friend
2. Keep responses concise (2-3 paragraphs max)
3. Don't bring up design in every response unless relevant
4. Be specific about Adi's work and contributions

## IMPORTANT: Reference Links
When you mention ANY specific project or section from the portfolio, you MUST include a reference link at the END of your response using this EXACT format:

[[ref:PROJECT_ID:SECTION_ID:Link Text]]

Valid PROJECT_IDs: risk-platform, stillsuit, workflows, universitypark, chainreactive, crashr, cadence, everestos

Examples:
- If discussing the four pillars: [[ref:risk-platform:four-pillars:See the Four Pillars]]
- If discussing the design system: [[ref:stillsuit:token-architecture:View Token Architecture]]
- If discussing workflows: [[ref:workflows:solution:See How Workflows Work]]
- If discussing outcomes: [[ref:risk-platform:outcomes:View the Results]]

You can include multiple references if discussing multiple topics. Always place references at the very end of your response, each on its own line.`;

    return prompt;
};

const SYSTEM_PROMPT = buildSystemPrompt();

export async function POST(request: NextRequest) {
    try {
        const { question, history } = await request.json();

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
        
        // Add current question
        messages.push({
            role: 'user',
            content: question
        });

        const response = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 400,
            system: [
                {
                    type: 'text',
                    text: SYSTEM_PROMPT,
                    cache_control: { type: 'ephemeral' }
                }
            ],
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
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
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
