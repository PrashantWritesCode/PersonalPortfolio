# Audio Files Placeholder

This directory contains audio assets for the Guided Tour and Adaptive Ambience System.

## Required Audio Files:

### Ambient Tracks (Background Music)
- **distantSpace.mp3** - Default ethereal ambient track (far from Sun)
  - Low volume (0.2 gain)
  - Looping
  - Suggested: Deep space ambience with subtle synth pads
  
- **nearSun.mp3** - Warm ambient track (close to Sun)
  - Low volume (0.2 gain)
  - Looping
  - Suggested: Warmer tones, solar flares, gentle energy

- **deepSpace.mp3** - Ethereal ambient for outer planets
  - Low volume (0.2 gain)
  - Looping
  - Suggested: Cold, distant, mysterious atmosphere

### Sound Effects
- **hover.mp3** - Soft chime played on planet hover
  - Volume: 0.15 gain
  - Duration: ~0.5-1 second
  - Suggested: Gentle metallic chime or glass tone

- **click.mp3** - Subtle whoosh on planet selection
  - Volume: 0.2 gain
  - Duration: ~0.3-0.8 second
  - Suggested: Smooth swoosh or transition sound

## Implementation Notes:

All audio files use Howler.js for:
- Seamless looping
- Cross-fade transitions (1.5s duration)
- Distance-based ambience switching
- Low-latency sound effects

## Placeholder Notice:

⚠️ **These files are currently placeholders.**  
Replace with actual audio assets before production deployment.

You can generate royalty-free audio from:
- [freesound.org](https://freesound.org)
- [incompetech.com](https://incompetech.com)
- AI music generators (Suno, Udio, etc.)
