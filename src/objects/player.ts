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
  private maxFrame
  private speedY
  private maxSpeed
  public powerUp
  private powerUpTimer
  private powerUpLimit

  constructor(game: Game) {
    this.game = game
    this.x = 20
    this.y = 100
    this.width = 120
    this.height = 190
    this.image = document.getElementById('seaHorse') as HTMLImageElement
    this.projectiles = []
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 37
    this.speedY = 0
    this.maxSpeed = 3
    this.powerUp = false
    this.powerUpTimer = 0
    this.powerUpLimit = 10_000
  }

  public update(delta: number) {
    if (this.game.keys.includes('ArrowUp')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }
    this.y += this.speedY
    if (this.y > this.game.height - this.height * 0.5) {
      this.y = this.game.height - this.height * 0.5
    } else if (this.y < -this.height * 0.5) {
      this.y = -this.height * 0.5
    }
    this.projectiles.forEach((projectile) => projectile.update(delta))
    this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion)
    if (this.frameX < this.maxFrame) this.frameX++
    else this.frameX = 0
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0
        this.powerUp = false
        this.frameY = 0
        this.game.sound.playSound('powerDown')
      } else {
        this.powerUpTimer += delta
        this.frameY = 1
        this.game.ammo += 0.1
      }
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    const { game, x, y, width, height, image, frameX, frameY } = this
    if (game.debug) context.strokeRect(x, y, width, height)
    this.projectiles.forEach((projectile) => projectile.draw(context))
    context.drawImage(image, frameX * width, frameY * height, width, height, x, y, width, height)
  }

  public shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
      this.game.ammo--
    }
    this.game.sound.playSound('shot')
    if (this.powerUp) this.shootBottom()
  }

  private shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175))
    }
  }

  public enterPowerUp() {
    this.powerUpTimer = 0
    this.powerUp = true
    const { ammo, maxAmmo } = this.game
    if (ammo < maxAmmo) this.game.ammo = maxAmmo
    this.game.sound.playSound('powerUp')
  }
}
