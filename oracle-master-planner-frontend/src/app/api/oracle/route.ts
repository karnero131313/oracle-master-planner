import { NextResponse } from 'next/server';
import crypto from 'crypto';

const phi = 1.6180339887;

const harmonicWave = (seed: number, level: number): number => {
  if (level === 0) return seed;
  return parseFloat((harmonicWave(seed, level - 1) * phi).toFixed(6));
};

const calculateSevenMatrix = (seed: number) => {
  const seedStr = seed.toString();
  const fractionalPart = seedStr.includes('.') ? seedStr.split('.')[1] : '555555';
  const digitsArray = fractionalPart.split('').map(d => parseInt(d, 10) || 0);

  // 1. Numerology Digital Root Reduction
  const numericalRoot = (digitsArray.reduce((a, b) => a + b, 0) % 9) || 9;

  // 2. Kabbalah Alphanumeric Path Mapping
  const kabbalahPath = digitsArray
    .map((digit, i) => {
      return i === 0 ? 'Aleph' : String.fromCharCode((digit % 26) + 97);
    })
    .join('-');

  const westernAlignments: Record<string, string> = {};
  const vedicAlignments: Record<string, string> = {};

  const westernPlanets = { Mercury: 0, Venus: 2, Sun: 4, Mars: 6, Jupiter: 8, Saturn: 10 };
  const vedicPlanets = { Surya: 0, Chandra: 2, Budha: 4, Angarakas: 6, Guru: 8, Shani: 10 };

  const getZodiacSign = (num: number) => {
    const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return zodiacSigns[Math.abs(num) % 12];
  };

  // 3 & 4. Western & Vedic Astrological Alignment Compilations
  Object.keys(westernPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (westernPlanets[planet as keyof typeof westernPlanets] + 1));
    westernAlignments[planet] = `${planet} in ${getZodiacSign(offset)} (${offset % 12 >= 6 ? 'Rising' : 'Setting'})`;
  });

  Object.keys(vedicPlanets).forEach((planet) => {
    const offset = Math.floor(seed * (vedicPlanets[planet as keyof typeof vedicPlanets] + 1));
    vedicAlignments[planet] = `${planet} in ${getZodiacSign(offset)} (${offset % 12 >= 6 ? 'Abiding' : 'Moving'})`;
  });

  // 5, 6 & 7. Sortilege Multi-Matrix Determinations (Tarot, I Ching, Runes)
  const tarotDistribution = `Major Arcana Arc: ${numericalRoot === 1 ? 'The Fool' : 'The Magician'}, Path Factor: ${digitsArray.slice(0, 3).join('/')}`;
  const ichingDistribution = `Hexagram Vector: ${numericalRoot % 2 === 0 ? 'The Creative (Heaven)' : 'The Receptive (Earth)'}, Code Array: ${digitsArray.slice(0, 6).map(d => d % 2).join('')}`;
  const runesDistribution = `Norns Timeline Allocation: Uruz-Fehu-Ansuz, Harmonic Singularity: ${fractionalPart.slice(0, 4)}`;

  return {
    numericalRoot,
    kabbalahPath,
    westernAlignments,
    vedicAlignments,
    tarotDistribution,
    ichingDistribution,
    runesDistribution,
  };
};

const calculateHermesHash = (
  name: string, birthDate: string, birthTime: string, birthPlace: string,
  entityName: string, incorporationDate: string, registrationTime: string, headquartersLocation: string
): number => {
  const combinedStr = `${name}${birthDate}${birthTime}${birthPlace}${entityName}${incorporationDate}${registrationTime}${headquartersLocation}`;
  const hash = crypto.createHash('sha256').update(combinedStr).digest('hex');
  
  const numericSegment = hash.replace(/\D+/g, '').slice(0, 7);
  return parseInt(numericSegment || '1234567', 10);
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const personal = body.personal || { name: '', birthDate: '', birthTime: '', birthPlace: '' };
    const corporate = body.corporate || { entityName: '', incorporationDate: '', registrationTime: '', headquartersLocation: '' };

    const initialHash = calculateHermesHash(
      personal.name || '', personal.birthDate || '', personal.birthTime || '', personal.birthPlace || '',
      corporate.entityName || '', corporate.incorporationDate || '', corporate.registrationTime || '', corporate.headquartersLocation || ''
    );

    const waveResult = harmonicWave((initialHash % 1000) * phi, 3);
    const sevenMatrixData = calculateSevenMatrix(waveResult);

    return NextResponse.json({
      success: true,
      seedUsed: waveResult,
      matrix: {
        numerology: { digitalRoot: sevenMatrixData.numericalRoot },
        kabbalah: { activePath: sevenMatrixData.kabbalahPath },
        astrology: { western: sevenMatrixData.westernAlignments, vedic: sevenMatrixData.vedicAlignments },
        sortilege: { tarot: sevenMatrixData.tarotDistribution, iching: sevenMatrixData.ichingDistribution, runes: sevenMatrixData.runesDistribution }
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Master Oracle Planner Engine Error:", error);
    return NextResponse.json({ error: "Internal Sacred Computation Error", details: error.message }, { status: 500 });
  }
}
