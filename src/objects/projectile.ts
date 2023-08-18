import type { Game, Sprite } from '@/types'

export default class Projectile implements Sprite {
  public game
  public x
  public y
  public width
  public height
  public image
  public markedForDeletion
  private speed

  constructor(game: Game, x: number, y: number) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 10
    this.height = 3
    this.image = document.getElementById('projectile') as HTMLImageElement
    this.markedForDeletion = false
    this.speed = 3
  }

  public update() {
    this.x += this.speed
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y)
  }
}
