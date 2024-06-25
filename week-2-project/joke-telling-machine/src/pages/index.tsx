"use client";

import { useState } from "react";
import { useChat } from "ai/react";

const genres = [
  { emoji: "🧙", value: "Innocent" },
  { emoji: "🕵️", value: "Math" },
  { emoji: "💑", value: "Romance" },
  { emoji: "🚀", value: "Sci-Fi" },
];
const tones = [
  { emoji: "😊", value: "Trump" },
  { emoji: "😊", value: "Stalin" },
  { emoji: "😊", value: "Goku" },
  { emoji: "😊", value: "Dua Lipa" },
];

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
            <h2 className="text-3xl font-bold">The Joker</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the jokes by selecting stuff
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">For un-fun people</h3>

            <div className="flex flex-wrap justify-center">
              <div className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                <input
                  id={'funny'}
                  type="checkbox"
                  name="funny"
                  value={'funny'}
                  onChange={handleChange}
                />
                <label className="ml-2" htmlFor={'funny'}>
                  Funny
                </label>
              </div>
              <div className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                <input
                  id={'appropriate'}
                  type="checkbox"
                  name="appropriate"
                  value={'appropriate'}
                  onChange={handleChange}
                />
                <label className="ml-2" htmlFor={'appropriate'}>
                  Appropriate
                </label>
              </div>
            </div>
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