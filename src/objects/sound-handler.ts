import type { Game, BasicObject, Sound } from '@/types'

export default class SoundHandler implements BasicObject {
  public game
  private soundElements
  private availableSounds: Record<Sound, HTMLAudioElement>

  constructor(game: Game) {
    this.game = game
    this.soundElements = document.querySelectorAll('audio')
    const [powerUp, powerDown, explosion, shot, hit, shield] = this.soundElements
    this.availableSounds = { powerUp, powerDown, explosion, shot, hit, shield }
  }

  public playSound(sound: Sound) {
    const availableSound = this.availableSounds[sound]
    availableSound.currentTime = 0
    availableSound.volume = 0.3
    availableSound.play()
  }
}
