import { equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'

import { EXAMPLES } from '../examples.const'
import {
  findElementCoordinates,
  generatePathsFromTree,
  getTreeNode,
} from '../maze.utils'

const FOUND_EXAMPLES = EXAMPLES.filter(
  (example) => example.type === 'hero-wins',
)

describe('paths', () => {
  it('calculates number of general paths in example mazes correctly', () => {
    for (const example of FOUND_EXAMPLES) {
      const elementCoordinates = findElementCoordinates(example.maze as any)
      const tree = getTreeNode({
        currentCoordinate: elementCoordinates.hero,
        lastCoordinates: [],
        goal: elementCoordinates.goal,
        maze: example.maze as any,
      })
      const paths = generatePathsFromTree({
        currentCoordinates: [],
        goal: elementCoordinates.goal,
        tree,
      })

      ok(paths)
      equal(paths.length, example.paths)
    }
  })
})
