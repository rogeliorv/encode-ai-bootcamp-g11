// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

type Data = {
  name: string;
};

const openai = new OpenAI({
  apiKey: '',
  baseURL: "http://127.0.0.1:5000/v1",
});

export default async function handleOpenAICompletion(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;

  const response = await openai.chat.completions.create({
    // NOTEL Doesn't really matter here, since the model executing is the one
    // we've loaded in our text-generation-webui project
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are a professional storyteller who has been hired to write a series of short stories for a new anthology. The stories should be captivating, imaginative, and thought-provoking. They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. Each story should be unique and memorable, with compelling characters and unexpected plot twists.`,
      },
      ...(messages || [])
    ],
  });


  const stream = OpenAIStream(response);
  // res.status(200).json(new StreamingTextResponse(stream).json());
  // Convert the streaming response to a string
  let completion = '';

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      let decoded = decoder.decode(value, { stream: !done });
      decoded = decoded.replace('\\\\n', '\n');
      decoded = decoded.replace('\\n', '\n');
      decoded = decoded.replace('\\"', '"');
      console.log(decoded);
      completion += decoded.trim().slice(3, decoded.length-2);
    }
  }

  console.log(completion);
  res.status(200).json({ completion });
}