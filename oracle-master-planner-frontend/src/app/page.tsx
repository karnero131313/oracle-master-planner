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

  const paths = ['Kether-to-Chokmah', 'Chesed-to-Tiphereth', 'Netzach-to-Hod', 'Yesod-to-Malkuth', 'Gevurah-to-Tiphereth', 'Chokmah-to-Binah'];
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
    westernAlignments[planet] = `${planet} in ${getZodiacSign(offset)} (${offset % 12 >= 6 ? 'Direct' : 'Retrograde'})`;
  });

  Object.keys(vedicPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (vedicPlanets[planet as keyof typeof vedicPlanets] + 1));
    vedicAlignments[planet] = `${planet} in ${getZodiacSign(offset + 3)} (Kendra House ${Math.abs(offset % 12) + 1})`;
  });

  const tarotCards = ['The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Justice'];
  const tarotDistribution = `${tarotCards[numericalRoot % tarotCards.length]} / Axis Factor: ${digitsArray.slice(0, 2).join(':')}`;
  
  const ichingHexagrams = ['Hexagram 1: The Creative', 'Hexagram 2: The Receptive', 'Hexagram 11: Peace', 'Hexagram 63: After Completion'];
  const ichingDistribution = ichingHexagrams[numericalRoot % ichingHexagrams.length];
  
  const runes = ['Fehu (Wealth)', 'Uruz (Strength)', 'Ansuz (Wisdom)', 'Raidho (Journey)'];
  const runesDistribution = `${runes[numericalRoot % runes.length]} in Present Node`;

  return { numericalRoot, kabbalahPath, westernAlignments, vedicAlignments, tarotDistribution, ichingDistribution, runesDistribution, digitsArray };
};

const generateEsotericInterpretation = (matrix: any, focusContext: string, query: string, mode: string) => {
  const root = matrix.numericalRoot;
  
  const interpretations: Record<string, Record<number, { summary: string; numerologyDetails: string; sortilegeDetails: string }>> = {
    career: {
      1: { summary: "A singularity of initialization. A potent window for starting corporate structures or initiating independent execution loops.", numerologyDetails: "Digital Root 1 implies raw leadership energy. Gematria paths signal an inflow of visionary force down to material manifestation.", sortilegeDetails: "The Tarot card indicates you have all necessary resources directly in front of you. Build concrete foundations immediately." },
      2: { summary: "A cycle requiring dual-alignment or strategic partnership vectors. Avoid solo actions at this juncture.", numerologyDetails: "Digital Root 2 anchors relational mathematics. Cooperation yields exponential gains compared to forced independent tracking.", sortilegeDetails: "The balance of binary forces suggests waiting for counterpart validation before committing operational capital." },
      9: { summary: "Completion boundary reached. Cleanse legacy infrastructure loops to make room for high-scale enterprise evolutions.", numerologyDetails: "Root 9 indicates the absolute maximum accumulation of experience. The geometric trajectory forces structural release.", sortilegeDetails: "Final card arrays indicate a closing gate. Clear old debts or data backlogs before mapping the next epoch." }
    }
  };

  const contextMap = interpretations[focusContext] || interpretations['career'];
  return contextMap[root] || {
    summary: `A balance of harmonic currents under Destiny Vector ${root}. The geometry suggests aligning individual action with celestial rhythms to break through your current ${focusContext} questions.`,
    numerologyDetails: `Digital Root ${root} combined with the ${matrix.kabbalahPath} tree coordinates signals a stable foundation. Energy is consolidating structurally rather than scattering.`,
    sortilegeDetails: `The synchronized pull of ${matrix.tarotDistribution} alongside ${matrix.ichingDistribution} demands internal quietude. Act through deliberate intention rather than panic response loops.`
  };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, focusContext, query } = body;
    
    const personal = body.personal || { name: '', birthDate: '', birthTime: '', birthPlace: '' };
    const corporate = body.corporate || { entityName: '', incorporationDate: '', registrationTime: '', headquartersLocation: '' };

    // Deterministic hashing of input parameters
    const combinedStr = `${personal.name}${personal.birthDate}${personal.birthTime}${personal.birthPlace}${corporate.entityName}${corporate.incorporationDate}${corporate.registrationTime}${corporate.headquartersLocation}`;
    const hash = crypto.createHash('sha256').update(combinedStr).digest('hex');
    const seedInt = parseInt(hash.replace(/\D+/g, '').slice(0, 6) || '777777', 10);

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
