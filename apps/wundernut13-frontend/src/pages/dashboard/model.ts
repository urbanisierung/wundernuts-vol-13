import {
	Wundernut
} from "@urbanisierung/wundernut13"
import { types } from "mobx-state-tree"
import { getRootStore } from "../../models/helpers"

let currentInterval: NodeJS.Timeout | null = null
const PLAY_INTERVAL = 200 // milliseconds

export const DashboardPage = types
	.model("DashboardPage", {
		step: types.optional(types.number, 0),
		directions: types.array(types.string),
		mazeAsString: types.optional(types.string, ""),
		mazeSteps: types.array(types.string),
		error: types.optional(types.string, ""),
		inputJson: types.optional(types.string, ""),
		accordionOpen: types.optional(types.string, "text-area"),
	})
	.actions((self) => {
		const init = () => {}

		const clearInputJson = () => {
			self.inputJson = ""
			self.error = ""
			self.step = 0
			self.directions.clear()
			self.mazeSteps.clear()
			self.mazeAsString = ""
		}

		const generateMaze = (maze: any) => {
			self.error = ""
			self.mazeAsString = ""
			self.directions.clear()
			self.mazeSteps.clear()
			try {
				self.mazeAsString =  Wundernut.getMazeAsString(maze)
			} catch (_error) {
				// ignore
			}
			try {
				const wundernut = new Wundernut({
					maze,
				})
				const shortestPath = wundernut.getShortestPath()
				if (shortestPath) {
					self.directions.push(...shortestPath.directions)
					self.mazeSteps.push(...wundernut.getAllMazeStepsAsString())
				}
			} catch (error: any) {
				self.error = error.message
			}
		}

		const runMaze = () => {
			self.error = ""
			self.step = 0
			try {
				if (currentInterval) {
					clearInterval(currentInterval)
					currentInterval = null
				}
				const { pages } = getRootStore(self)
				if (self.directions.length > 0) {
					currentInterval = setInterval(() => {
						pages.dashboard.incrementIndex()
						if (self.step >= self.directions.length) {
							clearInterval(currentInterval as NodeJS.Timeout)
						}
					}, PLAY_INTERVAL)
				}
			} catch (error: any) {
				self.error = error.message
			}
		}

		const incrementIndex = () => {
			self.step = self.step + 1
		}

		const updateInputJson = (value: string) => {
			self.inputJson = value
			if (value.length === 0) {
				clearInputJson()
				return
			}
			try {
				const updatedValue = value.replaceAll(`'`, `"`)
				const maze = JSON.parse(updatedValue)
				self.error = ""
				generateMaze(maze)
				self.step = 0
			} catch (error) {
				self.error = "Invalid JSON"
			}
		}

		const updateAccordionItem = (item: string) => {
			self.accordionOpen = item
		}

		return {
			init,
			incrementIndex,
			runMaze,
			updateInputJson,
			generateMaze,
			clearInputJson,
			updateAccordionItem,
		}
	})
	.views((self) => {
		const loading = (): boolean => {
			return false
		}

		const getMazeStep = (): string => {
			const output: string[] = []
			if (self.error) {
				output.push(self.error)
				output.push("")
				output.push(self.mazeAsString)
			} else if (self.inputJson.length === 0) {
				output.push(
					"Add the maze as a json. Use these elements: 🟫, 🟩, ❎, 🏃 and 🐉.",
				)
				output.push("")
				output.push(self.mazeAsString)
			} else if (self.mazeSteps.length === 0) {
				output.push(`🐉 wins! No path for our 🏃...`)
				output.push("")
				output.push(self.mazeAsString)
			} else {
				output.push(
					`🏃 wins in ${self.directions.length} steps! Press Run to see it in action!`,
				)
				output.push(
					self.directions
						.map((direction) => {
							switch (direction) {
								case "right":
									return "→"
								case "left":
									return "←"
								case "up":
									return "↑"
								case "down":
									return "↓"
								default:
									return ""
							}
						})
						.join(" "),
				)
				output.push("")
				output.push(self.mazeSteps[self.step])
			}
			return output.join("\n")
		}

		return { loading, getMazeStep }
	})
