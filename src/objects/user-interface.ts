import type { Game, StaticObject } from '@/types'

export default class UserInterface implements StaticObject {
  public game
  private fontSize
  private fontFamily
  private color

  constructor(game: Game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Bangers'
    this.color = 'white'
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Score: ${this.game.score}`, 20, 40)
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1)
    context.fillText(`Timer: ${formattedTime}`, 20, 100)
    if (this.game.gameOver) {
      context.textAlign = 'center'
      let message1: string
      let message2: string
      if (this.game.score > this.game.winningScore) {
        message1 = 'Most Wondrous!'
        message2 = 'Well done explorer!'
      } else {
        message1 = 'Blazes!'
        message2 = 'Get my repair kit and try again!'
      }
      context.font = `70px ${this.fontFamily}`
      const x = this.game.width / 2
      const y = this.game.height / 2
      context.fillText(message1, x, y - 20)
      context.font = `25px ${this.fontFamily}`
      context.fillText(message2, x, y + 20)
    }
    if (this.game.player.powerUp) context.fillStyle = '#ffffbd'
    for (let index = 0; index < this.game.ammo; index++) {
      context.fillRect(20 + 5 * index, 50, 3, 20)
    }
    context.restore()
  }
}
