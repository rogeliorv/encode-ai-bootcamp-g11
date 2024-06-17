import ChefGPT_gethsun
import ChefGPT_rogeliorv
import ChefGPT_tiberiu
import ChefGPT_para
import random

def chef_tiberiu(text_input):
    if ',' in text_input:
        print(ChefGPT_tiberiu.handle_ingredients(text_input))
    elif any(char.isdigit() for char in text_input):
        print(ChefGPT_tiberiu.handle_recipe(text_input))
    else:
        print(ChefGPT_tiberiu.handle_dish(text_input))

def chef_gethsun(text_input):
    if ',' in text_input:
        print(ChefGPT_gethsun.handle_ingredients(text_input))
    elif any(char.isdigit() for char in text_input):
        print(ChefGPT_gethsun.handle_recipe(text_input))
    else:
        print(ChefGPT_gethsun.handle_dish(text_input))

def chef_rogeliorv(text_input):
    ChefGPT_rogeliorv.handle_input(text_input)

def chef_para(text_input):
    print(ChefGPT_para.handle_input(text_input))

personalities = [chef_tiberiu, chef_gethsun, chef_rogeliorv, chef_para]
chosen_personality = random.choice(personalities)
print(f'Your chef for the day is ${chosen_personality.__name__}. Run the script again if you want a different chef.')

while True:
    print("\n")
    text_input = input("Type the either 1. List of ingredients 2. Recipe name or 3. A recipe:\n")
    chosen_personality(text_input)
