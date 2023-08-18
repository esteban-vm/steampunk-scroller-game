import type { Game, GameSprite } from '@/types'

export default abstract class Enemy implements GameSprite {
  public game
  public x
  public abstract y: number
  public abstract width: number
  public abstract height: number
  public abstract image: HTMLImageElement
  public frameX
  public frameY
  public maxFrame
  public speedX
  public markedForDeletion
  public abstract lives: number
  public abstract score: number

  constructor(game: Game) {
    this.game = game
    this.x = this.game.width
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 37
    this.speedX = Math.random() * -1.5 - 0.5
    this.markedForDeletion = false
  }

  public update() {
    this.x += this.speedX - this.game.speed
    if (this.x + this.width < 0) this.markedForDeletion = true
    if (this.frameX < this.maxFrame) this.frameX++
    else this.frameX = 0
  }

  public draw(context: CanvasRenderingContext2D) {
    const { x, y, width, height, image, frameX, frameY } = this
    if (this.game.debug) context.strokeRect(x, y, width, height)
    context.drawImage(image, frameX * width, frameY * height, width, height, x, y, width, height)
    context.font = '20px Helvetica'
    context.fillText(this.lives.toString(), x, y)
  }
}

export class Angler1 extends Enemy {
  public y
  public width
  public height
  public image
  public lives
  public score

  constructor(game: Game) {
    super(game)
    const height = 169
    this.y = Math.random() * (this.game.height * 0.9 - height)
    this.width = 228
    this.height = height
    this.image = document.getElementById('angler1') as HTMLImageElement
    this.frameY = Math.floor(Math.random() * 3)
    this.lives = 2
    this.score = this.lives
  }
}

export class Angler2 extends Enemy {
  public y
  public width
  public height
  public image
  public lives
  public score

  constructor(game: Game) {
    super(game)
    const height = 165
    this.y = Math.random() * (this.game.height * 0.9 - height)
    this.width = 213
    this.height = height
    this.image = document.getElementById('angler2') as HTMLImageElement
    this.frameY = Math.floor(Math.random() * 2)
    this.lives = 3
    this.score = this.lives
  }
}

export class LuckyFish extends Enemy {
  public y
  public width
  public height
  public image
  public lives
  public score
  public type

  constructor(game: Game) {
    super(game)
    const height = 95
    this.y = Math.random() * (this.game.height * 0.9 - height)
    this.width = 99
    this.height = height
    this.image = document.getElementById('lucky') as HTMLImageElement
    this.frameY = Math.floor(Math.random() * 2)
    this.lives = 3
    this.score = 15
    this.type = 'lucky'
  }
}
