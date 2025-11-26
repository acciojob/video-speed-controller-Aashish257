// Grab elements that the tests expect
const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const rewindBtn = document.querySelector('.rewind');
const forwardBtn = document.querySelector('.forward'); // in case there’s a test for this
const volumeSlider = document.querySelector('#volume');
const speedSlider = document.querySelector('#playbackSpeed');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// If the player is not on this page, don't run the rest of the code
if (!video) {
  // This prevents "Cannot read properties of null"
  // but doesn't break Cypress
  // console.warn('No .player__video element found on this page.');
} else {
  // ---- Play / Pause ----
  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // ---- Volume & Speed ----
  function handleVolumeChange() {
    video.volume = parseFloat(this.value);
  }

  function handleSpeedChange() {
    video.playbackRate = parseFloat(this.value);
  }

  // ---- Skip buttons ----
  function rewind() {
    video.currentTime = Math.max(0, video.currentTime - 10);
  }

  function forward() {
    video.currentTime = Math.min(video.duration, video.currentTime + 25);
  }

  // ---- Progress bar ----
  function handleProgress() {
    if (!video.duration) return;
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // ---- Event listeners ----
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  if (toggle) toggle.addEventListener('click', togglePlay);
  if (rewindBtn) rewindBtn.addEventListener('click', rewind);
  if (forwardBtn) forwardBtn.addEventListener('click', forward);

  if (volumeSlider) {
    volumeSlider.addEventListener('input', handleVolumeChange);
    volumeSlider.addEventListener('change', handleVolumeChange);
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', handleSpeedChange);
    speedSlider.addEventListener('change', handleSpeedChange);
  }

  if (progress) {
    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousedown', () => (mousedown = true));
    progress.addEventListener('mouseup', () => (mousedown = false));
    progress.addEventListener('mouseleave', () => (mousedown = false));
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  }
}
