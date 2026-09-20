document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = 'css/js/img/';
  const files = [
    'dolphin.jpg',
    'descarga (15).jpg',
    'descarga (14).jpg',
    'descarga (13).jpg',
    'descarga (12).jpg',
    'descarga (11).jpg',
    'contaminasion del agua.jpg',
    'descarga (10).jpg',
    'descarga (9).jpg',
    'descarga (8).jpg',
    'descarga (7).jpg',
    'descarga (6).jpg'
  ];

  const collage = document.getElementById('collage');
  const layout = [
    'hero-landscape',
    'hero-portrait',
    'medium-landscape',
    'medium-landscape',
    'medium-portrait',
    'square',
    'square',
    'small-landscape',
    'small-landscape',
    'small-portrait',
    'small-portrait',
    'square'
  ];

  files.forEach((fileName, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `collage-item ${layout[index] || 'square'}`;
    item.setAttribute('aria-label', 'Open collage image');

    const image = document.createElement('img');
    image.src = `${imageFolder}${fileName}`;
    image.alt = '';
    image.loading = index > 5 ? 'lazy' : 'eager';
    image.addEventListener('error', () => item.remove());
    item.appendChild(image);
    collage.appendChild(item);
  });

  const filmTrack = document.getElementById('filmTrack');
  const allFilmImages = [...files, ...files];
  allFilmImages.forEach((fileName) => {
    const frame = document.createElement('img');
    frame.src = `${imageFolder}${fileName}`;
    frame.alt = '';
    frame.loading = 'lazy';
    frame.addEventListener('error', () => frame.remove());
    filmTrack.appendChild(frame);
  });

  const bubbles = document.getElementById('bubbles');
  for (let index = 0; index < 30; index += 1) {
    const bubble = document.createElement('div');
    const size = Math.random() * 70 + 15;
    bubble.className = 'bubble';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 18 + 14}s`;
    bubble.style.animationDelay = `${Math.random() * 8}s`;
    bubbles.appendChild(bubble);
  }

  const musicButton = document.getElementById('musicBtn');
  const music = document.getElementById('bgMusic');
  const musicText = musicButton.querySelector('.music-text');

  function updateMusicControl(isPlaying) {
    musicButton.classList.toggle('playing', isPlaying);
    musicText.textContent = isPlaying ? 'Sound on' : 'Sound off';
    musicButton.setAttribute('aria-label', isPlaying ? 'Pause ambient music' : 'Play ambient music');
  }

  async function startMusic() {
    try {
      await music.play();
      updateMusicControl(true);
      return true;
    } catch (error) {
      return false;
    }
  }

  const playPromise = music.play();
  if (playPromise && typeof playPromise.then === 'function') {
    playPromise
      .then(() => updateMusicControl(true))
      .catch(() => {
        musicText.textContent = 'Tap for sound';
        document.addEventListener('pointerdown', () => {
          if (music.paused) {
            startMusic();
          }
        }, { once: true });
      });
  }

  musicButton.addEventListener('click', async () => {
    if (music.paused) {
      const started = await startMusic();
      if (!started) { musicText.textContent = 'Tap for sound'; }
    } else {
      music.pause();
      updateMusicControl(false);
    }
  });

  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    const rays = document.querySelector('.light-rays');
    const fondo = document.querySelector('.ocean-fondo');
    if (rays) rays.style.transform = `translateX(${x * 15}px) translateY(${y * 10}px)`;
    if (fondo) fondo.style.transform = `translate(${x * -10}px, ${y * -8}px) scale(1.08)`;
  });
});
