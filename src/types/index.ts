import type Game from '@/game'

export interface BasicObject {
  game: Game
}

export interface StaticObject extends BasicObject {
  draw(context: CanvasRenderingContext2D): void
}

export interface DynamicObject extends StaticObject {
  update(delta: number): void
}

export interface MainObject extends Omit<DynamicObject, 'game'> {
  width: number
  height: number
}

export interface Sprite extends BasicObject, MainObject {
  x: number
  y: number
  image: HTMLImageElement
}

export type * from '@/objects'
export type { default as Game } from '@/game'
export type Sound = 'powerUp' | 'powerDown' | 'explosion' | 'shot' | 'hit' | 'shield'
