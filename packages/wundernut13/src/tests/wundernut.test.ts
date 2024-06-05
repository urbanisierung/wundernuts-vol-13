import { equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'

import { EXAMPLES } from '../examples.const'
import { Wundernut } from '../wundernut'

const FOUND_EXAMPLES = EXAMPLES.filter(
  (example) => example.type === 'hero-wins',
)

describe('shortest path', () => {
  it('checks that at least two examples are available', () => {
    ok(FOUND_EXAMPLES)
    equal(FOUND_EXAMPLES.length > 1, true)
  })

  it('solves the example mazes correctly', () => {
    for (const example of FOUND_EXAMPLES) {
      const wundernut = new Wundernut({ maze: example.maze as any })
      const shortestPath = wundernut.getShortestPath()
      ok(shortestPath)
      equal(shortestPath.directions.length, example.steps)
    }
  })
})
