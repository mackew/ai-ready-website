import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if API keys are configured
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasFirecrawl = !!process.env.FIRECRAWL_API_KEY;
    
    return NextResponse.json({
      hasOpenAI,
      hasFirecrawl
    });
  } catch (error) {
    console.error('Error checking API keys:', error);
    return NextResponse.json(
      { error: 'Failed to check API keys' },
      { status: 500 }
    );
  }
}