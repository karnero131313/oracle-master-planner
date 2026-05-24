import random
import json
import os

# Hardcoded structural database to guarantee Zero-IO path discovery across virtual container runtimes
HEXAGRAMS = {
    "000000": {
        "number": 2,
        "name": "The Receptive",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Receptive.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000001": {
        "number": 23,
        "name": "Splitting Apart",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Splitting Apart.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000010": {
        "number": 8,
        "name": "Holding Together",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Holding Together.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000011": {
        "number": 20,
        "name": "Contemplation",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Contemplation.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000100": {
        "number": 16,
        "name": "Enthusiasm",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Enthusiasm.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000101": {
        "number": 35,
        "name": "Progress",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Progress.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000110": {
        "number": 45,
        "name": "Gathering Together",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Gathering Together.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "000111": {
        "number": 8,
        "name": "Holding Together",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Holding Together.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001000": {
        "number": 15,
        "name": "Modesty",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Modesty.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001001": {
        "number": 52,
        "name": "Keeping Still",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Keeping Still.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001010": {
        "number": 39,
        "name": "Obstruction",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Obstruction.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001011": {
        "number": 53,
        "name": "Development",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Development.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001100": {
        "number": 62,
        "name": "Small Preponderance",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Small Preponderance.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001101": {
        "number": 56,
        "name": "The Wanderer",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Wanderer.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001110": {
        "number": 31,
        "name": "Influence",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Influence.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "001111": {
        "number": 33,
        "name": "Retreat",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Retreat.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010000": {
        "number": 7,
        "name": "The Army",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Army.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010001": {
        "number": 4,
        "name": "Youthful Folly",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Youthful Folly.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010010": {
        "number": 29,
        "name": "The Abysmal",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Abysmal.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010011": {
        "number": 59,
        "name": "Dispersion",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Dispersion.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010100": {
        "number": 40,
        "name": "Deliverance",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Deliverance.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010101": {
        "number": 64,
        "name": "Before Completion",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Before Completion.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010110": {
        "number": 47,
        "name": "Oppression",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Oppression.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "010111": {
        "number": 6,
        "name": "Conflict",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Conflict.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011000": {
        "number": 46,
        "name": "Pushing Upward",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Pushing Upward.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011001": {
        "number": 26,
        "name": "Great Taming",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Great Taming.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011010": {
        "number": 48,
        "name": "The Well",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Well.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011011": {
        "number": 57,
        "name": "The Gentle",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Gentle.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011100": {
        "number": 32,
        "name": "Duration",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Duration.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011101": {
        "number": 30,
        "name": "The Clinging",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Clinging.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011110": {
        "number": 28,
        "name": "Great Preponderance",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Great Preponderance.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "011111": {
        "number": 44,
        "name": "Coming to Meet",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Coming to Meet.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100000": {
        "number": 24,
        "name": "Return",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Return.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100001": {
        "number": 27,
        "name": "Mouth Corners",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Mouth Corners.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100010": {
        "number": 3,
        "name": "Difficulty at the Beginning",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Difficulty at the Beginning.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100011": {
        "number": 42,
        "name": "Increase",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Increase.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100100": {
        "number": 51,
        "name": "The Arousing",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Arousing.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100101": {
        "number": 21,
        "name": "Biting Through",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Biting Through.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100110": {
        "number": 39,
        "name": "Obstruction",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Obstruction.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "100111": {
        "number": 25,
        "name": "Innocence",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Innocence.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101000": {
        "number": 36,
        "name": "Darkening of the Light",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Darkening of the Light.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101001": {
        "number": 22,
        "name": "Grace",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Grace.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101010": {
        "number": 63,
        "name": "After Completion",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of After Completion.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101011": {
        "number": 44,
        "name": "Coming to Meet",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Coming to Meet.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101100": {
        "number": 55,
        "name": "Abundance",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Abundance.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101101": {
        "number": 38,
        "name": "Opposition",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Opposition.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101110": {
        "number": 47,
        "name": "Oppression",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Oppression.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "101111": {
        "number": 49,
        "name": "Revolution",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Revolution.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110000": {
        "number": 19,
        "name": "Approach",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Approach.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110001": {
        "number": 41,
        "name": "Decrease",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Decrease.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110010": {
        "number": 60,
        "name": "Limitation",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Limitation.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110011": {
        "number": 61,
        "name": "Inner Truth",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Inner Truth.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110100": {
        "number": 54,
        "name": "The Marrying Maiden",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Marrying Maiden.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110101": {
        "number": 54,
        "name": "The Marrying Maiden",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Marrying Maiden.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110110": {
        "number": 58,
        "name": "The Joyous",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Joyous.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "110111": {
        "number": 10,
        "name": "Tread",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Tread.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111000": {
        "number": 11,
        "name": "Peace",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Peace.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111001": {
        "number": 26,
        "name": "Great Taming",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Great Taming.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111010": {
        "number": 5,
        "name": "Waiting",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Waiting.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111011": {
        "number": 9,
        "name": "Small Taming",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Small Taming.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111100": {
        "number": 34,
        "name": "Great Power",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Great Power.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111101": {
        "number": 50,
        "name": "The Cauldron",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Cauldron.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111110": {
        "number": 43,
        "name": "Breakthrough",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of Breakthrough.",
        "image": "The skies and currents realign matrix parameters cleanly."
    },
    "111111": {
        "number": 1,
        "name": "The Creative",
        "chinese_name": "卦",
        "judgement": "Perseverance furthers success under the archetypal lens of The Creative.",
        "image": "The skies and currents realign matrix parameters cleanly."
    }
}

def cast_line():
    return sum([random.choice([2, 3]) for _ in range(3)])

def get_hexagram_from_lines(lines):
    key = "".join(['1' if int(line) in [7, 9] else '0' for line in lines])
    # Bidirectional safety lookup fallback vectors
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
