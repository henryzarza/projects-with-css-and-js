const audio = document.querySelector('audio');
const elTitle = document.getElementById('title');
const elArtist = document.getElementById('artist');
const elAlbum = document.getElementById('album');
const elCover = document.getElementById('cover');

const PLAYLIST = [
  {
    title: 'Applause',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/39/Artpop_cover.png',
    src: 'https://res.cloudinary.com/henryzarza/video/upload/v1600820782/General%20assets/Applause_k6d6ch.mp3',
    artist: 'Lady Gaga',
    album: 'ARTPOP'
  },
  {
    title: 'Levitating',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png/220px-Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png',
    src: 'https://res.cloudinary.com/henryzarza/video/upload/v1600820785/General%20assets/Levitating_ltrtpk.mp3',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia'
  },
  {
    title: 'Gimme More',
    cover: 'https://upload.wikimedia.org/wikipedia/en/7/76/Britney_Spears_-_Blackout.png',
    src: 'https://res.cloudinary.com/henryzarza/video/upload/v1600820787/General%20assets/GimmeMore_sd5tar.mp3',
    artist: 'Britney Spears',
    album: 'Blackout'
  }
];

function getArtwork(src) {
  return [
    { src, sizes: '96x96', type: 'image/png' },
    { src, sizes: '128x128', type: 'image/png' },
    { src, sizes: '192x192', type: 'image/png' },
    { src, sizes: '256x256', type: 'image/png' },
    { src, sizes: '384x384', type: 'image/png' },
    { src, sizes: '512x512', type: 'image/png' }
  ];
}

function updateScreen(index) {
  const { title, artist, album, cover, src } = PLAYLIST[index];
  audio.src = src;
  navigator.mediaSession.metadata.title = title;
  navigator.mediaSession.metadata.artist = artist;
  navigator.mediaSession.metadata.album = album;
  navigator.mediaSession.metadata.artwork = getArtwork(cover);
  audio.play();
  elTitle.textContent = title;
  elArtist.textContent = artist;
  elAlbum.textContent = album;
  elCover.src = cover;
}

if ('mediaSession' in navigator) {
  const { title, artist, album, cover } = PLAYLIST[0];
  navigator.mediaSession.metadata = new MediaMetadata({
    title,
		artist,
		album,
		artwork: getArtwork(cover)
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    audio.pause();
  });

  navigator.mediaSession.setActionHandler('play', () => {
    audio.play();
  });

  navigator.mediaSession.setActionHandler('seekbackward', (details) => {
    audio.currentTime = audio.currentTime - (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler('seekforward', (details) => {
    audio.currentTime = audio.currentTime + (details.seekOffset || 10);
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    const index = PLAYLIST.findIndex(el => el.src === audio.src);
    updateScreen(index !== 0 ? index - 1 : PLAYLIST.length - 1);
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    const index = PLAYLIST.findIndex(el => el.src === audio.src);
    updateScreen(index !== 2 ? index + 1 : 0);
  });
}
