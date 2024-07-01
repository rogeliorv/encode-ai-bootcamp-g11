import OpenAI from "openai";
import { Assistant, Thread } from "openai/resources/beta/index.mjs";
import { Text, TextDelta } from "openai/resources/beta/threads/messages.mjs";

export class ArtAssistant {

  private openAI;
  private assistant?: Assistant = undefined;
  private thread?: Thread;

  constructor() {
    this.openAI = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser:  true});
    this.createArtAssistant();
  }

  createArtAssistant = async () => {
    this.openAI.beta.assistants.create({
      name: "Art assistant",
      instructions: `You are an expert in paintings and art.
      Given a user description of a painting you will guess what famous art by painting name and state its:  style, elements, details and colors.
      You will follow up with a paragraph to tell an AI how to autogenerate this painting.`,
      model: "gpt-4o"
    }).then((assistant) => {
      this.assistant = assistant;
      this.openAI.beta.threads.create().then((thread) => this.thread = thread);
    })
  }

  runAssistantWithText = async (
    message: string,
    onTextCreatedCallback: (text: Text) => void,
    onTextAddedCallback: (textDelta: TextDelta, snapshot: Text) => void,
  ) => {

    if(!this.assistant) {
      throw 'Assistant not defined';
    }

    if(!this.thread) {
      throw 'Thread not defined';
    }

    await this.openAI.beta.threads.messages.create(
      this.thread.id,
      {
        role: "user",
        content: message,
      }
    );

    const run = this.openAI.beta.threads.runs.stream(this.thread.id, { assistant_id: this.assistant.id })
    .on('textCreated', (text) => onTextCreatedCallback(text))
    .on('textDelta', (textDelta, snapshot) => onTextAddedCallback(textDelta, snapshot))
  }
}