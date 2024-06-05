export type LogLevel =
	| "off"
	| "fatal"
	| "error"
	| "warn"
	| "info"
	| "debug"
	| "trace"
	| "http"
	| "featureflags"
	| "mixpanel"
export interface EventPayload {
	level: LogLevel
	id: string
	message: string
	meta?: any
}

const LogLevelStyle: { [key: string]: string } = {
	fatal: "background-color: #881798; font-weight: bold;",
	error: "background-color: #C50F1F;",
	warn: "background-color: orange; color: black;",
	info: "background-color: #3A96DD; color: black;",
	http: "background-color: #D2DEED; color: black;",
	mixpanel: "background-color: #AB46CB; color: white;",
	featureflags: "background-color: #00008b; color: white;",
	debug: "",
}

class AppEvents {
	private logLevel: LogLevel = "off"

	public init(logLevel: LogLevel) {
		this.logLevel = logLevel
	}

	public send(payload: EventPayload) {
		// console logs
		this.printLog(payload)
	}

	private printLog(payload: EventPayload) {
		if (this.logLevel !== "trace") {
			if (payload.level === "off" || payload.level !== this.logLevel) {
				return
			}
		}

		AppEvents.defaultLog(payload)
	}

	private static defaultLog(payload: EventPayload) {
		const style = LogLevelStyle[payload.level] ?? ""
		const logElements: string[] = [payload.level, payload.id, payload.message]
		if (payload.meta) {
			logElements.push(JSON.stringify(payload.meta))
		}
		console.log(`%c${logElements.join(" | ")}`, style)
		if (payload.meta) {
			console.log(payload.meta)
		}
	}
}

export const appEvents = new AppEvents()
