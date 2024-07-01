import OpenAI from "openai";


export type SizeType = '1024x1024' | '1792x1024' | '1024x1792' | null;

export class ImageGenerator {

  private openAI;

  constructor() {
    this.openAI = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser:  true});
  }

  generateImage = async (prompt: string, size: SizeType) => {

    const response = await this.openAI.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
    });

    const imgUrl = response.data[0].url || '';
    return imgUrl;
  }
}