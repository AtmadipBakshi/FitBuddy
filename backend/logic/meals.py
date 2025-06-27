import random

def get_meal_plan(message):
    meals = [
        "How about a high-protein paneer salad with oats?",
        "Try a quinoa bowl with roasted veggies and chickpeas.",
        "Grilled tofu with brown rice and steamed broccoli works great!",
        "Oats, banana, and peanut butter smoothie makes a great breakfast.",
        "Boiled eggs with sautéed spinach and multigrain toast."
    ]
    return random.choice(meals)
