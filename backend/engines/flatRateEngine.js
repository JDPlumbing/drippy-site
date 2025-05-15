
import pricingConfig from '../../knowledge/pricingConfig.json';

export function getPriceRange(serviceId, modifier = 'standard') {
  const entry = pricingConfig.find(item => item.id === serviceId);
  if (!entry) return null;

  switch (modifier) {
    case 'low':
      return entry.low;
    case 'high':
      return entry.high;
    case 'standard':
    default:
      return entry.standard;
  }
}

export function getEstimateWithDetails(serviceId) {
  const entry = pricingConfig.find(item => item.id === serviceId);
  if (!entry) return null;

  return {
    label: entry.label,
    priceRange: {
      low: entry.low,
      standard: entry.standard,
      high: entry.high
    },
    timeEstimateHours: {
      min: entry.timeEstimateMin,
      max: entry.timeEstimateMax
    },
    category: entry.category,
    notes: entry.notes,
    unit: entry.unit
  };
}
