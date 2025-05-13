// drippy_builder.js

function updateAvatar() {
  const face = document.getElementById('faceSelect')?.value;
  const bg = document.getElementById('backgroundSelect')?.value;

  const faceLayer = document.getElementById('faceLayer');
  const bgLayer = document.getElementById('bgLayer');

  if (faceLayer) faceLayer.src = face !== 'none' ? `/drippy_assets/${face}` : '';
  if (bgLayer) bgLayer.src = bg !== 'none' ? `/drippy_assets/${bg}` : '';
}

function setupBuilder() {
  const faceSelect = document.getElementById('faceSelect');
  const bgSelect = document.getElementById('backgroundSelect');

  if (faceSelect) faceSelect.addEventListener('change', updateAvatar);
  if (bgSelect) bgSelect.addEventListener('change', updateAvatar);

  updateAvatar(); // Initial load
}

document.addEventListener('DOMContentLoaded', setupBuilder);
