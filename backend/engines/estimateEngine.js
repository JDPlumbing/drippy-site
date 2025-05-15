
import { getEstimateWithDetails } from './flatRateEngine.js';

/**
 * Example usage in the UI
 * getJobEstimate('toiletRepair', { modifier: 'standard' });
 */
export function getJobEstimate(serviceId, options = {}) {
  const data = getEstimateWithDetails(serviceId);
  if (!data) return { error: 'Service not found' };

  const modifier = options.modifier || 'standard';
  const price = data.priceRange[modifier] || data.priceRange.standard;

  return {
    ...data,
    selectedPrice: price,
    modifier
  };
}
