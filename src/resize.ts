export default (canvas: HTMLCanvasElement) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window
  const { width: canvasWidth, height: canvasHeight } = canvas
  const windowRatio = windowWidth / windowHeight
  const canvasRatio = canvasWidth / canvasHeight
  const isFullWidth = windowRatio < canvasRatio
  canvas.style.width = `${isFullWidth ? windowWidth : windowHeight * canvasRatio}px`
  canvas.style.height = `${isFullWidth ? windowWidth / canvasRatio : windowHeight}px`
}
