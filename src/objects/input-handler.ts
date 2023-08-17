import type { Game, BasicGameObject } from '@/types'

export default class InputHandler implements BasicGameObject {
  public game

  constructor(game: Game) {
    this.game = game

    window.addEventListener('keydown', (event) => {
      const index = this.game.keys.indexOf(event.key)
      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && index === -1) {
        this.game.keys.push(event.key)
      } else if (event.key === ' ') {
        this.game.player.shootTop()
      } else if (event.key === 'd') {
        this.game.debug = !this.game.debug
      }
    })

    window.addEventListener('keyup', (event) => {
      const index = this.game.keys.indexOf(event.key)
      if (index > -1) this.game.keys.splice(index, 1)
    })
  }
}
