export function updateTimer(secRemaining) {
  const sec = Math.max(0, Math.ceil(secRemaining));
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  // format into "mm:ss" padded with 0 if needed
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function updateBackground({ background, totalHeight, progress, settings }) {
  const currentHeight = Math.floor(totalHeight * progress);
  background.style.height = `${currentHeight}px`;
  background.classList.value = [getClassByProgress(progress, settings)];
}

function getClassByProgress(p, settings) {
  // p = percentage between 0 and 1
  if (p < settings.firstThreshold) return 'start';
  if (p < settings.secondThreshold) return 'critical';
  if (p < settings.thirdThreshold) return 'very-critical';
  return 'ending';
}
