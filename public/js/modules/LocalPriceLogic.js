// LocalPriceLogic.js
// Estimates Broward County cost ranges based on service and complexity

export const localPriceLogic = (service, complexity = "standard") => {
  const prices = {
    "Drain Cleaning": {
      low: 90,
      standard: 150,
      high: 400
    },
    "Toilet Repair": {
      low: 85,
      standard: 225,
      high: 700
    },
    "Water Heater Replacement": {
      low: 1500,
      standard: 2000,
      high: 2500
    }
  };

  return prices[service]?.[complexity] || null;
};