import type { Game, GameSprite } from '@/types'
import Projectile from '@/projectile'

export default class Player implements GameSprite {
  public game
  public x
  public y
  public width
  public height
  public projectiles: Projectile[]
  private frameX
  private frameY
  private maxFrame
  private image
  private speedY
  private maxSpeed

  constructor(game: Game) {
    this.game = game
    this.x = 20
    this.y = 100
    this.width = 120
    this.height = 190
    this.projectiles = []
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 37
    this.image = document.getElementById('player') as HTMLImageElement
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
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.projectiles.forEach((projectile) => projectile.draw(context))
  }

  public shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
      this.game.ammo--
    }
  }
}
