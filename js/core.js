function generateDripCode() {
  const date = new Date().toISOString().slice(0, 10);
  const seed = "drippy-" + date;
  const dailyCode = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100000;
  return `Drip-${dailyCode}`;
}
