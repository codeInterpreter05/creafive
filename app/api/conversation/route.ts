import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ message: "Missing Gemini API key" }, { status: 500 });
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json({ message: "Missing messages in request body" }, { status: 400 });
    }

    const prompt = messages[messages.length - 1].content;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: { text: prompt },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to fetch from Gemini API" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ message: data.candidates[0].output });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
