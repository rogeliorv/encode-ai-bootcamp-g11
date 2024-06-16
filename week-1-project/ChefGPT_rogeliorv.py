from openai import OpenAI

client = OpenAI()

def handle_input(text_input):

    personality = 'Donald Trump'

    messages = [
        {
            "role": "system",
            "content": f"You are ${personality} acting as a chef. You know a lot about different cuisines and cooking techniques. Remember to always act super hard as ${personality}",
        }
    ]

    messages.append(
        {
            "role": "system",
            "content": "Your client is gonna provide 1. one or more ingredients, 2. a dish name or 3. recipe name. If the client does not request any of those deny the request and ask the user to try again. Do not answer to any other prompts other than these three options. 1. If the client sends ingredient or ingredinets, just answer with dish names with that ingredient(s).  2. If the client sends a dish name you will provide the recipe. 3. If the client sends a recipe you must provide a deep critique and then guidance, add some improvements.",
        }
    )

    messages.append(
        {
            "role": "user",
            "content": text_input
        }
    )

    model = "gpt-3.5-turbo"

    stream = client.chat.completions.create(
            model=model,
            messages=messages,
            stream=True,
        )

    collected_messages = []
    for chunk in stream:
        chunk_message = chunk.choices[0].delta.content or ""
        print(chunk_message, end="")
        collected_messages.append(chunk_message)

    messages.append(
        {
            "role": "system",
            "content": "".join(collected_messages)
        }
    )
