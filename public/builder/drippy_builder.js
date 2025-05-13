// drippy_builder.js

function updateAvatar() {
  const face = document.getElementById('faceSelect').value;
  const outfit = document.getElementById('outfitSelect').value;
  const bg = document.getElementById('backgroundSelect').value;

  const faceLayer = document.getElementById('faceLayer');
  const outfitLayer = document.getElementById('outfitLayer');
  const bgLayer = document.getElementById('bgLayer');

  faceLayer.src = face !== 'none' ? `/drippy_assets/${face}` : '';
  outfitLayer.src = outfit !== 'none' ? `/drippy_assets/${outfit}` : '';
  bgLayer.src = bg !== 'none' ? `/drippy_assets/${bg}` : '';
}

function setupBuilder() {
  document.getElementById('faceSelect').addEventListener('change', updateAvatar);
  document.getElementById('outfitSelect').addEventListener('change', updateAvatar);
  document.getElementById('backgroundSelect').addEventListener('change', updateAvatar);

  updateAvatar(); // Initial load
}

document.addEventListener('DOMContentLoaded', setupBuilder);
