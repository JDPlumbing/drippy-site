
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

export function hasCompletedValveTest() {
  return localStorage.getItem("valveTestConfirmed") === "true";
}

export function markValveTestCompleted() {
  localStorage.setItem("valveTestConfirmed", "true");
}

export function resetSession() {
  localStorage.removeItem("drippyUserID");
  localStorage.removeItem("valveTestConfirmed");
  localStorage.removeItem("propertyType");
  localStorage.removeItem("userRole");
}
