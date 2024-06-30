"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();

  const [state, setState] = useState({
    genre: "",
    tone: "",
    funny: "",
    appropriate: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Art creating assistant (WORK IN PROGRESS)</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Describe an famous painting, I will guess which one is it and try to replicate it
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>
          </div>


          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || (!state.genre || !state.tone)}
            onClick={() => {
              append({
                role: "user",
                content: `Generate a ${state.genre} joke in a ${state.tone} tone`,
              });
              append({
                role: "user",
                content: `Make it ${state.funny === 'funny' ? 'funny' : 'not funny'} and ${state.appropriate === 'appropriate' ? 'appropriate' : 'not appropriate'}`,
              })
            }}
          >
            Generate joke
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}