import openai

openai.api_key = ""

class ChefGPT:
    def __init__(self, personality):
        self.personality = personality
        self.system_messages = [
            {
                "role": "system",
                "content": (
                    f"You are a {self.personality}. "
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

    def get_response(self, prompt):
        messages = self.system_messages + [{"role": "user", "content": prompt}]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message['content']

italian_chef = ChefGPT("wise and experienced Italian chef that loves to make pasta")

def handle_ingredients(input_str):
    return italian_chef.get_response(f"Suggest a dish name that can be made with these ingredients: {input_str}")

def handle_dish(input_str):
    return italian_chef.get_response(f"Give me a detailed recipe and preparation steps for making {input_str}")

def handle_recipe(input_str):
    return italian_chef.get_response(f"Criticize this recipe and suggest changes: {input_str}")

def main():
    user_input = input("Enter your request (ingredients, dish name, or recipe):\n")
    chef_type = "italian" 

    if ',' in user_input:
        print(handle_ingredients(user_input))
    elif any(char.isdigit() for char in user_input):
        print(handle_recipe(user_input))
    else:
        print(handle_dish(user_input))

if __name__ == "__main__":
    main()
