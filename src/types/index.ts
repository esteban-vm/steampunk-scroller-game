import type Game from '@/game'

export interface BasicGameObject {
  game: Game
}

export interface StaticGameObject extends BasicGameObject {
  draw(context: CanvasRenderingContext2D): void
}

export interface DynamicGameObject extends StaticGameObject {
  update(delta: number): void
}

export interface GameScene extends Omit<DynamicGameObject, 'game'> {
  width: number
  height: number
}

export interface GameSprite extends GameScene {
  x: number
  y: number
}

export type * from '@/objects'
export type { default as Game } from '@/game'
