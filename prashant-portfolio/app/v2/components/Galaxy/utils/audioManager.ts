import { Howl } from "howler";

/**
 * 🎶 Adaptive Ambience Audio Manager
 * 
 * Manages background music cross-fading based on camera position
 * and plays UI sound effects (hover, click).
 * 
 * Tracks:
 * - distantSpace.mp3: Default ambient track (far from Sun)
 * - nearSun.mp3: Warm ambient when close to Sun
 * - deepSpace.mp3: Ethereal ambient for outer planets
 * 
 * SFX:
 * - hover.mp3: Soft chime on planet hover
 * - click.mp3: Subtle whoosh on planet selection
 */

type AmbienceTrack = "distant" | "nearSun" | "deep";

class AudioManager {
  private tracks: Record<AmbienceTrack, Howl | null> = {
    distant: null,
    nearSun: null,
    deep: null,
  };

  private sfx: Record<string, Howl> = {};
  private currentTrack: AmbienceTrack = "distant";
  private isInitialized = false;
  private isMuted = false;

  /**
   * Initialize all audio tracks
   * Called once when Galaxy component mounts
   */
  initialize() {
    if (this.isInitialized) return;

    // Ambient tracks with loop and low volume
    this.tracks.distant = new Howl({
      src: ["/audio/distantSpace.mp3"],
      loop: true,
      volume: 0.2,
      preload: true,
    });

    this.tracks.nearSun = new Howl({
      src: ["/audio/nearSun.mp3"],
      loop: true,
      volume: 0,
      preload: true,
    });

    this.tracks.deep = new Howl({
      src: ["/audio/deepSpace.mp3"],
      loop: true,
      volume: 0,
      preload: true,
    });

    // Sound effects
    this.sfx.hover = new Howl({
      src: ["/audio/hover.mp3"],
      volume: 0.15,
      preload: true,
    });

    this.sfx.click = new Howl({
      src: ["/audio/click.mp3"],
      volume: 0.2,
      preload: true,
    });

    this.isInitialized = true;
  }

  /**
   * Start playing ambience (called after user interaction)
   */
  start() {
    if (!this.isInitialized) this.initialize();
    if (this.isMuted) return;

    // Start with distant space track
    this.tracks.distant?.play();
  }

  /**
   * Cross-fade between ambient tracks based on distance to Sun
   * @param distanceToSun - Camera distance from origin (Sun position)
   */
  updateAmbience(distanceToSun: number) {
    if (!this.isInitialized || this.isMuted) return;

    let targetTrack: AmbienceTrack;

    // Define zones based on distance
    if (distanceToSun < 15) {
      targetTrack = "nearSun";
    } else if (distanceToSun > 40) {
      targetTrack = "deep";
    } else {
      targetTrack = "distant";
    }

    // Cross-fade if track changed
    if (targetTrack !== this.currentTrack) {
      this.crossFade(this.currentTrack, targetTrack);
      this.currentTrack = targetTrack;
    }
  }

  /**
   * Smooth cross-fade between two tracks
   * @param from - Current playing track
   * @param to - Target track
   */
  private crossFade(from: AmbienceTrack, to: AmbienceTrack) {
    const fromTrack = this.tracks[from];
    const toTrack = this.tracks[to];
    const duration = 1500; // 1.5 seconds

    if (!fromTrack || !toTrack) return;

    // Start target track if not playing
    if (!toTrack.playing()) {
      toTrack.play();
    }

    // Fade out current track
    fromTrack.fade(fromTrack.volume(), 0, duration);

    // Fade in target track
    toTrack.fade(toTrack.volume(), 0.2, duration);
  }

  /**
   * Play hover sound effect
   */
  playHover() {
    if (!this.isInitialized || this.isMuted) return;
    this.sfx.hover?.play();
  }

  /**
   * Play click sound effect
   */
  playClick() {
    if (!this.isInitialized || this.isMuted) return;
    this.sfx.click?.play();
  }

  /**
   * Toggle mute state
   */
  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      // Mute all tracks
      Object.values(this.tracks).forEach((track) => track?.mute(true));
      Object.values(this.sfx).forEach((sound) => sound?.mute(true));
    } else {
      // Unmute all
      Object.values(this.tracks).forEach((track) => track?.mute(false));
      Object.values(this.sfx).forEach((sound) => sound?.mute(false));
    }

    return this.isMuted;
  }

  /**
   * Stop all audio and cleanup
   */
  cleanup() {
    Object.values(this.tracks).forEach((track) => track?.stop());
    this.isInitialized = false;
  }
}

// Singleton instance
export const audioManager = new AudioManager();
