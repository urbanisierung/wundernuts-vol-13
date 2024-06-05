import {
  Coordinate,
  ELEMENT,
  ElementCoordinates,
  Input,
  ShortestPath,
  Tree,
} from './maze.type'
import {
  allMazesToString,
  findElementCoordinates,
  generateAllMazeSteps,
  generatePathsFromTree,
  getTreeNode,
  initElementCoordinates,
  log,
  printAllMazeSteps,
  runAllPathsAndReturnShortestPath,
} from './maze.utils'

export class Wundernut {
  private positions: ElementCoordinates = initElementCoordinates()
  private heroPathTree: Tree
  private paths: Coordinate[][] = []
  private shortestPath: ShortestPath | undefined

  constructor(private input: Input) {
    this.positions = findElementCoordinates(this.input.maze)
    this.heroPathTree = getTreeNode({
      currentCoordinate: this.positions.hero,
      lastCoordinates: [this.positions.hero],
      goal: this.positions.goal,
      maze: this.input.maze,
    })
    this.paths = generatePathsFromTree({
      tree: this.heroPathTree,
      currentCoordinates: [],
      goal: this.positions.goal,
    })
    this.shortestPath = runAllPathsAndReturnShortestPath({
      maze: this.input.maze,
      paths: this.paths,
      hero: this.positions.hero,
      dragon: this.positions.dragon,
    })
  }

  public getShortestPath() {
    return this.shortestPath
  }

  public getMaze() {
    return this.input.maze
  }

  public static getMazeAsString(maze: ELEMENT[][]): string {
    return allMazesToString([maze])[0]
  }

  public getAllMazeStepsAsString(): string[] {
    if (this.shortestPath) {
      return allMazesToString(
        generateAllMazeSteps({
          maze: this.input.maze,
          hero: this.shortestPath.hero,
          dragon: this.shortestPath.dragon,
        }),
      )
    } else {
      return []
    }
  }

  public log() {
    log(`number of possible paths: ${this.paths.length}`)
    if (this.shortestPath) {
      log('Shortest path:')
      printAllMazeSteps({
        maze: this.input.maze,
        hero: this.shortestPath.hero,
        dragon: this.shortestPath.dragon,
      })
      log(this.shortestPath.directions.toString())
    } else {
      log('No path found. Dragon wins.')
    }
  }
}
