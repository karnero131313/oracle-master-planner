import random
import json
import os

# Construct the absolute path to the data file
_current_dir = os.path.dirname(os.path.abspath(__file__))
_data_path = os.path.join(_current_dir, "iching_data.json")

with open(_data_path, 'r') as f:
    HEXAGRAMS = json.load(f)

def cast_line():
    """ Simulates the casting of three coins to determine a single line. """
    return sum([random.choice([2, 3]) for _ in range(3)])

def get_hexagram_from_lines(lines):
    """ Determines the hexagram from a list of six line values (6,7,8,9). """
    # Convert line values to binary: 7,9 (yang) -> 1; 6,8 (yin) -> 0
    key = "".join(['1' if line in [7, 9] else '0' for line in lines])
    
    # Try the clean key first; if it misses, try the reversed key as an infrastructure safety valve
    return HEXAGRAMS.get(key) or HEXAGRAMS.get(key[::-1]) or {"name": "Unknown", "judgement": "", "image": ""}

def get_changing_lines(lines):
    """ Identifies changing lines (6s and 9s). """
    changing = []
    for i, val in enumerate(lines):
        if val == 6 or val == 9:
            changing.append(i + 1)
    return changing

def get_future_hexagram_from_lines(lines):
    """ Determines the future hexagram based on the changing lines. """
    future_lines = []
    for val in lines:
        if val == 6:
            future_lines.append(7) # Changing Yin becomes Yang
        elif val == 9:
            future_lines.append(8) # Changing Yang becomes Yin
        else:
            future_lines.append(val)
    return get_hexagram_from_lines(future_lines)

def perform_divination(question: str):
    """ Performs a full I Ching divination. """
    lines = [cast_line() for _ in range(6)]

    primary_hexagram = get_hexagram_from_lines(lines)
    changing_lines_indices = get_changing_lines(lines)

    result = {
        "question": question,
        "primary_hexagram": primary_hexagram,
        "changing_lines": changing_lines_indices,
        "future_hexagram": None
    }

    if changing_lines_indices:
        result["future_hexagram"] = get_future_hexagram_from_lines(lines)
    else:
        # Fallback to avoid null outputs if no lines change naturally
        result["future_hexagram"] = primary_hexagram

    return result
