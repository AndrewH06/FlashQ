import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
  text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prompt = req.body.prompt;

  if (!prompt || prompt === "") {
    return new Response("Please input a prompt", { status: 400 });
  }

  const aiResult = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Turn these notes into flashcards and format them as a json object with the keys "front" and "back" where "front" contains a question or definition and "back" contains the answer: ${prompt}`,
    temperature: 0.3,
    max_tokens: 2048,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const response =
    aiResult.data.choices[0].text?.trim() || "Sorry, there was an error";
  res.status(200).json({ text: response });
}
