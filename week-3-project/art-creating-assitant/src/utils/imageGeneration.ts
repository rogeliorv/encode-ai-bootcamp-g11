import OpenAI from "openai";

export class ImageGenerator {

  private openAI;

  constructor() {
    this.openAI = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser:  true});
  }

  generateImage = async (prompt: string) => {

    const response = await this.openAI.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log(response.data);
    const imgUrl = response.data[0].url || '';
    return imgUrl;
  }
}