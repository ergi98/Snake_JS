const captureAudio = new Audio("./assets/capture.wav");
const failAudio = new Audio("./assets/loss.wav");
const winAudio = new Audio("./assets/loss.wav");
const collisionAudio = new Audio("./assets/collision.wav");
const themeMusic = new Audio("./assets/theme.mp3");

export function playCaptureMusic() {
  captureAudio.currentTime = 0;
  captureAudio.play();
}

export function playFailMusic() {
  failAudio.currentTime = 0;
  failAudio.play();
  collisionAudio.removeEventListener("ended", () => {
    playFailMusic();
  });
}

export function playWinMusic() {
  winAudio.currentTime = 0;
  winAudio.play();
}

export function playCollisionAudio() {
  collisionAudio.currentTime = 0;
  collisionAudio.play();
  collisionAudio.addEventListener(
    "ended",
    () => {
      playFailMusic();
    },
    false
  );
}

export function playThemeMusic() {
  themeMusic.currentTime = 0;
  themeMusic.play();
  themeMusic.addEventListener(
    "ended",
    () => {
      themeMusic.currentTime = 0;
      themeMusic.play();
    },
    false
  );
}

export function stopThemeMusic() {
  themeMusic.pause();
}
