import fs from 'fs'
import { Wundernut } from './wundernut'

function main() {
  const maze = process.argv[2]
  if (!maze) {
    throw new Error('No maze json provided')
  }
  try {
    const projectRoot = `${__dirname}/../../../mazes`
    const file = `${projectRoot}/${maze}`
    if (!fs.existsSync(file)) {
      throw new Error(`File ${file} does not exist in <mazes> folder.`)
    }
    const content = fs.readFileSync(`${projectRoot}/${maze}`, 'utf-8')
    const json = JSON.parse(content)
    const wundernut = new Wundernut({ maze: json })
    wundernut.log()
  } catch (error) {
    console.error('PANIQUE!! Error reading file', error)
  }
}

main()
