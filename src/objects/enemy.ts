import type { Game, GameSprite } from '@/types'

export default abstract class Enemy implements GameSprite {
  public game
  public x
  public y
  public width
  public height
  public speedX
  public markedForDeletion
  public lives
  public score

  constructor(game: Game) {
    this.game = game
    this.x = this.game.width
    this.y = 0
    this.width = 0
    this.height = 0
    this.speedX = Math.random() * -1.5 - 0.5
    this.markedForDeletion = false
    this.lives = 5
    this.score = this.lives
  }

  public update() {
    this.x += this.speedX
    if (this.x < 0) this.markedForDeletion = true
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red'
    context.fillRect(this.x, this.y, this.width, this.height)
    context.fillStyle = 'black'
    context.font = '20px Helvetica'
    context.fillText(this.lives.toString(), this.x, this.y)
  }
}

export class Angler extends Enemy {
  constructor(game: Game) {
    super(game)
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
    this.width = 228 * 0.2
    this.height = 169 * 0.2
  }
}
