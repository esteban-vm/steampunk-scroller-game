import type { Game, Sprite } from '@/types'

export default abstract class Enemy implements Sprite {
  public game
  public x
  public abstract y: number
  public abstract width: number
  public abstract height: number
  public abstract image: HTMLImageElement
  public abstract type: string
  public abstract lives: number
  public abstract score: number
  public frameX
  public abstract frameY: number
  public markedForDeletion
  private maxFrame
  protected speedX

  constructor(game: Game) {
    this.game = game
    this.x = this.game.width
    this.frameX = 0
    this.markedForDeletion = false
    this.maxFrame = 37
    this.speedX = Math.random() * -1.5 - 0.5
  }

  public update() {
    this.x += this.speedX - this.game.speed
    if (this.x + this.width < 0) this.markedForDeletion = true
    if (this.frameX < this.maxFrame) this.frameX++
    else this.frameX = 0
  }

  public draw(context: CanvasRenderingContext2D) {
    const { game, lives, x, y, width, height, image, frameX, frameY } = this
    if (game.debug) {
      context.strokeRect(x, y, width, height)
      context.font = '20px Helvetica'
      context.fillText(lives.toString(), x, y)
    }
    context.drawImage(image, frameX * width, frameY * height, width, height, x, y, width, height)
  }
}

export class Angler1 extends Enemy {
  public y
  public width
  public height
  public image
  public type
  public lives
  public score
  public frameY

  constructor(game: Game) {
    super(game)
    const height = 169
    const id = 'angler1'
    this.y = Math.random() * (this.game.height * 0.95 - height)
    this.width = 228
    this.height = height
    this.image = document.getElementById(id) as HTMLImageElement
    this.type = id
    this.lives = 2
    this.score = this.lives
    this.frameY = Math.floor(Math.random() * 3)
  }
}

export class Angler2 extends Enemy {
  public y
  public width
  public height
  public image
  public type
  public lives
  public score
  public frameY

  constructor(game: Game) {
    super(game)
    const height = 165
    const id = 'angler2'
    this.y = Math.random() * (this.game.height * 0.95 - height)
    this.width = 213
    this.height = height
    this.image = document.getElementById(id) as HTMLImageElement
    this.type = id
    this.lives = 3
    this.score = this.lives
    this.frameY = Math.floor(Math.random() * 2)
  }
}

export class LuckyFish extends Enemy {
  public y
  public width
  public height
  public image
  public type
  public lives
  public score
  public frameY

  constructor(game: Game) {
    super(game)
    const height = 95
    const id = 'luckyFish'
    this.y = Math.random() * (this.game.height * 0.95 - height)
    this.width = 99
    this.height = height
    this.image = document.getElementById(id) as HTMLImageElement
    this.type = id
    this.lives = 3
    this.score = 15
    this.frameY = Math.floor(Math.random() * 2)
  }
}

export class HiveWhale extends Enemy {
  public y
  public width
  public height
  public image
  public type
  public lives
  public score
  public frameY

  constructor(game: Game) {
    super(game)
    const height = 227
    const id = 'hiveWhale'
    this.y = Math.random() * (this.game.height * 0.95 - height)
    this.width = 400
    this.height = height
    this.image = document.getElementById(id) as HTMLImageElement
    this.type = id
    this.lives = 15
    this.score = this.lives
    this.frameY = 0
    this.speedX = Math.random() * -1.2 - 0.2
  }
}

export class Drone extends Enemy {
  public y
  public width
  public height
  public image
  public type
  public lives
  public score
  public frameY

  constructor(game: Game, x: number, y: number) {
    super(game)
    const id = 'drone'
    this.x = x
    this.y = y
    this.width = 115
    this.height = 95
    this.image = document.getElementById(id) as HTMLImageElement
    this.type = id
    this.lives = 3
    this.score = this.lives
    this.frameY = Math.floor(Math.random() * 2)
    this.speedX = Math.random() * -4.2 - 0.5
  }
}
