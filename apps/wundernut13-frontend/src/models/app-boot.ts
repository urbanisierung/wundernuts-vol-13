import { startRouter } from "mobx-router"
import { LOGLEVEL } from "../constants/env.const"
import { appEvents } from "../events/events"
import "../i18n/config"
import routes from "../routes"
import { rootStore } from "./root"

export class ApplicationBoot {
	public static boot() {
		const { app } = rootStore.root
		app.init()
		appEvents.init(LOGLEVEL)
		appEvents.send({
			level: "info",
			id: "app-boot-pre-logged-in",
			message: "Pre logged in boot...",
		})
		startRouter(routes, rootStore)
	}
}
