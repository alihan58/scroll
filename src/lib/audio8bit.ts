// Web Audio API 8-Bit Chiptune Engine — Pure Retro Synth BGM (Robust Web Audio)

class ChiptuneAudioEngine {
  private ctx: AudioContext | null = null
  private isPlaying: boolean = false
  private masterGain: GainNode | null = null
  private intervalId: any = null
  private step: number = 0

  // Classic 8-Bit Retro Chiptune Melody
  private melody = [
    261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
    293.66, 349.23, 440.00, 587.33, 440.00, 349.23,
    329.63, 392.00, 493.88, 659.25, 493.88, 392.00,
    349.23, 440.00, 523.25, 698.46, 523.25, 440.00,
  ]

  // 8-Bit Triangle Bassline
  private bass = [
    130.81, 0, 130.81, 0, 146.83, 0, 146.83, 0,
    164.81, 0, 164.81, 0, 174.61, 0, 174.61, 0,
  ]

  private async initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      this.ctx = new AudioCtx()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 0.25 // Clear audible volume
      this.masterGain.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      await this.start()
      return true
    }
  }

  public async start() {
    await this.initCtx()
    if (this.isPlaying) return
    this.isPlaying = true
    this.step = 0

    this.intervalId = setInterval(() => this.playNextNote(), 130)
  }

  public stop() {
    this.isPlaying = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying
  }

  private playNextNote() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return

    const now = this.ctx.currentTime

    // 1. Lead 8-Bit Square Wave
    const melodyFreq = this.melody[this.step % this.melody.length]
    if (melodyFreq > 0) {
      const osc = this.ctx.createOscillator()
      const noteGain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(melodyFreq, now)

      noteGain.gain.setValueAtTime(0.12, now)
      noteGain.gain.linearRampToValueAtTime(0.001, now + 0.11)

      osc.connect(noteGain)
      noteGain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 0.12)
    }

    // 2. 8-Bit Triangle Bass
    const bassFreq = this.bass[this.step % this.bass.length]
    if (bassFreq > 0) {
      const bassOsc = this.ctx.createOscillator()
      const bassGain = this.ctx.createGain()

      bassOsc.type = 'triangle'
      bassOsc.frequency.setValueAtTime(bassFreq, now)

      bassGain.gain.setValueAtTime(0.18, now)
      bassGain.gain.linearRampToValueAtTime(0.01, now + 0.16)

      bassOsc.connect(bassGain)
      bassGain.connect(this.masterGain)

      bassOsc.start(now)
      bassOsc.stop(now + 0.18)
    }

    this.step++
  }
}

export const chiptuneEngine = new ChiptuneAudioEngine()
