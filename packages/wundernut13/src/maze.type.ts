export enum ELEMENT {
  HERO = '🏃',
  GOAL = '❎',
  WAY = '🟩',
  WALL = '🟫',
  DRAGON = '🐉',
}

export interface Input {
  maze: ELEMENT[][]
}

export interface Coordinate {
  x: number
  y: number
}

export interface ElementCoordinates {
  hero: Coordinate
  dragon: Coordinate
  goal: Coordinate
}

export interface Tree {
  root: Coordinate
  children: Tree[]
}

export interface RunResult {
  result: 'win' | 'lose'
  paths: { hero: Coordinate[]; dragon: Coordinate[] }
}

export interface ShortestPath {
  hero: Coordinate[]
  dragon: Coordinate[]
  directions: Direction[]
}

export type Direction = 'right' | 'down' | 'left' | 'up'
export const ALL_DIRECTIONS: Direction[] = ['right', 'down', 'left', 'up']
