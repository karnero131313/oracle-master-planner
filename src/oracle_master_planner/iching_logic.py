import random
from .iching_data import HEXAGRAMS

def cast_line():
    """ Simulates the casting of three coins to determine a single line. """
    # 2 = broken line (Yin), 3 = solid line (Yang)
    # Values 6,7,8,9 represent changing yin, stable yang, stable yin, changing yang
    return sum([random.choice([2, 3]) for _ in range(3)])

def get_hexagram_from_lines(lines):
    """ Determines the hexagram from a list of six line values (6,7,8,9). """
    # Convert line values to binary: 7,9 (yang) -> 1; 6,8 (yin) -> 0
    binary_representation = "".join(['1' if line in [7, 9] else '0' for line in lines])
    key = binary_representation[::-1] # Reverse for lookup, as lines are cast from bottom up
    return HEXAGRAMS.get(key, {"name": "Unknown", "judgement": "", "image": ""})

def get_changing_lines(lines):
    """ Identifies changing lines (6s and 9s). """
    changing = []
    for i, val in enumerate(lines):
        if val == 6 or val == 9:
            changing.append(i + 1) # 1-indexed for the user
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
    """ 
    Performs a full I Ching divination, returning the primary hexagram,
    any changing lines, and the future hexagram if applicable.
    """
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
        
    return result
