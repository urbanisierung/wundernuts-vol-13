import fs from 'fs'
import { Wundernut } from './wundernut'

async function animateStrings(texts: string[], delay: number) {
  for (const text of texts) {
    console.clear()
    console.log(text)
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
}

async function main() {
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
    const result = wundernut.getResult()
    await animateStrings(result.allMazeStepsOfShortestPath, 200)
    wundernut.log()
  } catch (error) {
    console.error('🚨 PANIQUE!! 🚨 Error reading file.', error.message)
  }
}

main()
