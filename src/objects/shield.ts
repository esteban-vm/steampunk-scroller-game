import type { Game, Sprite } from '@/types'

export default class Shield implements Sprite {
  public game
  public x
  public y
  public width
  public height
  public image
  public frameX
  public maxFrame
  public fps
  public timer
  public interval

  constructor(game: Game) {
    this.game = game
    this.x = 0
    this.y = 0
    this.width = this.game.player.width
    this.height = this.game.player.height
    this.image = document.getElementById('shield') as HTMLImageElement
    this.frameX = 0
    this.maxFrame = 24
    this.fps = 30
    this.timer = 0
    this.interval = 1_000 / this.fps
  }

  public update(delta: number) {
    if (this.frameX <= this.maxFrame) {
      if (this.timer > this.interval) {
        this.frameX++
        this.timer = 0
      } else {
        this.timer += delta
      }
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { game, width, height, image, frameX } = this
    this.x = game.player.x
    this.y = game.player.y
    context.drawImage(image, frameX * width, 0, width, height, this.x, this.y, width, height)
  }

  public reset() {
    this.frameX = 0
    this.game.sound.playSound('shield')
  }
}
