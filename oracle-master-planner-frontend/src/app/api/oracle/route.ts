import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, system } = body;

    if (!query || !system) {
      return NextResponse.json({ error: "Missing query or system selection." }, { status: 400 });
    }

    // ==========================================
    // 1. I-CHING ENGINE METHOD
    // ==========================================
    if (system === 'iching') {
      const lines = [];
      for (let i = 0; i < 6; i++) {
        let lineSum = 0;
        for (let j = 0; j < 3; j++) {
          lineSum += (Math.random() < 0.5) ? 2 : 3;
        }
        lines.push((lineSum === 7 || lineSum === 9) ? "1" : "0");
      }
      const hexagramBinary = lines.reverse().join("");
      let hexagramTitle = `Hexagram ID: ${hexagramBinary}`;
      let advice = "Change is constant; adapt with mindfulness.";
      
      if (hexagramBinary === "111111") {
        hexagramTitle = "The Creative (Heaven)";
        advice = "New ideas lead to new beginnings. Take bold action.";
      } else if (hexagramBinary === "000000") {
        hexagramTitle = "The Receptive (Earth)";
        advice = "Patience and acceptance bring harmony. Allow things to unfold naturally.";
      }
      return NextResponse.json({ hexagram: hexagramTitle, binary: hexagramBinary, advisory: advice }, { status: 200 });
    }

    // ==========================================
    // 2. TAROT ENGINE METHOD
    // ==========================================
    if (system === 'tarot') {
      const deck = [
        { id: 1, name: "The Fool", upright: "New journeys, optimism, innocence.", reversed: "Recklessness, risk-taking, holding back." },
        { id: 2, name: "The Magician", upright: "Manifestation, resourcefulness, power.", reversed: "Manipulation, poor planning, wasted talent." },
        { id: 3, name: "The High Priestess", upright: "Intuition, sacred knowledge, divine feminine.", reversed: "Secret motives, ignoring inner wisdom." },
        { id: 4, name: "The Empress", upright: "Nature, abundance, nurturing.", reversed: "Dependence, smothering, emptiness." },
        { id: 5, name: "The Emperor", upright: "Authority, structure, solid foundation.", reversed: "Tyranny, rigidity, coldness." }
      ];
      const drawPile = [...deck];
      const selectedCards = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * drawPile.length);
        const pulledCard = drawPile.splice(randomIndex, 1)[0];
        const isUpright = Math.random() < 0.5;
        selectedCards.push({
          id: pulledCard.id,
          name: pulledCard.name,
          orientation: isUpright ? "Upright" : "Reversed",
          description: isUpright ? pulledCard.upright : pulledCard.reversed
        });
      }
      return NextResponse.json({ cards: selectedCards }, { status: 200 });
    }

    // ==========================================
    // 3. RUNES ENGINE METHOD
    // ==========================================
    if (system === 'runes') {
      const runePool = [
        { id: 1, name: "Fehu", meaning: "Wealth, abundance, flowing energy, success." },
        { id: 2, name: "Uruz", meaning: "Physical strength, speed, untamed potential, health." },
        { id: 3, name: "Thurisaz", meaning: "Protection, reactive force, conflict, catalyst." },
        { id: 4, name: "Ansuz", meaning: "Divine inspiration, communication, truth, wisdom." },
        { id: 5, name: "Raidho", meaning: "Travel, rhythm, personal alignment, evolution." }
      ];
      const drawPile = [...runePool];
      const drawn = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * drawPile.length);
        drawn.push(drawPile.splice(randomIndex, 1)[0]);
      }
      return NextResponse.json({
        norns: {
          urd: { name: drawn[0].name + " (Past)", interpretation: drawn[0].meaning },
          verdandi: { name: drawn[1].name + " (Present)", interpretation: drawn[1].meaning },
          skuld: { name: drawn[2].name + " (Future)", interpretation: drawn[2].meaning }
        }
      }, { status: 200 });
    }

    return NextResponse.json({ error: "Unsupported oracle system." }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
