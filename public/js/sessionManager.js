// sessionManager.js
// Manages anonymous session continuity using localStorage

export function getAnonymousUserID() {
  let id = localStorage.getItem("drippyUserID");
  if (!id) {
    id = generateAnonymousID();
    localStorage.setItem("drippyUserID", id);
  }
  return id;
}

function generateAnonymousID() {
  return 'xxxxxxxxyxxxxyxxxyxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// -----------------------------
// Valve Test Status
// -----------------------------
export function hasCompletedValveTest() {
  return localStorage.getItem("valveTestConfirmed") === "true";
}

export function markValveTestCompleted() {
  localStorage.setItem("valveTestConfirmed", "true");
}

// -----------------------------
// Step History (array of test keys)
// -----------------------------
export function getStepHistory() {
  const raw = localStorage.getItem("stepHistory");
  return raw ? JSON.parse(raw) : [];
}

export function addStepToHistory(stepKey) {
  const history = getStepHistory();
  if (!history.includes(stepKey)) {
    history.push(stepKey);
    localStorage.setItem("stepHistory", JSON.stringify(history));
  }
}

// -----------------------------
// DIY Unlocks
// -----------------------------
export function getUnlockedDIY() {
  const raw = localStorage.getItem("unlockedDIY");
  return raw ? JSON.parse(raw) : [];
}

export function unlockDIYFor(system) {
  const unlocked = getUnlockedDIY();
  if (!unlocked.includes(system)) {
    unlocked.push(system);
    localStorage.setItem("unlockedDIY", JSON.stringify(unlocked));
  }
}

export function hasUnlockedDIY(system) {
  return getUnlockedDIY().includes(system);
}

// -----------------------------
// Reset All
// -----------------------------
export function resetSession() {
  localStorage.removeItem("drippyUserID");
  localStorage.removeItem("valveTestConfirmed");
  localStorage.removeItem("propertyType");
  localStorage.removeItem("userRole");
  localStorage.removeItem("stepHistory");
  localStorage.removeItem("unlockedDIY");
}
