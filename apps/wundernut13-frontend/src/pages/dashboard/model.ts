import { Wundernut } from "@urbanisierung/wundernut13"
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
		state: types.optional(types.string, "idle"),
		possiblePathsToReachGoal: types.array(types.string),
		possiblePathsToWin: types.array(types.string),
		resultString: types.optional(types.string, ""),
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
			self.state = "idle"
			self.resultString = ""
		}

		const generateMaze = (maze: any) => {
			self.error = ""
			self.mazeAsString = ""
			self.directions.clear()
			self.mazeSteps.clear()
			self.possiblePathsToReachGoal.clear()
			self.possiblePathsToWin.clear()
			try {
				self.mazeAsString = Wundernut.getMazeAsString(maze)
			} catch (_error) {
				// ignore
			}
			try {
				const wundernut = new Wundernut({
					maze,
				})
				const result = wundernut.getResult()
				if (result.result === "win") {
					self.state = "win"
					self.directions.push(...result.directions)
					self.mazeSteps.push(...result.allMazeStepsOfShortestPath)
					self.possiblePathsToReachGoal.push(
						...result.allPossiblePathsToReachGoalAsMazeString,
					)
					self.possiblePathsToWin.push(
						...result.allPossiblePathsToWinAsMazeString,
					)
				} else {
					self.state = "lose"
					self.mazeSteps.push(result.originalMaze)
				}
				self.resultString = JSON.stringify(result, null, 2)
			} catch (error: any) {
				self.state = "error"
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

		const getDescription = (): string[] | undefined => {
			let description: string[] | undefined = []
			switch (self.state) {
				case "idle":
					description.push(
						"Add the maze as a json. Use these elements: 🟫, 🟩, ❎, 🏃 and 🐉.",
					)
					break
				case "win":
					description.push(
						`🏃 wins in ${self.directions.length} steps! Press Run to see it in action!`,
					)
					description.push(
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
					break
				case "lose":
					description.push(`🐉 wins! No path for our 🏃...`)
					break
				case "error":
					description.push(self.error)
					break
				default:
					description = undefined
			}
			return description
		}

		const getMazeStep = (): string | undefined => {
			switch (self.state) {
				case "idle":
					return undefined
				case "win":
					return self.mazeSteps[self.step]
				case "lose":
					return self.mazeAsString
				case "error":
					return self.mazeAsString
				default:
					return undefined
			}
		}

		const getPossiblePathsToReachGoal = (): string[] | undefined => {
			switch (self.state) {
				case "win":
					return self.possiblePathsToReachGoal
				default:
					return undefined
			}
		}

		const getPossiblePathsToWin = (): string[] | undefined => {
			switch (self.state) {
				case "win":
					return self.possiblePathsToWin
				default:
					return undefined
			}
		}

		return {
			loading,
			getMazeStep,
			getDescription,
			getPossiblePathsToReachGoal,
			getPossiblePathsToWin,
		}
	})
