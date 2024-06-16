import os
import openai

openai.api_key = ""

class ChefGPT:
    def __init__(self, personality):
        self.personality = personality

    def get_response(self, prompt):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a {self.personality}."},
                {"role": "user", "content": prompt},
            ]
        )
        return response.choices[0].message.content

# Define the chef personalities
indian_chef = ChefGPT("young and spirited Indian cook that loves to make Biryani")
italian_chef = ChefGPT("wise and experienced Italian chef that loves to make pasta")
vegan_french_chef = ChefGPT("focused and detailist vegan French chef")
mexican_chef = ChefGPT("fun and energetic Mexican chef that loves spicy food")

def handle_input(chef, user_input):
    if "ingredients" in user_input:
        return chef.get_response(f"Suggest a dish with these ingredients: {user_input['ingredients']}")
    elif "dish_name" in user_input:
        return chef.get_response(f"Give me a recipe for: {user_input['dish_name']}")
    elif "recipe" in user_input:
        return chef.get_response(f"Criticize and suggest improvements for this recipe: {user_input['recipe']}")
    else:
        return "Invalid input. Please try again with ingredients, dish name, or recipe."

def main():
    user_input = input("Enter your input (e.g., {'ingredients': 'chicken, rice'} or {'dish_name': 'pasta'} or {'recipe': 'recipe details'}): ")
    user_input = eval(user_input)
    chef_type = input("Choose chef type (indian, italian, vegan, mexican): ").strip().lower()

    if chef_type == "indian":
        print(handle_input(indian_chef, user_input))
    elif chef_type == "italian":
        print(handle_input(italian_chef, user_input))
    elif chef_type == "vegan":
        print(handle_input(vegan_french_chef, user_input))
    elif chef_type == "mexican":
        print(handle_input(mexican_chef, user_input))
    else:
        print("Invalid chef type. Please choose from indian, italian, vegan, mexican.")

if __name__ == "__main__":
    main()
