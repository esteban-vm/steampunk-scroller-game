import type { GameScene, GameSprite, Enemy } from '@/types'
import { Angler, Background, InputHandler, Player, UI } from '@/objects'

export default class Game implements GameScene {
  public width
  public height
  public background
  public player
  public ui
  public enemies: Enemy[]
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
    this.ui = new UI(this)
    this.enemies = []
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
    this.timeLimit = 5_000
    this.speed = 1
    this.gameOver = false
    this.debug = import.meta.env.DEV
  }

  public update(delta: number) {
    if (!this.gameOver) this.gameTime += delta
    if (this.gameTime > this.timeLimit) this.gameOver = true
    this.background.update()
    this.player.update()
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++
      this.ammoTimer = 0
    } else {
      this.ammoTimer += delta
    }
    this.enemies.forEach((enemy) => {
      enemy.update()
      if (this.checkCollision(this.player, enemy)) enemy.markedForDeletion = true
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--
          projectile.markedForDeletion = true
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true
            if (!this.gameOver) this.score += enemy.score
            if (this.score > this.winningScore) this.gameOver = true
          }
        }
      })
    })
    this.enemies = this.enemies.filter(({ markedForDeletion }) => !markedForDeletion)
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += delta
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    this.background.draw(context)
    this.player.draw(context)
    this.ui.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
  }

  private addEnemy() {
    this.enemies.push(new Angler(this))
  }

  private checkCollision(sprite1: GameSprite, sprite2: GameSprite) {
    return (
      sprite1.x < sprite2.x + sprite2.width &&
      sprite1.x + sprite1.width > sprite2.x &&
      sprite1.y < sprite2.y + sprite2.height &&
      sprite1.height + sprite1.y > sprite2.y
    )
  }
}
