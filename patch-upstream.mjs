import fs from 'node:fs';
import path from 'node:path';
const root = process.argv[2] || 'ara-source';
const paramsFile = path.join(root, 'src/core/params.ts');
const quickFile = path.join(root, 'src/app/ui/quick-data.ts');
let params = fs.readFileSync(paramsFile, 'utf8');
let quick = fs.readFileSync(quickFile, 'utf8');

const presetsAnchor = "export const PRESETS: Record<string, Partial<HumanParams>> = {";
if (!params.includes(presetsAnchor)) throw new Error('PRESETS insertion point not found');
if (!params.includes("'TRIKAAL — भारतीय उत्सवी परिधान'")) {
  const indianPresets = `
  'TRIKAAL — भारतीय उत्सवी परिधान': {
    gender: 0, age: 0.53, muscle: 0.42, weight: 0.48, height: 0.54, proportions: 0.86,
    african: 0.03, asian: 0.92, caucasian: 0.05, eyes: 'darkbrown', hair: 'ponytail01',
    hairColor: '#17110e', eyebrows: 'eyebrow010', eyelashes: 'eyelashes02', earrings: 'pearl_drops',
    earringMetal: 'gold', expression: 'happy', outfit: 'none', top: 'long_tunic', bottom: 'wrapper_long',
    shoes: 'sandals', accessories: ['shoulder_drape', 'bead_necklace', 'amulets', 'bead_armbands'],
    garmentStyles: {
      long_tunic: { pattern: 'solid', color: '#8c1d32', color2: '#d9b46b' },
      wrapper_long: { pattern: 'solid', color: '#d7b35b', color2: '#8c1d32' },
      shoulder_drape: { pattern: 'solid', color: '#8c1d32', color2: '#d9b46b' },
      bead_necklace: { pattern: 'solid', color: '#d6ad54', color2: '#8c1d32' },
      amulets: { pattern: 'leather', color: '#b78b3e', color2: '#3d2414' },
    },
  },
  'TRIKAAL — भारतीय लहँगा प्रेरित': {
    gender: 0, age: 0.5, muscle: 0.4, weight: 0.46, height: 0.56, proportions: 0.9,
    african: 0.03, asian: 0.92, caucasian: 0.05, eyes: 'darkbrown', hair: 'ponytail01',
    hairColor: '#17110e', eyebrows: 'eyebrow010', eyelashes: 'eyelashes02', earrings: 'big_hoops',
    earringMetal: 'gold', expression: 'happy', outfit: 'none', top: 'tunic', bottom: 'wrapper_long',
    shoes: 'sandals', accessories: ['bead_necklace', 'amulets', 'bead_armbands'],
    garmentStyles: {
      tunic: { pattern: 'solid', color: '#b52b42', color2: '#e5c16e' },
      wrapper_long: { pattern: 'solid', color: '#e5c16e', color2: '#b52b42' },
      bead_necklace: { pattern: 'solid', color: '#d8ad4f' },
      amulets: { pattern: 'leather', color: '#b78b3e' },
    },
  },
  'TRIKAAL — भारतीय कुर्ता पायजामा': {
    gender: 1, age: 0.55, muscle: 0.58, weight: 0.52, height: 0.59, proportions: 0.78,
    african: 0.03, asian: 0.92, caucasian: 0.05, eyes: 'darkbrown', hair: 'short02',
    hairColor: '#17110e', facialHair: 'stubble', expression: 'neutral', outfit: 'none',
    top: 'long_tunic', bottom: 'trousers', shoes: 'sandals', accessories: ['waist_sash', 'bead_necklace'],
    garmentStyles: {
      long_tunic: { pattern: 'solid', color: '#f0e6d2', color2: '#b58a43' },
      trousers: { pattern: 'solid', color: '#e6dcc8', color2: '#b58a43' },
      waist_sash: { pattern: 'solid', color: '#8c1d32', color2: '#d9b46b' },
      bead_necklace: { pattern: 'solid', color: '#c89d43' },
    },
  },
  'TRIKAAL — भारतीय धोती अंगवस्त्रम': {
    gender: 1, age: 0.58, muscle: 0.62, weight: 0.52, height: 0.6, proportions: 0.75,
    african: 0.03, asian: 0.92, caucasian: 0.05, eyes: 'darkbrown', hair: 'short02',
    hairColor: '#17110e', facialHair: 'mustache', expression: 'neutral', outfit: 'none',
    top: 'tunic', bottom: 'wrapper_long', shoes: 'sandals', accessories: ['waist_sash', 'shoulder_drape', 'bead_necklace'],
    garmentStyles: {
      tunic: { pattern: 'solid', color: '#f1e8d5', color2: '#c79a43' },
      wrapper_long: { pattern: 'solid', color: '#f1e8d5', color2: '#c79a43' },
      waist_sash: { pattern: 'solid', color: '#b52b42', color2: '#d9b46b' },
      shoulder_drape: { pattern: 'solid', color: '#b52b42', color2: '#d9b46b' },
      bead_necklace: { pattern: 'solid', color: '#c89d43' },
    },
  },
`;
  params = params.replace(presetsAnchor, presetsAnchor + indianPresets);
}

const heritageOld = "{ id: 'asian', label: 'Asian', adj: 'Asian', mix: [0, 1, 0], eyes: 'darkbrown' },";
if (quick.includes(heritageOld)) quick = quick.replace(heritageOld, "{ id: 'asian', label: 'South Asian / Indian-inspired', adj: 'South Asian', mix: [0, 1, 0], eyes: 'darkbrown' },");
quick = quick.replace("['Everyday', 'Work & formal', 'Uniforms & action', 'Bridal & evening', 'Traditional', 'Warriors', 'Beach'] as const", "['Everyday', 'Work & formal', 'Uniforms & action', 'Bridal & evening', 'Indian traditional', 'Traditional', 'Warriors', 'Beach'] as const");

const styleAnchor = "  { id: 'buba', label: 'Buba & sokoto',";
if (!quick.includes(styleAnchor)) throw new Error('Traditional style insertion point not found');
if (!quick.includes("id: 'trikaal_kurta'")) {
  const indianStyles = `  { id: 'trikaal_kurta', label: 'Kurta-pyjama (Indian)', phrase: 'in an Indian kurta-pyjama', group: 'Indian traditional', man: full({ top: 'long_tunic', bottom: 'trousers', shoes: 'sandals', accessories: ['waist_sash', 'bead_necklace'], garmentStyles: { long_tunic: { pattern: 'solid', color: '#f0e6d2', color2: '#b58a43' }, trousers: { pattern: 'solid', color: '#e6dcc8' }, waist_sash: { pattern: 'solid', color: '#8c1d32', color2: '#d9b46b' }, bead_necklace: { pattern: 'solid', color: '#c89d43' } } }), alt: 'trikaal_dhoti' },
  { id: 'trikaal_dhoti', label: 'Dhoti & angavastram (Indian)', phrase: 'in a dhoti and angavastram-inspired outfit', group: 'Indian traditional', man: full({ top: 'tunic', bottom: 'wrapper_long', shoes: 'sandals', accessories: ['waist_sash', 'shoulder_drape', 'bead_necklace'], garmentStyles: { tunic: { pattern: 'solid', color: '#f1e8d5' }, wrapper_long: { pattern: 'solid', color: '#f1e8d5' }, waist_sash: { pattern: 'solid', color: '#b52b42', color2: '#d9b46b' }, shoulder_drape: { pattern: 'solid', color: '#b52b42', color2: '#d9b46b' }, bead_necklace: { pattern: 'solid', color: '#c89d43' } } }), alt: 'trikaal_kurta' },
  { id: 'trikaal_sari_proto', label: 'Sari drape prototype (Indian)', phrase: 'in a sari-inspired draped outfit prototype', group: 'Indian traditional', woman: full({ top: 'tunic', bottom: 'wrapper_long', shoes: 'sandals', accessories: ['shoulder_drape', 'bead_necklace', 'amulets', 'bead_armbands'], garmentStyles: { tunic: { pattern: 'solid', color: '#8c1d32', color2: '#d9b46b' }, wrapper_long: { pattern: 'solid', color: '#d7b35b', color2: '#8c1d32' }, shoulder_drape: { pattern: 'solid', color: '#8c1d32', color2: '#d9b46b' }, bead_necklace: { pattern: 'solid', color: '#d6ad54' }, amulets: { pattern: 'leather', color: '#b78b3e' } } }), alt: 'trikaal_lehenga' },
  { id: 'trikaal_lehenga', label: 'Lehenga-inspired (Indian)', phrase: 'in a lehenga-inspired outfit', group: 'Indian traditional', woman: full({ top: 'tunic', bottom: 'wrapper_long', shoes: 'sandals', accessories: ['bead_necklace', 'amulets', 'bead_armbands'], garmentStyles: { tunic: { pattern: 'solid', color: '#b52b42', color2: '#e5c16e' }, wrapper_long: { pattern: 'solid', color: '#e5c16e', color2: '#b52b42' }, bead_necklace: { pattern: 'solid', color: '#d8ad4f' }, amulets: { pattern: 'leather', color: '#b78b3e' } } }), alt: 'trikaal_sari_proto' },
`;
  quick = quick.replace(styleAnchor, indianStyles + styleAnchor);
}
fs.writeFileSync(paramsFile, params);

const jewelleryMarker = "export const JEWELLERY: Option[] = [";
const jewelleryLabels = `const trikaalJewelleryLabels: Record<string, string> = {
  gold_necklace: 'Traditional gold haar',
  gold_chains: 'Layered gold chains',
  pearl_necklace: 'Pearl haar',
  fine_pendant: 'Pendant / mangalsutra-style chain',
  bangles: 'Choodiyan / bangles',
  gold_ring: 'Gold ring',
  cuban_chain: 'Heavy gold chain',
};
`;
if (!quick.includes('trikaalJewelleryLabels')) {
  quick = quick.replace(jewelleryMarker, jewelleryLabels + jewelleryMarker);
  quick = quick.replace(
    "].map((id) => ({ id, label: garmentById.get(id)?.label.replace(/ \\(.*\\)$/, '') ?? id }));",
    "].map((id) => ({ id, label: trikaalJewelleryLabels[id] ?? garmentById.get(id)?.label.replace(/ \\(.*\\)$/, '') ?? id }));"
  );
}

fs.writeFileSync(quickFile, quick);
console.log('TRIKAAL Indian presets and Quick-build styles patched.');
