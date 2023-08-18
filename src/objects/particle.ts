import type { Game, Sprite } from '@/types'

export default class Particle implements Sprite {
  public game
  public x
  public y
  public width
  public height
  public image
  public frameX
  public frameY
  public markedForDeletion
  private spriteSize
  private sizeModifier
  private size
  private speedX
  private speedY
  private gravity
  private angle
  private va
  private bounced
  private bottomBounceBoundary

  constructor(game: Game, x: number, y: number) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 7
    this.height = 7
    this.image = document.getElementById('gears') as HTMLImageElement
    this.frameX = Math.floor(Math.random() * 3)
    this.frameY = Math.floor(Math.random() * 3)
    this.markedForDeletion = false
    this.spriteSize = this.width * this.height
    this.sizeModifier = +(Math.random() * 0.5 + 0.5).toFixed(1)
    this.size = this.spriteSize * this.sizeModifier
    this.speedX = Math.random() * 6 - 3
    this.speedY = Math.random() * -15
    this.gravity = 0.5
    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
    this.bounced = 0
    this.bottomBounceBoundary = Math.random() * 80 + 60
  }

  public update() {
    this.angle += this.va
    this.speedY += this.gravity
    this.x -= this.speedX + this.game.speed
    this.y += this.speedY
    if (this.y > this.game.height + this.size || this.x < -this.size) {
      this.markedForDeletion = true
    }
    if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
      this.bounced++
      this.speedY *= -0.9
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save()
    const { x, y, angle, size, spriteSize, image, frameX, frameY } = this
    context.translate(x, y)
    context.rotate(angle)
    context.drawImage(
      image,
      frameX * spriteSize,
      frameY * spriteSize,
      spriteSize,
      spriteSize,
      size * -0.5,
      size * -0.5,
      size,
      size
    )
    context.restore()
  }
}
