"use client";

import React, { useMemo, useState } from "react";
import { TextDelta, Text } from "openai/resources/beta/threads/messages.mjs";
import { ArtAssistant } from "@/utils/assistant";
import { ImageGenerator, SizeType } from "@/utils/imageGeneration";

const Chat = () => {
  // Initialize assistants and generators using useMemo for performance optimization
  const assistant = useMemo(() => new ArtAssistant(), []);
  const imageGenerator = useMemo(() => new ImageGenerator(), []);

  // Use a single state object for better state management
  const [state, setState] = useState({
    error: '',
    isImageLoading: false,
    imgUrl: '',
    imgSize: '1024x1024' as SizeType, // Type assertion for imgSize
    chatBoxText: '',
    artDescription: ''
  });

  // Handle onBlur event for textarea
  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, chatBoxText: e.target.value }));
  };

  // Callback function for handling incoming text from assistant
  const handleIncomingText = (text: Text) => {
    console.log(`handleIncomingText`);
    console.log(text);
  };

  // Callback function for handling incoming text delta from assistant
  const handleIncomingTextDelta = (textDelta: TextDelta, snapshot: Text) => {
    setState((prevState) => ({ ...prevState, artDescription: snapshot.value }));
  };

  // Function to generate image based on art description
  const generateImage = async () => {
    try {
      setState((prevState) => ({ ...prevState, isImageLoading: true, error: '' }));
      const imgUrl = await imageGenerator.generateImage(state.artDescription, state.imgSize);
      setState((prevState) => ({ ...prevState, imgUrl, isImageLoading: false }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.message, isImageLoading: false }));
    }
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Art creating assistant</h2>
            {state.error && <p className="text-red">{state.error}</p>}
            <p className="text-zinc-500 dark:text-zinc-400">
              Describe a famous painting, I will guess which one it is and try to replicate it
            </p>
          </div>

          {/* Textarea for user input */}
          <textarea
            className="w-full h-32 p-2 bg-opacity-25 bg-gray-500 text-white rounded-lg"
            onBlur={handleBlur}
            aria-label="Painting description input"
          />

          {/* Button to trigger assistant */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={!state.chatBoxText}
            onClick={() => {
              setState((prevState) => ({ ...prevState, error: '' }));
              assistant.runAssistantWithText(state.chatBoxText, handleIncomingText, handleIncomingTextDelta);
            }}
            aria-label="Get painting details"
          >
            Get painting details
          </button>

          {/* Display art description */}
          {state.artDescription && (
            <>
              <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4">
                {state.artDescription.split('\n').map((x, key) => (
                  <p key={key}>{x}</p>
                ))}
              </div>

              {/* Display generated image */}
              {state.imgUrl && <img src={state.imgUrl} alt="Generated painting" />}

              {/* Image size selection */}
              <p>Choose Size: {state.imgSize}</p>
              <div className="flex flex-row gap-x-3 gap-y-3">
                <button
                  className="bg-slate-600 px-2 py-2 rounded-lg"
                  onClick={() => setState((prevState) => ({ ...prevState, imgSize: '1024x1024' }))}
                >
                  1024x1024
                </button>
                <button
                  className="bg-slate-600 px-2 py-2 rounded-lg"
                  onClick={() => setState((prevState) => ({ ...prevState, imgSize: '1024x1792' }))}
                >
                  1024x1792
                </button>
                <button
                  className="bg-slate-600 px-2 py-2 rounded-lg"
                  onClick={() => setState((prevState) => ({ ...prevState, imgSize: '1792x1024' }))}
                >
                  1792x1024
                </button>
              </div>

              {/* Button to generate image */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={!state.artDescription || state.isImageLoading}
                onClick={generateImage}
                aria-label="Generate painting"
              >
                {state.isImageLoading ? 'Loading...' : 'Generate painting'}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default React.memo(Chat);
