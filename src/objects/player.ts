import type { Game, Sprite } from '@/types'
import Projectile from '@/projectile'

export default class Player implements Sprite {
  public game
  public x
  public y
  public width
  public height
  public image
  public projectiles: Projectile[]
  public frameX
  public frameY
  public maxFrame
  private speedY
  private maxSpeed

  constructor(game: Game) {
    this.game = game
    this.x = 20
    this.y = 100
    this.width = 120
    this.height = 190
    this.image = document.getElementById('player') as HTMLImageElement
    this.projectiles = []
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 37
    this.speedY = 0
    this.maxSpeed = 3
  }

  public update() {
    if (this.game.keys.includes('ArrowUp')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }
    this.y += this.speedY
    this.projectiles.forEach((projectile) => projectile.update())
    this.projectiles = this.projectiles.filter(({ markedForDeletion }) => !markedForDeletion)
    if (this.frameX < this.maxFrame) this.frameX++
    else this.frameX = 0
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, width, height, image, frameX, frameY } = this
    if (this.game.debug) context.strokeRect(x, y, width, height)
    context.drawImage(image, frameX * width, frameY * height, width, height, x, y, width, height)
    this.projectiles.forEach((projectile) => projectile.draw(context))
  }

  public shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
      this.game.ammo--
    }
  }
}
