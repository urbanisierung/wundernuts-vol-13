import {
  ALL_DIRECTIONS,
  Coordinate,
  Direction,
  ELEMENT,
  ElementCoordinates,
  RunResult,
  ShortestPath,
  Tree,
} from './maze.type'

// ////////////////////////////////////////////////////////////
// PATH TREE

/**
 * Creates a tree of possible paths from the current coordinate to the goal.
 * @param options Object including the current coordinate, the last coordinates, the goal and the maze.
 * @returns Tree of possible paths.
 */
export function getTreeNode(options: {
  currentCoordinate: Coordinate
  lastCoordinates: Coordinate[]
  goal: Coordinate
  maze: ELEMENT[][]
}): Tree {
  const currentTree: Tree = { root: options.currentCoordinate, children: [] }
  if (!coordinatesEqual(options.goal, options.currentCoordinate)) {
    for (const direction of ALL_DIRECTIONS) {
      const nextStep = nextStepByDirection(options.currentCoordinate, direction)
      if (
        isCoordinatePossible(options.maze, nextStep) &&
        !options.lastCoordinates.some((lastCoordinate) =>
          coordinatesEqual(lastCoordinate, nextStep),
        )
      ) {
        currentTree.children.push(
          getTreeNode({
            ...options,
            currentCoordinate: nextStep,
            lastCoordinates: [...options.lastCoordinates, nextStep],
          }),
        )
      }
    }
  }
  return currentTree
}

/**
 * Generates all possible paths from the tree. Convinience function to get all paths.
 * @param options Object including the tree, the current coordinates, and the goal.
 * @returns All possible paths. Each path is an array of coordinates.
 */
export function generatePathsFromTree(options: {
  tree: Tree
  currentCoordinates: Coordinate[]
  goal: Coordinate
}): Coordinate[][] {
  const allCoordinates: Coordinate[][] = []
  if (options.tree.children.length === 0) {
    if (coordinatesEqual(options.tree.root, options.goal)) {
      return [options.currentCoordinates]
    } else {
      return []
    }
  }
  for (const child of options.tree.children) {
    allCoordinates.push(
      ...generatePathsFromTree({
        tree: child,
        currentCoordinates: [...options.currentCoordinates, child.root],
        goal: options.goal,
      }),
    )
  }
  return allCoordinates
}

// ////////////////////////////////////////////////////////////
// PATH RUN

/**
 * Calculates the next possible dragon step as coordinate. Creates a tree of possible paths from the current dragon coordinate to the hero.
 * Uses the shortest path to the hero.
 * @param options Object including the current dragon coordinate, the current hero coordinate and the maze.
 * @returns Next dragon coordinate.
 */
export function nextDragonCoordinate(options: {
  currentDragonCoordinate: Coordinate
  currentHeroCoordinate: Coordinate
  maze: ELEMENT[][]
}): Coordinate {
  const pathTree = getTreeNode({
    currentCoordinate: options.currentDragonCoordinate,
    lastCoordinates: [options.currentDragonCoordinate],
    goal: options.currentHeroCoordinate,
    maze: options.maze,
  })
  const paths = generatePathsFromTree({
    tree: pathTree,
    currentCoordinates: [],
    goal: options.currentHeroCoordinate,
  })
  let shortestPath: Coordinate[] | undefined = undefined
  for (const path of paths) {
    if (!shortestPath || path.length < shortestPath.length) {
      shortestPath = path
    }
  }
  if (shortestPath) {
    return shortestPath[0]
  }
  return options.currentDragonCoordinate
}

/**
 * Runs one path with the hero and the dragon. Checks if hero wins or loses.
 * @param options Object including the hero, the dragon, the path and the maze.
 * @returns Run result including the result and the paths of the hero and the dragon.
 */
export function runPath(options: {
  hero: Coordinate
  dragon: Coordinate
  path: Coordinate[]
  maze: ELEMENT[][]
}): RunResult {
  const paths: { hero: Coordinate[]; dragon: Coordinate[] } = {
    hero: [options.hero],
    dragon: [options.dragon],
  }
  let currentHeroCoordinate = options.hero
  let currentDragonCoordinate = options.dragon
  let index = 0
  for (const coordinate of options.path) {
    currentHeroCoordinate = coordinate
    paths.hero.push(currentHeroCoordinate)
    if (coordinatesEqual(currentHeroCoordinate, currentDragonCoordinate)) {
      return { result: 'lose', paths }
    }
    index++
    currentDragonCoordinate = nextDragonCoordinate({
      currentDragonCoordinate: currentDragonCoordinate,
      currentHeroCoordinate: currentHeroCoordinate,
      maze: options.maze,
    })
    paths.dragon.push(currentDragonCoordinate)
    index++
    if (coordinatesEqual(currentHeroCoordinate, currentDragonCoordinate)) {
      return { result: 'lose', paths }
    }
  }
  return { result: 'win', paths }
}

/**
 * Runs all paths and returns the shortest path if hero wins.
 * @param options Object including the maze, the paths, the hero and the dragon.
 * @returns Shortest path including the directions, the hero and the dragon.
 */
export function runAllPathsAndReturnShortestPath(options: {
  maze: ELEMENT[][]
  paths: Coordinate[][]
  hero: Coordinate
  dragon: Coordinate
}): ShortestPath | undefined {
  let shortestPath: ShortestPath | undefined = undefined

  for (const path of options.paths) {
    const result = runPath({
      hero: options.hero,
      dragon: options.dragon,
      path,
      maze: options.maze,
    })
    switch (result.result) {
      case 'win':
        const directionsForPath = pathToDirections({
          start: options.hero,
          path,
        })
        if (
          !shortestPath ||
          shortestPath.directions.length > directionsForPath.length
        ) {
          shortestPath = {
            directions: directionsForPath,
            hero: result.paths.hero,
            dragon: result.paths.dragon,
          }
        }
        break
      case 'lose':
        break
    }
  }

  return shortestPath
}

// ////////////////////////////////////////////////////////////
// COORDINATE UTILS
// Convinience functions to work with coordinates.

export function coordinatesEqual(a: Coordinate, b: Coordinate): boolean {
  return a.x === b.x && a.y === b.y
}

export function isCoordinatePossible(
  maze: ELEMENT[][],
  coordinate: Coordinate,
): boolean {
  if (
    coordinate.x < 0 ||
    coordinate.y < 0 ||
    coordinate.x >= maze.length ||
    coordinate.y >= maze[coordinate.x].length
  ) {
    return false
  }
  const coordinateInMaze = maze[coordinate.x][coordinate.y]
  switch (coordinateInMaze) {
    case ELEMENT.WAY:
    case ELEMENT.DRAGON:
    case ELEMENT.HERO:
    case ELEMENT.GOAL:
      return true
  }
  return false
}

export function nextStepByDirection(
  coordinate: Coordinate,
  direction: Direction,
): Coordinate {
  switch (direction) {
    case 'right':
      return {
        x: coordinate.x + 1,
        y: coordinate.y,
      }
    case 'left':
      return {
        x: coordinate.x - 1,
        y: coordinate.y,
      }
    case 'down':
      return {
        x: coordinate.x,
        y: coordinate.y + 1,
      }
    case 'up':
      return {
        x: coordinate.x,
        y: coordinate.y - 1,
      }
  }
}

export function initElementCoordinates(): ElementCoordinates {
  return {
    hero: {
      x: -1,
      y: -1,
    },
    dragon: {
      x: -1,
      y: -1,
    },
    goal: {
      x: -1,
      y: -1,
    },
  }
}

export function generateElementsToCoordinatesMap(
  maze: ELEMENT[][],
): Map<ELEMENT, Coordinate[]> {
  const elementsToCoordinates: Map<ELEMENT, Coordinate[]> = new Map()
  for (let x = 0; x < maze.length; x++) {
    const row = maze[x]
    for (let y = 0; y < row.length; y++) {
      const element = row[y]
      let elementCoordinates = elementsToCoordinates.get(element)
      if (!elementCoordinates) {
        elementCoordinates = []
      }
      elementCoordinates.push({ x, y })
      elementsToCoordinates.set(element, elementCoordinates)
    }
  }
  return elementsToCoordinates
}

export function findElementCoordinates(maze: ELEMENT[][]): ElementCoordinates {
  const elementsToCoordinates = generateElementsToCoordinatesMap(maze)

  const allElementCoordinates = initElementCoordinates()

  for (const element of [ELEMENT.DRAGON, ELEMENT.HERO, ELEMENT.GOAL]) {
    const elementCoordinates = elementsToCoordinates.get(element)
    if (!elementCoordinates || elementCoordinates.length === 0) {
      throw new Error(`Element ${element} not found in maze`)
    }
    if (elementCoordinates.length > 1) {
      throw new Error(`Element ${element} found multiple times in maze`)
    }

    switch (element) {
      case ELEMENT.HERO:
        allElementCoordinates.hero = elementCoordinates[0]
        break
      case ELEMENT.DRAGON:
        allElementCoordinates.dragon = elementCoordinates[0]
        break
      case ELEMENT.GOAL:
        allElementCoordinates.goal = elementCoordinates[0]
        break
    }
  }

  return allElementCoordinates
}

export function allElementsFound(
  elementCoordinates: ElementCoordinates,
): boolean {
  for (const key of Object.keys(elementCoordinates)) {
    if (elementCoordinates[key].x < 0 && elementCoordinates[key].y < 0) {
      return false
    }
  }
  return true
}

export function pathToDirections(options: {
  start: Coordinate
  path: Coordinate[]
}): Direction[] {
  const pathFromStart = coordinatesEqual(options.path[0], options.start)
    ? [...options.path]
    : [options.start, ...options.path]
  const directions: Direction[] = []
  for (let i = 0; i < pathFromStart.length - 1; i++) {
    const currentCoordinate = pathFromStart[i]
    const nextCoordinate = pathFromStart[i + 1]
    if (currentCoordinate.x < nextCoordinate.x) {
      directions.push('down')
    } else if (currentCoordinate.x > nextCoordinate.x) {
      directions.push('up')
    } else if (currentCoordinate.y < nextCoordinate.y) {
      directions.push('right')
    } else if (currentCoordinate.y > nextCoordinate.y) {
      directions.push('left')
    }
  }
  return directions
}

// ////////////////////////////////////////////////////////////
// MAZE UTILS

export function printMaze(maze: ELEMENT[][]) {
  for (const row of maze) {
    log(row.join(''))
  }
}

export function printAllMazeSteps(options: {
  maze: ELEMENT[][]
  hero: Coordinate[]
  dragon: Coordinate[]
}) {
  const allMazeSteps = generateAllMazeSteps(options)
  for (let step = 0; step < allMazeSteps.length; step++) {
    const maze = allMazeSteps[step]
    log(`\nStep ${step}`)
    printMaze(maze)
  }
}

export function allMazesToString(allMazeSteps: ELEMENT[][][]): string[] {
  return allMazeSteps.map((maze) => mazeToString(maze))
}

export function mazeToString(maze: ELEMENT[][]): string {
  return maze.map((row) => row.join('')).join('\n')
}

export function generateAllMazeSteps(options: {
  maze: ELEMENT[][]
  hero: Coordinate[]
  dragon: Coordinate[]
}): ELEMENT[][][] {
  const allMazeSteps: ELEMENT[][][] = []
  for (let step = 0; step < options.hero.length; step++) {
    const maze = generateMazeWithCoordinates({
      maze: options.maze,
      hero: options.hero[step],
      dragon: options.dragon[step],
    })
    allMazeSteps.push(maze)
  }
  return allMazeSteps
}

export function generateMazeWithCoordinates(options: {
  maze: ELEMENT[][]
  hero: Coordinate
  dragon: Coordinate
}): ELEMENT[][] {
  const maze: ELEMENT[][] = options.maze.map((row) => {
    return row.map((element) => {
      switch (element) {
        case ELEMENT.HERO:
        case ELEMENT.DRAGON:
          return ELEMENT.WAY
        default:
          return element
      }
    })
  })
  maze[options.hero.x][options.hero.y] = ELEMENT.HERO
  maze[options.dragon.x][options.dragon.y] = ELEMENT.DRAGON
  return maze
}

// ////////////////////////////////////////////////////////////
// GENERAL UTILS

export function log(message: string) {
  console.log(message)
}
