import { Wundernut } from '.'
import { EXAMPLES } from './examples.const'

function main() {
  const maze: any = EXAMPLES[1].maze
  const wundernut = new Wundernut({
    maze,
  })
  wundernut.log()
}

main()
