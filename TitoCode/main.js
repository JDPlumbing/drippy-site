import toiletLogic from '../modules/MaterialSelector.js';

window.diagnose = () => {
  const issue = document.getElementById('symptom').value;
  const type = document.getElementById('toiletType').value;
  const parts = toiletLogic(type, issue);
  document.getElementById('results').innerText = `Try these: ${parts.join(', ')}`;
};
