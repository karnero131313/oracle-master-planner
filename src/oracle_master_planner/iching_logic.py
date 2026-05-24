import random
import json
import os

def load_hexagrams():
    # Attempt multiple structural lookups to guarantee discovery across virtual runtimes
    possible_paths = [
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "iching_data.json"),
        os.path.join(os.getcwd(), "src", "oracle_master_planner", "iching_data.json"),
        os.path.join(os.getcwd(), "iching_data.json")
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                continue
    return {}

HEXAGRAMS = load_hexagrams()

def cast_line():
    return sum([random.choice([2, 3]) for _ in range(3)])

def get_hexagram_from_lines(lines):
    key = "".join(['1' if int(line) in [7, 9] else '0' for line in lines])
    # Bidirectional safety lookup fallback
    return HEXAGRAMS.get(key) or HEXAGRAMS.get(key[::-1]) or {"name": f"Unknown Key ({key})", "judgement": "", "image": ""}

def get_changing_lines(lines):
    return [i + 1 for i, val in enumerate(lines) if int(val) in [6, 9]]

def get_future_hexagram_from_lines(lines):
    future_lines = []
    for val in lines:
        if int(val) == 6:
            future_lines.append(7)
        elif int(val) == 9:
            future_lines.append(8)
        else:
            future_lines.append(int(val))
    return get_hexagram_from_lines(future_lines)

def perform_divination(question: str):
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
        result["future_hexagram"] = primary_hexagram

    return result
