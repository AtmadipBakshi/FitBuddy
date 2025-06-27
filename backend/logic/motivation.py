import random

def get_quote():
    quotes = [
        "Push yourself, because no one else is going to do it for you.",
        "The only bad workout is the one you didn’t do.",
        "Don't limit your challenges. Challenge your limits.",
        "Sweat is fat crying.",
        "You are stronger than you think."
    ]
    return random.choice(quotes)
