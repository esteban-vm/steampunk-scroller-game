import type { Game, Sprite } from '@/types'

export default abstract class Explosion implements Sprite {
  public game
  public x: number
  public y: number
  public width: number
  public height: number
  public abstract image: HTMLImageElement
  public frameX
  public markedForDeletion
  protected spriteWidth: number
  protected spriteHeight
  protected fps
  protected timer
  protected interval
  protected maxFrame

  constructor(game: Game, x: number, y: number) {
    this.game = game
    const size = 200
    this.x = x - size * 0.5
    this.y = y - size * 0.5
    this.width = size
    this.height = size
    this.frameX = 0
    this.markedForDeletion = false
    this.spriteHeight = size
    this.spriteWidth = size
    this.fps = 30
    this.timer = 0
    this.interval = 1_000 / this.fps
    this.maxFrame = 8
  }

  public update(delta: number) {
    this.x -= this.game.speed
    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += delta
    }
    if (this.frameX > this.maxFrame) {
      this.markedForDeletion = true
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, width, height, image, frameX, spriteWidth, spriteHeight } = this
    context.drawImage(image, frameX * spriteWidth, 0, spriteWidth, spriteHeight, x, y, width, height)
  }
}

export class SmokeExplosion extends Explosion {
  public image

  constructor(...args: [game: Game, x: number, y: number]) {
    super(...args)
    this.image = document.getElementById('smokeExplosion') as HTMLImageElement
  }
}

export class FireExplosion extends Explosion {
  public image

  constructor(...args: [game: Game, x: number, y: number]) {
    super(...args)
    this.image = document.getElementById('fireExplosion') as HTMLImageElement
  }
}
