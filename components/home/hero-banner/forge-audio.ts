import gsap from "gsap";

const STRIKE_SOUND_SRC = "/sounds/hammer-on-anvil.mp3";
const STRIKE_CUE_SECONDS = 1.72;
const FIRE_SOUND_SRC = "/sounds/fire-crackling.mp3";
const FIRE_VOLUME = 0.4;
const FIRE_FADE_SECONDS = 0.8;
const MUTED_STORAGE_KEY = "forge-hero-muted";

let strikeAudio: HTMLAudioElement | null = null;
let fireAudio: HTMLAudioElement | null = null;
let fireWanted = false;
let fireOn = false;
let muted: boolean | null = null;
const listeners = new Set<() => void>();

const readStoredMuted = () => {
  try {
    return window.localStorage.getItem(MUTED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeStoredMuted = (value: boolean) => {
  try {
    window.localStorage.setItem(MUTED_STORAGE_KEY, value ? "1" : "0");
  } catch {
    return;
  }
};

export const subscribeForgeMuted = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getForgeMuted = () => {
  if (muted === null) muted = readStoredMuted();
  return muted;
};

export const getForgeMutedOnServer = () => false;

const GESTURE_EVENTS = ["pointerdown", "keydown"] as const;

const retryFireOnGesture = () => {
  const retry = () => {
    GESTURE_EVENTS.forEach((event) => window.removeEventListener(event, retry));
    applyFire();
  };
  GESTURE_EVENTS.forEach((event) => window.addEventListener(event, retry, { once: true }));
};

const applyFire = () => {
  const shouldPlay = fireWanted && !getForgeMuted();
  if (shouldPlay === fireOn) return;
  fireOn = shouldPlay;
  if (shouldPlay) {
    if (!fireAudio) {
      fireAudio = new Audio(FIRE_SOUND_SRC);
      fireAudio.loop = true;
      fireAudio.preload = "auto";
      fireAudio.volume = 0;
    }
    gsap.killTweensOf(fireAudio);
    void fireAudio.play().catch(() => {
      fireOn = false;
      retryFireOnGesture();
    });
    gsap.to(fireAudio, { volume: FIRE_VOLUME, duration: FIRE_FADE_SECONDS, ease: "none" });
    return;
  }
  if (!fireAudio) return;
  gsap.killTweensOf(fireAudio);
  gsap.to(fireAudio, { volume: 0, duration: FIRE_FADE_SECONDS, ease: "none", onComplete: () => fireAudio?.pause() });
};

export const setForgeFire = (wanted: boolean) => {
  fireWanted = wanted;
  applyFire();
};

export const setForgeMuted = (value: boolean) => {
  muted = value;
  if (value) {
    if (strikeAudio) {
      strikeAudio.pause();
      strikeAudio.currentTime = STRIKE_CUE_SECONDS;
    }
    if (fireAudio) {
      gsap.killTweensOf(fireAudio);
      fireAudio.pause();
      fireAudio.volume = 0;
      fireOn = false;
    }
  }
  writeStoredMuted(value);
  applyFire();
  listeners.forEach((listener) => listener());
};

export const playForgeStrike = () => {
  if (getForgeMuted()) return;
  if (!strikeAudio) {
    strikeAudio = new Audio(STRIKE_SOUND_SRC);
    strikeAudio.preload = "auto";
  }
  strikeAudio.currentTime = STRIKE_CUE_SECONDS;
  void strikeAudio.play().catch(() => undefined);
};
