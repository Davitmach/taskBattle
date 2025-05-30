type SoundKey = 'info' | 'success' | 'error';

const soundMap: Record<SoundKey, string> = {
  info:'/Инфо.mp3',
  success: 'Успех.mp3',
  error: '/Ошибка.mp3',
 
};

class SoundService {
  private static instance: SoundService;
  private sounds: Map<SoundKey, HTMLAudioElement> = new Map();

  private constructor() {
    this.loadSounds();
  }

  public static getInstance(): SoundService {
    if (!SoundService.instance) {
      SoundService.instance = new SoundService();
    }
    return SoundService.instance;
  }

  private loadSounds() {
    for (const key in soundMap) {
      const soundKey = key as SoundKey;
      const audio = new Audio(soundMap[soundKey]);
      audio.load();
      this.sounds.set(soundKey, audio);
    }
  }

  public playSound(key: SoundKey) {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((err) => {
        console.error(`Failed to play sound "${key}":`, err);
      });
    } else {
      console.warn(`Sound "${key}" not found.`);
    }
  }
}

export const soundService = SoundService.getInstance();
