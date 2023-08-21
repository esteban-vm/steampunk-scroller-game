import type { Game, Sprite } from '@/types'

export default class Layer implements Sprite {
  public game
  public x
  public y
  public width
  public height
  public image
  private speedModifier

  constructor(game: Game, image: HTMLImageElement, speedModifier: number) {
    this.game = game
    this.x = 0
    this.y = 0
    this.width = 1768
    this.height = 500
    this.image = image
    this.speedModifier = speedModifier
  }

  public update() {
    if (this.x <= -this.width) this.x = 0
    this.x -= this.game.speed * this.speedModifier
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y)
    context.drawImage(this.image, this.x + this.width, this.y)
  }
}
