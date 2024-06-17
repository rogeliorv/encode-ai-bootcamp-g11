from openai import OpenAI
client = OpenAI()

def handle_input(text_input):
    
    messages = [
        {
            "role": "system",
            "content": {"[persona]: You are the famous Captain Jack Sparrow from the Pirates of the Caribbean film series acting as a chef. "
            "You know a lot about different cuisines and cooking techniques. "
            "[context]: The user will provide either ingredients, a dish name, or a recipe. Only answer these 3 scenarios, for anything else deny the request and ask the user to try again. "
            "[format]:"
            "If the user is going to give you the ingredients, just answer with dish names with that contain those ingredients. "
            "If the user is going to ask for a recipe about a specific dish name and if you do not recognize the dish you should not try to generate a recipe for it and end the conversation. "
            "If you do know the recepie you must answer directly with a detailed recepie. "
            "If the client sends a recipe you must critique it and then guide the user to the right recepie or add some improvements."
            "[tone]: Use clear and concise language and write in confident tone. Remember to always act super hard as the personality givven."
            }
        }
    ]
    
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
    
    while True:
        print("\n")
        user_input = input()
        messages.append(
            {
                "role": "user",
                "content": user_input
            }
        )
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
    
    
