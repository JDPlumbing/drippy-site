function generateDripCode() {
  const date = new Date().toISOString().slice(0, 10);
  const seed = "drippy-" + date;
  const dailyCode = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100000;
  return `Drip-${dailyCode}`;
}
export function updateDrippyBackground(context) {
  const bgMap = {
    kitchen: "/drippy_assets/backgrounds/bg_kitchen.png",
    bathroom: "/drippy_assets/backgrounds/bg_bathroom.png",
    laundry: "/drippy_assets/backgrounds/bg_laundry.png",
    garage: "/drippy_assets/backgrounds/bg_garage.png",
    default: "/drippy_assets/backgrounds/bg_garage.png"
  };
  document.body.style.backgroundImage = `url('${bgMap[context] || bgMap.default}')`;
}
