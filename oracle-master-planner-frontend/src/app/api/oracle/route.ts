import { NextResponse } from 'next/server';
import crypto from 'crypto';

const phi = 1.6180339887;

const harmonicWave = (seed: number, level: number): number => {
  if (level === 0) return seed;
  return parseFloat((harmonicWave(seed, level - 1) * phi).toFixed(6));
};

const calculateSevenMatrix = (seed: number) => {
  const seedStr = seed.toString();
  const fractionalPart = seedStr.includes('.') ? seedStr.split('.')[1] : '999999';
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

  const westernPlanets = { Sun: 0, Moon: 2, Mercury: 4, Venus: 6, Mars: 8, Jupiter: 10 };
  const vedicPlanets = { Surya: 1, Chandra: 3, Budha: 5, Shukra: 7, Mangala: 9, Guru: 11 };
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const westernAlignments: Record<string, string> = {};
  const vedicAlignments: Record<string, string> = {};

  Object.keys(westernPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (westernPlanets[planet as keyof typeof westernPlanets] + 1));
    westernAlignments[planet] = `${planet} in ${zodiacSigns[Math.abs(offset) % 12]}`;
  });

  Object.keys(vedicPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (vedicPlanets[planet as keyof typeof vedicPlanets] + 1));
    vedicAlignments[planet] = `${planet} in ${zodiacSigns[Math.abs(offset + 2) % 12]} (House ${Math.abs(offset % 12) + 1})`;
  });

  const tarotCards = ['The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Justice', 'The Hermit'];
  const ichingHexagrams = ['Hexagram 1: The Creative', 'Hexagram 2: The Receptive', 'Hexagram 11: Peace', 'Hexagram 63: After Completion'];
  const runes = ['Fehu (Abundance)', 'Uruz (Strength)', 'Ansuz (Wisdom)', 'Raidho (Journey)'];

  return {
    numericalRoot,
    kabbalahPath,
    westernAlignments,
    vedicAlignments,
    tarot: tarotCards[numericalRoot % tarotCards.length],
    iching: ichingHexagrams[numericalRoot % ichingHexagrams.length],
    runes: runes[numericalRoot % runes.length],
    digitsArray
  };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, focusContext, query, timeScope } = body;
    
    const personal = body.personal || { name: '', birthDate: '', birthTime: '', birthPlace: '', sex: '' };
    const corporate = body.corporate || { entityName: '', incorporationDate: '', registrationTime: '', headquartersLocation: '' };

    const targetName = mode === 'business' ? (corporate.entityName || 'Venture') : (personal.name || 'Individual');
    const combinedStr = mode === 'business'
      ? `${corporate.entityName}${corporate.incorporationDate}${corporate.registrationTime}${corporate.headquartersLocation}`
      : `${personal.name}${personal.birthDate}${personal.birthTime}${personal.birthPlace}${personal.sex}`;

    const hash = crypto.createHash('sha256').update(combinedStr).digest('hex');
    const seedInt = parseInt(hash.replace(/\D+/g, '').slice(0, 6) || '999999', 10);
    const baseWave = harmonicWave((seedInt % 1000) * phi, 3);

    const coreMatrix = calculateSevenMatrix(baseWave);

    // Deep Numerology Breakdown Processing
    const vowels = ['a','e','i','o','u'];
    const cleanName = targetName.toLowerCase();
    let soulUrgeSum = 0;
    let personalitySum = 0;

    for (let i = 0; i < cleanName.length; i++) {
      const char = cleanName[i];
      const code = char.charCodeAt(0) - 96;
      if (code > 0 && code <= 26) {
        const val = (code % 9) || 9;
        if (vowels.includes(char)) soulUrgeSum += val;
        else personalitySum += val;
      }
    }
    const soulUrge = (soulUrgeSum % 9) || 9;
    const personalityRoot = (personalitySum % 9) || 9;

    const generatedForecasts = [];

    if (timeScope === 'weekly') {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (let i = 0; i < 7; i++) {
        const stepSeed = harmonicWave(baseWave + (i * phi), 2);
        const matrixStep = calculateSevenMatrix(stepSeed);
        generatedForecasts.push({
          period: days[i],
          transitSummary: `Transits track ${matrixStep.westernAlignments.Sun} crossing sidereal ${matrixStep.vedicAlignments.Surya}.`,
          divinationDraw: `Tarot Arc: ${matrixStep.tarot} | Hexagram Vector: ${matrixStep.iching}`,
          actionDirective: i % 2 === 0 ? "Favorable window for direct execution actions and launch initiatives." : "Consolidate structural resource reserves."
        });
      }
    } else if (timeScope === 'monthly') {
      const weeks = ['Week 1: Awakening & Foundations', 'Week 2: Partnership Vectors', 'Week 3: Peak Manifestation Cycles', 'Week 4: Auditing & Cleansing'];
      for (let i = 0; i < 4; i++) {
        const stepSeed = harmonicWave(baseWave + (i * phi * 2), 2);
        const matrixStep = calculateSevenMatrix(stepSeed);
        generatedForecasts.push({
          period: weeks[i],
          transitSummary: `Lunar positions position ${matrixStep.westernAlignments.Moon} alongside Vedic ${matrixStep.vedicAlignments.Chandra}.`,
          divinationDraw: `Rune Drawn: ${matrixStep.runes} | Path Vector: ${matrixStep.kabbalahPath}`,
          actionDirective: `Maximize the current momentum of ${matrixStep.tarot}. Focus strategy configurations directly on eliminating bottlenecks.`
        });
      }
    } else {
      generatedForecasts.push({
        period: 'Current Direct Window',
        transitSummary: `Unified alignment discovered on Tropical Sun (${coreMatrix.westernAlignments.Sun}) and Vedic Kendra components.`,
        divinationDraw: `Tarot Matrix: ${coreMatrix.tarot} | I Ching: ${coreMatrix.iching} | Rune: ${coreMatrix.runes}`,
        actionDirective: `The mathematical configurations point to immediate tactical movement. Execute planned setups.`
      });
    }

    return NextResponse.json({
      success: true,
      seedUsed: baseWave,
      timeScopeSelected: timeScope,
      matrix: {
        numerology: { digitalRoot: coreMatrix.numericalRoot },
        kabbalah: { activePath: coreMatrix.kabbalahPath },
        astrology: { western: coreMatrix.westernAlignments, vedic: coreMatrix.vedicAlignments },
        sortilege: { tarot: coreMatrix.tarot, iching: coreMatrix.iching, runes: coreMatrix.runes }
      },
      numerologyProfile: {
        destinyExpression: coreMatrix.numericalRoot,
        soulUrgeNumber: soulUrge,
        personalityVibration: personalityRoot,
        cosmicMetaphor: `Your structural calculation maps an Expression of ${coreMatrix.numericalRoot}. Your private inner motive (Soul Urge) vibrates at a value score of ${soulUrge}, while your environment persona (Personality) logs a code value of ${personalityRoot}. Combined with your ${coreMatrix.kabbalahPath} channel signature, your current focus requires balancing raw momentum with internal structural compliance.`
      },
      forecastTimeline: generatedForecasts
    }, { status: 200 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Sacred Computation Error", details: error.message }, { status: 500 });
  }
}
