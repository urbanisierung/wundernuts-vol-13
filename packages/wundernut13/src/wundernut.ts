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
  generateMazeWithCoordinates,
  generatePathsFromTree,
  getTreeNode,
  initElementCoordinates,
  log,
  mazeToString,
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

  public getResult() {
    const data = {
      result: this.shortestPath ? 'win' : 'lose',
      originalMaze: Wundernut.getMazeAsString(this.input.maze),
      allMazeStepsOfShortestPath: this.getAllMazeStepsAsString(),
      directions: this.shortestPath ? this.shortestPath.directions : [],
      allPossiblePathsToWin: this.shortestPath
        ? this.shortestPath.allPaths
        : [],
      allPossiblePathsToWinAsMazeString: this.shortestPath
        ? this.shortestPath.allPaths.map((path) =>
            mazeToString(
              generateMazeWithCoordinates({
                maze: this.input.maze,
                hero: this.positions.hero,
                dragon: this.positions.dragon,
                path: path.hero,
              }),
            ),
          )
        : [],
      allPossiblePathsToReachGoalAsMazeString: this.paths.map((path) =>
        mazeToString(
          generateMazeWithCoordinates({
            maze: this.input.maze,
            hero: this.positions.hero,
            dragon: this.positions.dragon,
            path,
          }),
        ),
      ),
    }
    return data
  }

  public log() {
    const data = this.getResult()

    log(`\nPossible paths to reach the goal:`)
    log(data.allPossiblePathsToReachGoalAsMazeString.join('\n\n'))

    if (data.result === 'win') {
      log(`\nPossible paths to win:`)
      log(data.allPossiblePathsToWinAsMazeString.join('\n\n'))

      log(`\nShortest path:`)
      log(data.allMazeStepsOfShortestPath.join('\n\n'))

      log(`\n${data.directions.length} steps to win:`)
      log(data.directions.join(' '))
    } else {
      log('Dragon wins :(((')
    }

    log(
      `\nNavigate to https://wundernut13.urbanisierung.dev to play with a 🥳 UI for this submission!`,
    )
  }
}
