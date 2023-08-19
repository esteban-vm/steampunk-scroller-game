import type { MainObject, Sprite, Enemy, Explosion } from '@/types'
import { Background, Enemies, Explosions, InputHandler, Particle, Player, UserInterface } from '@/objects'

export default class Game implements MainObject {
  public width
  public height
  public background
  public player
  public ui
  public particles: Particle[]
  public enemies: Enemy[]
  public explosions: Explosion[]
  public input
  public ammo
  public maxAmmo
  public ammoTimer
  public ammoInterval
  public enemyTimer
  public enemyInterval
  public keys: string[]
  public score
  public winningScore
  public gameTime
  public timeLimit
  public speed
  public gameOver
  public debug

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.background = new Background(this)
    this.player = new Player(this)
    this.ui = new UserInterface(this)
    this.particles = []
    this.enemies = []
    this.explosions = []
    this.input = new InputHandler(this)
    this.ammo = 20
    this.maxAmmo = 50
    this.ammoTimer = 0
    this.ammoInterval = 500
    this.enemyTimer = 0
    this.enemyInterval = 1_000
    this.keys = []
    this.score = 0
    this.winningScore = 10
    this.gameTime = 0
    this.timeLimit = 15_000
    this.speed = 1
    this.gameOver = false
    this.debug = import.meta.env.DEV
  }

  public update(delta: number) {
    if (!this.gameOver) this.gameTime += delta
    if (this.gameTime > this.timeLimit) this.gameOver = true
    this.background.update()
    this.background.layer4.update()
    this.player.update(delta)
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++
      this.ammoTimer = 0
    } else {
      this.ammoTimer += delta
    }
    this.particles.forEach((particle) => particle.update())
    this.particles = this.particles.filter((particle) => !particle.markedForDeletion)
    this.explosions.forEach((explosion) => explosion.update(delta))
    this.explosions = this.explosions.filter((explosion) => !explosion.markedForDeletion)
    this.enemies.forEach((enemy) => {
      enemy.update()
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        this.addExplosion(enemy)
        for (let index = 1; index <= enemy.score; index++) this.addParticle(enemy)
        if (enemy.type === 'luckyFish') this.player.enterPowerUp()
        else this.score--
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--
          projectile.markedForDeletion = true
          this.addParticle(enemy)
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true
            this.addExplosion(enemy)
            for (let index = 1; index <= enemy.score; index++) this.addParticle(enemy)
            if (enemy.type === 'hiveWhale') {
              for (let index = 1; index <= 5; index++) {
                const x = enemy.x + Math.random() * enemy.width
                const y = enemy.y + Math.random() * enemy.height * 0.5
                this.enemies.push(new Enemies.Drone(this, x, y))
              }
            }
            if (!this.gameOver) this.score += enemy.score
            if (this.score > this.winningScore) this.gameOver = true
          }
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += delta
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    this.background.draw(context)
    this.ui.draw(context)
    this.player.draw(context)
    this.particles.forEach((particle) => particle.draw(context))
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.explosions.forEach((explosion) => explosion.draw(context))
    this.background.layer4.draw(context)
  }

  private addEnemy() {
    const randomize = Math.random()
    if (randomize < 0.3) this.enemies.push(new Enemies.Angler1(this))
    else if (randomize < 0.6) this.enemies.push(new Enemies.LuckyFish(this))
    else if (randomize < 0.8) this.enemies.push(new Enemies.HiveWhale(this))
    else this.enemies.push(new Enemies.Angler2(this))
  }

  private addExplosion(enemy: Enemy) {
    const randomize = Math.random()
    if (randomize < 1) {
      const x = enemy.x + enemy.width * 0.5
      const y = enemy.y + enemy.height * 0.5
      this.explosions.push(new Explosions.SmokeExplosion(this, x, y))
    }
  }

  private addParticle(enemy: Enemy) {
    const x = enemy.x + enemy.width * 0.5
    const y = enemy.y + enemy.height * 0.5
    this.particles.push(new Particle(this, x, y))
  }

  private checkCollision(sprite1: Sprite, sprite2: Sprite) {
    const { x: x1, y: y1, width: w1, height: h1 } = sprite1
    const { x: x2, y: y2, width: w2, height: h2 } = sprite2
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && h1 + y1 > y2
  }
}
