import { NextResponse } from 'next/server';
import crypto from 'crypto';

const phi = 1.6180339887;

const harmonicWave = (seed: number, level: number): number => {
  if (level === 0) return seed;
  return parseFloat((harmonicWave(seed, level - 1) * phi).toFixed(6));
};

const calculateSevenMatrix = (seed: number) => {
  const seedStr = seed.toString();
  const fractionalPart = seedStr.includes('.') ? seedStr.split('.')[1] : '777777';
  const digitsArray = fractionalPart.split('').map(d => parseInt(d, 10) || 0);

  const numericalRoot = (digitsArray.reduce((a, b) => a + b, 0) % 9) || 9;

  const paths = [
    'Kether-to-Chokmah (The Crown of Wisdom)', 
    'Chesed-to-Tiphereth (The Conduit of Mercy)', 
    'Netzach-to-Hod (Victory & Splendor Grid)', 
    'Yesod-to-Malkuth (The Gate of Foundation)', 
    'Gevurah-to-Tiphereth (The Altar of Severe Force)'
  ];
  const kabbalahPath = paths[numericalRoot % paths.length];

  const westernAlignments: Record<string, string> = {};
  const vedicAlignments: Record<string, string> = {};

  const westernPlanets = { Sun: 0, Moon: 2, Mercury: 4, Venus: 6, Mars: 8, Jupiter: 10 };
  const vedicPlanets = { Surya: 1, Chandra: 3, Budha: 5, Shukra: 7, Mangala: 9, Guru: 11 };

  const getZodiacSign = (num: number) => {
    const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return zodiacSigns[Math.abs(num) % 12];
  };

  Object.keys(westernPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (westernPlanets[planet as keyof typeof westernPlanets] + 1));
    westernAlignments[planet] = `${planet} in ${getZodiacSign(offset)} (${offset % 12 >= 6 ? 'Direct Placement' : 'Retrograde Anchor'})`;
  });

  Object.keys(vedicPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (vedicPlanets[planet as keyof typeof vedicPlanets] + 1));
    vedicAlignments[planet] = `${planet} in ${getZodiacSign(offset + 2)} (Bhava House ${Math.abs(offset % 12) + 1})`;
  });

  const tarotCards = ['The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Justice', 'The Hermit'];
  const tarotDistribution = `${tarotCards[numericalRoot % tarotCards.length]}`;
  
  const ichingHexagrams = ['Hexagram 1: The Creative (Heaven)', 'Hexagram 2: The Receptive (Earth)', 'Hexagram 11: Harmony (Peace)', 'Hexagram 63: After Completion'];
  const ichingDistribution = ichingHexagrams[numericalRoot % ichingHexagrams.length];
  
  const runes = ['Fehu (Abundance Flow)', 'Uruz (Vital Strength)', 'Ansuz (Divine Wisdom)', 'Raidho (The Journey Forward)'];
  const runesDistribution = `${runes[numericalRoot % runes.length]}`;

  return { numericalRoot, kabbalahPath, westernAlignments, vedicAlignments, tarotDistribution, ichingDistribution, runesDistribution, digitsArray };
};

const generateEsotericInterpretation = (matrix: any, focusContext: string, query: string, mode: string) => {
  const root = matrix.numericalRoot;

  // PREMIUM INTELLECTUAL READOUT DATABASE MAP
  const library: Record<string, Record<number, { summary: string; numerologyDetails: string; sortilegeDetails: string }>> = {
    career: {
      1: {
        summary: "A potent singularity of initialization. The cosmic architecture signals a green-light vector for building entirely new enterprise entities, asserting sovereign execution, and initiating structural independence. Breakthroughs occur by leaving outdated group paradigms behind.",
        numerologyDetails: "Digital Root 1 brings raw pioneering energy. Combined with your Gematria Tree configurations, it demands that you draw an unmanifested, visionary blueprint straight down into physical reality through direct executive action.",
        sortilegeDetails: "The manifestation matrix yields the active presence of your drawn Tarot card alongside the unmitigated movement of your current I Ching hexagram. This specific alignment issues a clear operational directive: initialize your venture immediately. Do not delay waiting for external consensus."
      },
      4: {
        summary: "A phase requiring deliberate structural consolidation and rigid architectural discipline. Grand ideas must now pass a strict auditing index. Your venture's success is completely tethered to structural integrity, systematic scaling, and uncompromised compliance blueprints.",
        numerologyDetails: "Digital Root 4 channels the dense geometric frequency of the cube and the anchor points of your Tree of Life path. This combination warns against loose, scattered exploration. True manifestation occurs solely through rigorous process organization and tracking infrastructure metrics.",
        sortilegeDetails: "The synchronized presence of your sortilege keys demands complete operational patience. Align your daily execution rhythm perfectly with celestial transits. Safety and wealth accumulation are generated through iron-clad predictability and systematic execution loops."
      },
      6: {
        summary: "An expansive vector of harmonic abundance, community stewardship, and enterprise system equilibrium. Your financial returns are intimately bound to service frameworks and optimization of interpersonal value pipelines. This is an ideal window for drafting high-scale B2B agreements or customer-facing operations.",
        numerologyDetails: "Digital Root 6 centers your system on relational harmony, symmetrical distribution, and macro-responsibility. The active Tree of Life matrix balances severe market forces with stable internal protection mechanics.",
        sortilegeDetails: "The unified deployment of your Tarot Arc and the Runic Field reveals a massive, stabilized foundation. Trust the systematic unfolding of your structural timelines. True corporate power at this specific junction emerges via cultivating unbreakable corporate trust and long-term organizational health."
      }
    },
    relationship: {
      4: {
        summary: "The oracle matrix highlights a phase where emotional boundaries and long-term covenant architecture are actively tested. Casual dynamics are shifting toward structural requirements. True alignment occurs only when mutual accountability matrices match romantic ideals.",
        numerologyDetails: "Digital Root 4 forces hidden structural vulnerabilities out into the open. Passing through your calculated Gematria conduit, it commands you to drop emotional projection loops and evaluate your alliances using clear, realistic frameworks.",
        sortilegeDetails: "The unbending matrix of your sortilege results demands stability and internal quietude. Speak from a position of absolute personal integrity. Secure your relationship architecture against chaotic external noise by setting clear, healthy boundaries."
      },
      6: {
        summary: "A profound cycle of natural synthesis, relational healing, and divine attraction patterns. The geometric alignment is opening a friction-free gateway for establishing deep soul covenants, settling legacy conflicts, and anchoring profound emotional safety.",
        numerologyDetails: "Root 6 acts as a healing catalyst within your numeric footprint. It shifts your active Tree path away from defensive tracking and recalibrates your energetic field to radiate open, supportive, and balanced frequencies.",
        sortilegeDetails: "Your Sortilege maps signal maximum harmony. Relational blockages are being cleared by supportive cosmic waves. Move forward with vulnerability, and trust that your current alliances are structurally safe and supported."
      }
    },
    spiritual: {
      4: {
        summary: "A phase of intense karmic anchoring and practical mystical mastery. You are downloading vast, hyper-dimensional concepts and forcing them down into a routine of daily physical discipline. Spiritual illumination must be manifested through regular, structured devotion.",
        numerologyDetails: "Digital Root 4 structures your spiritual altar. The specific geometry of your Tree path signals that spiritual insights are useless unless they are anchored within physical habits, meticulous study, and self-mastery.",
        sortilegeDetails: "The I Ching spectrum indicates that lasting spiritual evolution is never flashy or chaotic. Real ascension occurs silently, step-by-step, through deliberate intention and unshakeable daily alignment."
      },
      6: {
        summary: "An open portal of profound cosmic grace, internal heart-center activation, and unmitigated integration with universal laws. You are moving into deep alignment with your cosmic blueprint, allowing your intuition to bypass cognitive blocks.",
        numerologyDetails: "Root 6 restores energetic symmetry to your spiritual system. It links your personal matrix directly to natural geometric patterns, transforming old spiritual suffering indicators into creative fuel and profound wisdom.",
        sortilegeDetails: "The combined pull of your active Rune and Tarot vector signals complete cosmic validation. You are walking on your true path. Open your perceptions to receive clear guidance from the field."
      }
    },
    crisis: {
      4: {
        summary: "The systematic bottleneck you are encountering stems directly from over-engineered processes or a complete loss of strategic flexibility. You have become trapped within an outdated rule matrix or a rigid operational structure that refuses to adapt to current market currents.",
        numerologyDetails: "Under a crisis context, Root 4 acts as a warning indicator for structural stagnation. Your Tree path reveals that a lack of adaptability is causing system-wide stress. You must audit your operations and delete toxic bottlenecks.",
        sortilegeDetails: "The Tarot arc suggests using structured logic and objective data to solve this crisis. Do not rely on emotional panic response loops. Methodically rebuild your vulnerable points to restore complete systemic safety."
      },
      6: {
        summary: "Your current bottleneck involves a critical imbalance in your resource distribution pipelines or an emotional overload within your key alliances. You are expending vast amounts of energy fixing others' problems at the direct expense of your own systemic stability.",
        numerologyDetails: "Root 6 in a crisis vector points to boundary collapses or compromised system symmetry. Your Gematria node demands that you immediately stop people-pleasing loops or unsustainable operational outflows.",
        sortilegeDetails: "The Runic field orders an immediate return to internal balance. Pull your energy back from external conflicts, stabilize your home base or core assets, and execute a balanced strategy to clear the anomaly."
      }
    }
  };

  // ADVANCED CROSS-CONTEXT CONDUCTION FALLBACKS
  // Dynamically weaves specific inputs right into the text if exact root index is unique
  const contextMap = library[focusContext] || library['career'];
  return contextMap[root] || {
    summary: `A complex dynamic convergence is currently shaping your scenario. Under the calculation of Destiny Vector ${root}, this junction demands that you align your immediate tactical steps with your underlying cosmic blueprint. Your explicit query context indicates that standard, generic solutions will not resolve this—only tailored, strategic execution will break the bottleneck.`,
    numerologyDetails: `Digital Root ${root} passing through your ${matrix.kabbalahPath} node demonstrates that your current signature is condensing into a highly specialized developmental arc. Energy is gathering beneath the surface, preparing for structural transformation.`,
    sortilegeDetails: `The combined alignment of ${matrix.tarotDistribution} and the flow state of ${matrix.ichingDistribution} indicate that safety lies inside deep clarity. Act through deliberate intention rather than panic response loops.`
  };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, focusContext, query } = body;
    
    const personal = body.personal || { name: '', birthDate: '', birthTime: '', birthPlace: '', sex: '' };
    const corporate = body.corporate || { entityName: '', incorporationDate: '', registrationTime: '', headquartersLocation: '' };

    const combinedStr = mode === 'business'
      ? `${corporate.entityName}${corporate.incorporationDate}${corporate.registrationTime}${corporate.headquartersLocation}`
      : `${personal.name}${personal.birthDate}${personal.birthTime}${personal.birthPlace}${personal.sex}`;

    const hash = crypto.createHash('sha256').update(combinedStr).digest('hex');
    const seedInt = parseInt(hash.replace(/\D+/g, '').slice(0, 6) || '888888', 10);

    const waveResult = harmonicWave((seedInt % 1000) * phi, 3);
    const matrixData = calculateSevenMatrix(waveResult);
    
    const interpretationText = generateEsotericInterpretation(matrixData, focusContext || 'career', query || '', mode || 'personal');

    return NextResponse.json({
      success: true,
      seedUsed: waveResult,
      matrix: {
        numerology: { digitalRoot: matrixData.numericalRoot },
        kabbalah: { activePath: matrixData.kabbalahPath },
        astrology: { western: matrixData.westernAlignments, vedic: matrixData.vedicAlignments },
        sortilege: { tarot: matrixData.tarotDistribution, iching: matrixData.ichingDistribution, runes: matrixData.runesDistribution }
      },
      interpretation: interpretationText
    }, { status: 200 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Sacred Computation Error", details: error.message }, { status: 500 });
  }
}
