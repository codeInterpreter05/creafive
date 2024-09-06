import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {  
  try {
    const requestBody = await req.json();
    const { prompt, width, height, samples } = requestBody;

    if (!prompt || !width || !height || !samples) {
      return NextResponse.json({ message: "fields are missing" }, { status: 400 });
    }

    console.log(prompt, width, height, samples);

    const apiKey = process.env.IMAGE_AI_KEY!;

    const response = await axios.post(
      'https://modelslab.com/api/v6/realtime/text2img',
      {
        key: apiKey, 
        prompt: prompt,
        width: width,
        height: height,
        samples: samples,
        num_inference_steps: 20,
        guidance_scale: 7.5,
        enhance_prompt: true,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrls = response.data;
    return NextResponse.json(imageUrls, { status: 200 });
  } catch (error) {
    console.error("Error generating image: ", error);
    return NextResponse.json({ message: "Error generating image" }, { status: 500 });
  }
}


