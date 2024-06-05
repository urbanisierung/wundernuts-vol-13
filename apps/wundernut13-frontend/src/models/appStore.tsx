import { types } from "mobx-state-tree"
import { LOCALSTORAGE_KEYS } from "../constants/env.const"

let currentTheme: string | null = null

const setThemeClass = (theme: string) => {
	const newTheme = `cds--${theme}`

	if (currentTheme) {
		document.documentElement.classList.remove(currentTheme)
	}

	document.documentElement.classList.add(newTheme)

	currentTheme = newTheme
}

export type ThemeType = "light" | "dark" | "system"

export const ThemeStore = types
	.model("ThemeStore", {
		lightTheme: types.optional(
			types.enumeration("LightTheme", ["white", "g10"]),
			"g10",
		),
		darkTheme: types.optional(
			types.enumeration("DarkTheme", ["g90", "g100"]),
			"g100",
		),
		theme: types.optional(
			types.enumeration("Theme", ["light", "dark", "system"]),
			"light",
		),
	})
	.actions((self) => ({
		updateTheme(options?: {
			theme?: ThemeType
			storeInSettings?: (theme: string) => void
		}) {
			if (options?.theme) {
				self.theme = options?.theme
			}

			if (self.theme === "system") {
				if (window.matchMedia("(prefers-color-scheme: light)").matches) {
					setThemeClass(self.lightTheme)
				} else {
					setThemeClass(self.darkTheme)
				}
			} else if (self.theme === "light") {
				setThemeClass(self.lightTheme)
			} else {
				setThemeClass(self.darkTheme)
			}

			if (options?.storeInSettings) {
				options.storeInSettings(self.theme)
			}
		},
	}))
	.views((self) => ({}))

export const AppStore = types
	.model("AppStore", {
		theme: types.optional(ThemeStore, {}),
	})
	.actions((self) => {
		const init = () => {
			const themeFromLocalStorage = localStorage.getItem(
				LOCALSTORAGE_KEYS.theme,
			)
			if (themeFromLocalStorage) {
				self.theme.updateTheme({ theme: themeFromLocalStorage as any })
			} else {
				self.theme.updateTheme({ theme: "dark" })
			}
		}

		return { init }
	})
