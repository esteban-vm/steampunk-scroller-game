import type { Game, Sprite } from '@/types'

export default class Projectile implements Sprite {
  public game
  public x
  public y
  public width
  public height
  public image
  public markedForDeletion
  public frameX
  public maxFrame
  public fps
  public timer
  public interval
  private speed

  constructor(game: Game, x: number, y: number) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 36.25
    this.height = 20
    this.image = document.getElementById('fireBall') as HTMLImageElement
    this.markedForDeletion = false
    this.frameX = 0
    this.maxFrame = 3
    this.fps = 20
    this.timer = 0
    this.interval = 1_000 / this.fps
    this.speed = Math.random() * 0.2 + 2.8
  }

  public update(delta: number) {
    this.x += this.speed
    if (this.timer > this.interval) {
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
      this.timer = 0
    } else {
      this.timer += delta
    }
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, width, height, image, frameX } = this
    context.drawImage(image, frameX * width, 0, width, height, x, y, width, height)
  }
}
