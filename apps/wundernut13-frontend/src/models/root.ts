import { RouterStore } from "mobx-router"
import { Instance, types } from "mobx-state-tree"
import { useContext } from "react"
import { DashboardPage } from "../pages/dashboard/model"
import { AppStore } from "./appStore"
import { RootStoreContext } from "./context"

const PagesStore = types.model("Pages", {
	dashboard: types.optional(DashboardPage, () => DashboardPage.create()),
})

export const RealRootModel = types.model("Root", {
	pages: types.optional(PagesStore, () => PagesStore.create()),
	app: types.optional(AppStore, () => AppStore.create()),
})

export type RealRootModelInstance = Instance<{
	pages: Instance<typeof PagesStore>
	app: Instance<typeof AppStore>
}>

export class RootStore {
	public router: RouterStore<RootStore>
	public root: {
		pages: Instance<typeof PagesStore>
		app: Instance<typeof AppStore>
	}

	constructor() {
		this.router = new RouterStore<RootStore>(this)
		this.root = RealRootModel.create()
	}
}

export let rootStore = new RootStore()

export function newRootStore() {
	rootStore = new RootStore()
}

export function useMst() {
	const store = useContext(RootStoreContext)
	if (store === null) {
		throw new Error("Store cannot be null, please add a context provider")
	}
	return store
}
