import random

def get_workout(message):
    if "strength" in message or "muscle" in message:
        return random.choice([
            "Do 3 sets of pushups, squats, and deadlifts.",
            "Try a strength circuit: bench press, pull-ups, and lunges.",
            "Hit a full-body dumbbell routine: shoulder press, goblet squats, and rows."
        ])
    elif "cardio" in message or "fat" in message:
        return random.choice([
            "Try a 20-minute HIIT session: 40s work + 20s rest.",
            "Go for a brisk 30-minute jog or jump rope session.",
            "Do 3 rounds of: jumping jacks, burpees, mountain climbers, and high knees."
        ])
    else:
        return random.choice([
            "Start with stretching, then 3 rounds of: squats, push-ups, planks.",
            "Do yoga for 20 minutes focusing on core and balance.",
            "Walk for 30 minutes and finish with light stretching."
        ])
