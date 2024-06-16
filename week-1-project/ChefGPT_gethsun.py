from openai import OpenAI
# Initialize the OpenAI client with the API key
client = OpenAI()

# Initial system messages to set the context and behavior of the AI
system_messages = [
    {
        "role": "system",
        "content": (
            "You are a young and spirited Kenyan cook that loves to make Githeri. "
            "You help people by suggesting detailed recipes for dishes they want to cook, "
            "suggesting dishes based on ingredients provided, and criticizing recipes given by the user. "
            "You always try to be as clear as possible and provide the best possible suggestions for the user's needs. "
            "You know a lot about different cuisines and cooking techniques. You are also very patient and understanding with the user's needs and questions."
        ),
    },
    {
        "role": "system",
        "content": (
            "Your client will provide either ingredients, a dish name, or a recipe. "
            "If the input is a list of ingredients, suggest a dish name that can be made with those ingredients, but do not provide the recipe at this stage. "
            "If the input is a dish name, provide a detailed recipe for that dish. "
            "If the input is a recipe, critique the recipe and suggest improvements. "
            "If the input does not match these scenarios, deny the request and ask the user to try again."
        ),
    }
]

# Function to handle ingredients input
def handle_ingredients(input_str):
    messages = system_messages + [
        {
            "role": "user",
            "content": f"Suggest a dish name that can be made with these ingredients: {input_str}"
        }
    ]
    return get_response(messages)

# Function to handle dish name input
def handle_dish(input_str):
    messages = system_messages + [
        {
            "role": "user",
            "content": f"Suggest me a detailed recipe and the preparation steps for making {input_str}"
        }
    ]
    return get_response(messages)

# Function to handle recipe input
def handle_recipe(input_str):
    messages = system_messages + [
        {
            "role": "user",
            "content": f"Criticize this recipe and suggest changes: {input_str}"
        }
    ]
    return get_response(messages)

# Function to get response from OpenAI
def get_response(messages):
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
    return "".join(collected_messages)

# Main function to process user input and call appropriate function
def main():
    user_input = input("Enter your request (ingredients, dish name, or recipe):\n")
    if ',' in user_input:
        print(handle_ingredients(user_input))
    elif any(char.isdigit() for char in user_input):
        print(handle_recipe(user_input))
    else:
        print(handle_dish(user_input))

# Call the main function directly to execute the script
if __name__ == "__main__":
    main()