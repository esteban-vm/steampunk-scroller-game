import type { Game, DynamicObject } from '@/types'
import Layer from '@/layer'

export default class Background implements DynamicObject {
  public game
  private image1
  private image2
  private image3
  private image4
  public layer1
  public layer2
  public layer3
  public layer4
  private layers

  constructor(game: Game) {
    this.game = game
    this.image1 = document.getElementById('layer1') as HTMLImageElement
    this.image2 = document.getElementById('layer2') as HTMLImageElement
    this.image3 = document.getElementById('layer3') as HTMLImageElement
    this.image4 = document.getElementById('layer4') as HTMLImageElement
    this.layer1 = new Layer(this.game, this.image1, 0.2)
    this.layer2 = new Layer(this.game, this.image2, 0.4)
    this.layer3 = new Layer(this.game, this.image3, 1)
    this.layer4 = new Layer(this.game, this.image4, 1.5)
    this.layers = [this.layer1, this.layer2, this.layer3]
  }

  public update() {
    this.layers.forEach((layer) => layer.update())
  }

  public draw(context: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => layer.draw(context))
  }
}
