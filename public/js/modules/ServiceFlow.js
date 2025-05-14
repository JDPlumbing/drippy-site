// ServiceFlow.json logic scaffold
export const serviceFlow = {
  "Drain Cleaning": {
    path: ["symptom", "diagnostic", "access", "method", "estimate"],
    triggers: ["slow drain", "gurgling", "backed up"],
    methods: ["snake", "hydrojet", "camera inspection"],
    permitsRequired: false,
    urgency: "medium to high"
  },
  "Toilet Repair": {
    path: ["symptom", "toilet type", "part match", "quote"],
    triggers: ["running", "won't flush", "leak at base"],
    estimateTime: "30min - 1.5hr",
    urgency: "medium"
  },
  "Water Heater Replacement": {
    path: ["age check", "leak check", "code compliance", "unit match", "quote"],
    triggers: ["no hot water", "leaking tank"],
    permitsRequired: true,
    urgency: "high"
  }
};

