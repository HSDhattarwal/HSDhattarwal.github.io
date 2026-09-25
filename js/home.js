// Fig. 1: play the simulation quietly, with a pause control. Without JS the native controls remain.
(() => {
  const video = document.getElementById('fig-1');
  const toggle = document.querySelector('.plate-toggle');
  if (!video || !toggle) return;

  const label = toggle.querySelector('span');
  const iconPause = toggle.querySelector('.icon-pause');
  const iconPlay = toggle.querySelector('.icon-play');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  let userPaused = reduceMotion || saveData;

  const render = () => {
    const paused = video.paused;
    label.textContent = paused ? 'Play simulation' : 'Pause';
    iconPause.hidden = paused;
    iconPlay.hidden = !paused;
  };
  const play = () => video.play().catch(() => render());

  video.removeAttribute('controls');
  toggle.hidden = false;
  video.addEventListener('play', render);
  video.addEventListener('pause', render);
  toggle.addEventListener('click', () => {
    userPaused = !video.paused;
    if (userPaused) video.pause(); else play();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused) play();
      else if (!entry.isIntersecting && !video.paused) video.pause();
    }, { threshold: 0.25 }).observe(video);
  } else if (!userPaused) {
    play();
  }
  render();
})();

// Red pencil ring: drawn once, the first time the award is actually seen.
(() => {
  const award = document.querySelector('.credential');
  if (!award || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-ring');
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    award.classList.add('is-drawn');
    io.disconnect();
  }, { threshold: 0.6 });
  io.observe(award);
})();
