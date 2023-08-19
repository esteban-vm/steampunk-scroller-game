import type { Game, Sprite } from '@/types'

export default abstract class Explosion implements Sprite {
  public game
  public abstract x: number
  public abstract y: number
  public abstract width: number
  public abstract height: number
  public abstract image: HTMLImageElement
  public frameX
  public markedForDeletion
  public abstract spriteWidth: number
  protected spriteHeight
  protected fps
  protected timer
  protected interval
  protected maxFrame

  constructor(game: Game) {
    this.game = game
    this.frameX = 0
    this.markedForDeletion = false
    this.spriteHeight = 200
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
  public x
  public y
  public width
  public height
  public image
  public spriteWidth

  constructor(game: Game, x: number, y: number) {
    super(game)
    const width = 200
    const height = this.spriteHeight
    this.x = x - width * 0.5
    this.y = y - height * 0.5
    this.width = width
    this.height = height
    this.image = document.getElementById('smokeExplosion') as HTMLImageElement
    this.spriteWidth = 200
  }
}

export class FireExplosion {}
