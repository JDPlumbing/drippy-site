// CodeChecker.js
// Flags potential Florida Plumbing Code violations for common job types

export const codeChecker = (jobType, inputs) => {
  const violations = [];

  if (jobType === "Drain Cleaning") {
    if (inputs.method === "chemical") {
      violations.push("Use of chemical drain cleaners discouraged—prefer mechanical methods.");
    }
  }

  if (jobType === "Toilet Repair") {
    if (inputs.part === "old ballcock fill valve") {
      violations.push("Replace outdated ballcock valve with modern anti-siphon fill valve.");
    }
    if (!inputs.flangeSecure) {
      violations.push("Loose or damaged flange must be corrected to meet mounting code.");
    }
  }

  if (jobType === "Water Heater Replacement") {
    if (!inputs.expansionTankPresent && inputs.city === "Hollywood") {
      violations.push("Expansion tank required by local code in Hollywood for closed systems.");
    }
    if (inputs.type === "gas" && !inputs.ventVerified) {
      violations.push("Gas heater venting must be verified for clearance and backdraft.");
    }
  }

  return violations;
};
