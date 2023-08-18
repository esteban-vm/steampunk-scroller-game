import Game from '@/game'
import resize from '@/resize'

window.addEventListener('load', function () {
  const canvas = this.document.querySelector('canvas')!
  canvas.width = 700
  canvas.height = 500

  const game = new Game(canvas.width, canvas.height)
  const context = canvas.getContext('2d')!
  let lastTime = 0

  const animate: FrameRequestCallback = (time) => {
    const delta = time - lastTime
    lastTime = time
    context.clearRect(0, 0, canvas.width, canvas.height)
    game.update(delta)
    game.draw(context)
    this.requestAnimationFrame(animate)
  }

  animate(0)
  resize(canvas)
  this.focus()
  this.addEventListener('resize', () => resize(canvas))
})
