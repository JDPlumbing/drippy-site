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

