import type { Game, GameSprite } from '@/types'

export default class Projectile implements GameSprite {
  public game
  public x
  public y
  public width
  public height
  public speed
  public markedForDeletion

  constructor(game: Game, x: number, y: number) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 10
    this.height = 3
    this.speed = 3
    this.markedForDeletion = false
  }

  public update() {
    this.x += this.speed
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'yellow'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}
