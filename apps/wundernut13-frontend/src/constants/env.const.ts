import { LogLevel } from "../events/events"

export const ENV = String(import.meta.env.VITE_ENV)
export const OVERVIEW_ID = String(import.meta.env.VITE_OVERVIEW_ID)

export const LOGLEVEL = import.meta.env.VITE_LOGLEVEL
	? (String(import.meta.env.VITE_LOGLEVEL) as LogLevel)
	: "off"

export const LOCALSTORAGE_PREFIX = "@@WUNDERNUT13@@"
export const LOCALSTORAGE_KEYS = {
	theme: `${LOCALSTORAGE_PREFIX}:t`,
	appVersion: `${LOCALSTORAGE_PREFIX}:v`,
}
export const APP_VERSION = `alpha1`
