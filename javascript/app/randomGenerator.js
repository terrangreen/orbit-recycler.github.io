// randomGenerator.js
// Math to determine item probabilities

export function getRandomSpacejunkItemType() {
    const types = [
      'Communication Satellite',
      'Defunct Satellite',
      'GPS Satellite',
      'Weather Satellite',
      'Research Satellite'
    ];
    return types[Math.floor(Math.random() * types.length)];
  }
  
  export function getRandomSpacejunkItemOwner() {
    const owners = [
      'Company XYZ',
      'Government ABC',
      'Agency DEF', 
      'Private Enterprise GHI'
    ];
    return owners[Math.floor(Math.random() * owners.length)];
  }
  
  export function getRandomSpacejunkItemValue() {
    const gsoFee = 168000;
    const ngsoFee = 35600;
    const { gsoProbability } = calculateSatelliteProbabilities();
    const isGso = Math.random() < gsoProbability;
    return isGso ? gsoFee * 5 : ngsoFee * 5;
  }
  
  export function getRandomSalvageParts() {
    const possibleSalvage = [
      { type: 'Kevlar Fiber', material: 'Kevlar', id: 1, iconType: 'layers-3', color: 'white' },
      { type: 'Aluminum Parts', material: 'Aluminum', id: 2, iconType: 'atom', color: 'silver' },
      { type: 'Silicon Processor', material: 'Silicon', id: 3, iconType: 'circuit-board', color: 'white' },
      { type: 'Steel Parts', material: 'Steel', id: 4, iconType: 'atom', color: 'gray' },
      { type: 'Copper Parts', material: 'Copper', id: 5, iconType: 'atom', color: 'copper' },
      { type: 'Solar panels', id: 6, iconType: 'sun', color: 'white'}
    ];
  
    return possibleSalvage.filter(() => Math.random() < 0.5).map(part => ({
      ...part,
      quantity: Math.floor(Math.random() * 5) + 1
    }));
  }
  
  function calculateSatelliteProbabilities() {
    const numGsoSatellites = 550;
    const numNgsoSatellites = 5500;
    const totalSatellites = numGsoSatellites + numNgsoSatellites;
    return { gsoProbability: numGsoSatellites / totalSatellites };
  }  