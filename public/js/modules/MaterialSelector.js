// ToiletLogic.js
// Maps toilet issues to parts and logic based on style (Gravity, ADA, Wall-Mount, Flushometer)

const toiletLogic = (toiletType, issue) => {
  const baseParts = {
    gravity: ["Flapper", "Flush Valve", "Fill Valve", "Tank Lever", "Wax Ring"],
    ADA: ["Raised Bowl", "Extended Handle", "Flapper", "Flush Valve"],
    wallMount: ["Carrier Bolts", "Seal Gasket", "Flushometer Valve"],
    flushometer: ["Flushometer Valve", "Vacuum Breaker", "Tailpiece", "Wall Bracket"]
  };

  const issueMap = {
    "running": ["Flapper", "Fill Valve", "Flush Valve"],
    "leaking at base": ["Wax Ring", "Closet Bolts"],
    "won't flush": ["Flush Lever", "Lift Chain", "Flapper"],
    "tank to bowl leak": ["Tank-to-Bowl Gasket", "Tank Bolts"],
    "weak flush": ["Clog", "Flush Valve", "Rim Jets"]
  };

  const availableParts = baseParts[toiletType] || [];
  const suggestedFix = issueMap[issue] || [];
  const intersected = suggestedFix.filter(p => availableParts.includes(p));

  return intersected.length ? intersected : suggestedFix;
};

export default toiletLogic;

// ShowerLogic.js
// Maps shower issues to replacement parts based on type (Single-Handle, Two-Handle, Valve-Only, Diverter)

export const showerLogic = (showerType, issue) => {
  const baseParts = {
    singleHandle: ["Cartridge", "Trim Kit", "O-Rings"],
    twoHandle: ["Hot Stem", "Cold Stem", "Handles", "Seats"],
    valveOnly: ["Pressure Balancing Cartridge", "Stops", "Escutcheon"],
    diverter: ["Diverter Valve", "Spout", "Tub/Shower Adapter"]
  };

  const issueMap = {
    "leaking handle": ["Cartridge", "Stem", "O-Rings"],
    "won't shut off": ["Cartridge", "Seats"],
    "low pressure": ["Shower Head", "Valve Cartridge", "Stops"],
    "diverter stuck": ["Diverter Valve", "Spout"],
    "temperature swings": ["Balancing Cartridge", "Stops"]
  };

  const availableParts = baseParts[showerType] || [];
  const suggestedFix = issueMap[issue] || [];
  const intersected = suggestedFix.filter(p => availableParts.includes(p));

  return intersected.length ? intersected : suggestedFix;
};
// WaterHeaterLogic.js
// Maps water heater issues to repair/replace recommendations based on type (Electric, Gas, Tankless)

export const heaterLogic = (heaterType, issue) => {
  const baseParts = {
    electric: ["Element", "Thermostat", "T&P Valve", "Anode Rod"],
    gas: ["Thermocouple", "Gas Valve", "T&P Valve", "Pilot Assembly"],
    tankless: ["Flow Sensor", "Control Board", "Heat Exchanger", "Descale Kit"]
  };

  const issueMap = {
    "no hot water": ["Element", "Thermostat", "Gas Valve", "Pilot Assembly"],
    "leaking tank": ["T&P Valve", "Tank Replacement"],
    "temperature swings": ["Thermostat", "Control Board", "Flow Sensor"],
    "low pressure": ["Sediment Buildup", "Flush Needed"],
    "strange noise": ["Sediment Buildup", "Anode Rod"]
  };

  const availableParts = baseParts[heaterType] || [];
  const suggestedFix = issueMap[issue] || [];
  const intersected = suggestedFix.filter(p => availableParts.includes(p));

  return intersected.length ? intersected : suggestedFix;
};
// FaucetLogic.js
// Maps faucet issues to likely repair parts based on type (Single-Handle, Two-Handle, Pull-Down, Wall-Mount)

export const faucetLogic = (faucetType, issue) => {
  const baseParts = {
    singleHandle: ["Cartridge", "O-Rings", "Handle Screw"],
    twoHandle: ["Hot Stem", "Cold Stem", "Seats", "Handles"],
    pullDown: ["Spray Head", "Hose", "Docking Magnet", "Cartridge"],
    wallMount: ["Valve Body", "Escutcheon", "Handle Kit"]
  };

  const issueMap = {
    "dripping": ["Cartridge", "Stem", "Seats"],
    "won't shut off": ["Cartridge", "Stem"],
    "leaks under sink": ["Supply Line", "Hose"],
    "sprayer stuck": ["Spray Head", "Docking Magnet"],
    "handle loose": ["Handle Screw", "Handle Kit"]
  };

  const availableParts = baseParts[faucetType] || [];
  const suggestedFix = issueMap[issue] || [];
  const intersected = suggestedFix.filter(p => availableParts.includes(p));

  return intersected.length ? intersected : suggestedFix;
};
// LeakLogic.js
export const leakLogic = (pipeType, location) => {
  const baseParts = {
    pex: ["Push-Fit Coupling", "Crimp Ring", "Sleeve Repair"],
    copper: ["SharkBite Coupling", "Sweat Coupling", "Repair Clamp"],
    cpvc: ["Coupling", "Primer & Cement", "Union"],
    galvanized: ["Compression Fitting", "Dielectric Union", "Fernco Sleeve"],
    castIron: ["No-Hub Coupling", "Shielded Coupling", "Repair Clamp"]
  };

  const locationMap = {
    "slab leak": ["Reroute Recommended", "Epoxy Liner", "Tunneling Access"],
    "in wall": ["Access Panel", "Coupling", "Drywall Patch"],
    "ceiling drip": ["Cutout & Repair", "Flexible Coupling"],
    "underground": ["HDPE Sleeve", "Compression Fitting", "Direct Bury Clamp"]
  };

  const materialFixes = baseParts[pipeType] || [];
  const situationalFixes = locationMap[location] || [];

  return [...new Set([...materialFixes, ...situationalFixes])];
};