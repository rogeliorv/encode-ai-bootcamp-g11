"use client";

import { useMemo, useState } from "react";
import { TextDelta, Text } from "openai/resources/beta/threads/messages.mjs";
import { ArtAssistant } from "@/utils/assistant";
import { ImageGenerator, SizeType } from "@/utils/imageGeneration";

export default function Chat() {
  const assistant = useMemo(() => new ArtAssistant(), []);
  const imageGenerator = useMemo(() => new ImageGenerator(), []);

  const [error, setError] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgSize, setImgSize] = useState<SizeType>('1024x1024');

  const [chatBoxText, setChatBoxText] = useState<string>('');
  const [artDescription, setArtDescription] = useState<string>('');

  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatBoxText(e.target.value);
  }

  const handleIncomingText = (text: Text) => {
    console.log(`handleIncomingText`);
    console.log(text);
  }

  const handleIncomingTextDelta = (textDelta: TextDelta, snapshot: Text) => {
    console.log(`handleIncomingTextDelta`);
    console.log(textDelta);
    setArtDescription(snapshot.value);
  }

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Art creating assistant</h2>
            {error && <p className="text-red">{error}</p>}
            <p className="text-zinc-500 dark:text-zinc-400">
              Describe a famous painting, I will guess which one is it and try to replicate it
            </p>
          </div>

          <textarea
            className="w-full h-32 p-2 bg-opacity-25 bg-gray-500 text-white rounded-lg"
            onBlur={handleBlur} />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={(!chatBoxText)}
            onClick={() => {
              setError('');
              assistant.runAssistantWithText(chatBoxText, handleIncomingText, handleIncomingTextDelta);
            }}
          >
            Get painting details
          </button>

          {artDescription &&
          <>

            <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4">
              {artDescription.split('\n').map((x, key) =>
                <p key={key}>
                  {x}
                </p>
              )}
            </div>

            {imgUrl && <img src={imgUrl} />}

            <p>Choose Size: {imgSize}</p>
            <div className="flex flex-row gap-x-3 gap-y-3">
              <button className='bg-slate-600 px-2 py-2 rounded-lg' onClick={() => setImgSize('1024x1024')}>1024x1024</button>
              <button className='bg-slate-600 px-2 py-2 rounded-lg' onClick={() => setImgSize('1024x1792')}>1024x1792</button>
              <button className='bg-slate-600 px-2 py-2 rounded-lg' onClick={() => setImgSize('1792x1024')}>1792x1024</button>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={(!artDescription || isImageLoading)}
              onClick={() => {
                setError('');
                setIsImageLoading(true);
                imageGenerator.generateImage(artDescription, imgSize).then((imgUrl: string) => {
                  setImgUrl(imgUrl);
                  setIsImageLoading(false);
                }).catch((error) => {
                  setError(error.message);
                  setIsImageLoading(false);
                });
              }}
            >
              { isImageLoading ? 'Loading...' : 'Generate painting' }
            </button>
          </>
          }

        </div>
      </div>
    </main>
  );
}