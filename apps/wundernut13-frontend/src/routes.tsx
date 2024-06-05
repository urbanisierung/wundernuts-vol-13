import { Route } from "mobx-router"
import { RootStore } from "./models/root"
import DashboardPage from "./pages/dashboard/page"

let routes = {
	home: new Route<RootStore>({
		path: "/",
		component: <DashboardPage />,
		onEnter(_route, _parameters, { root: { pages } }, _queryParams) {
			pages.dashboard.init()
		},
		onParamsChange(_route, _parameters, { root: { pages } }) {
			pages.dashboard.init()
		},
	}),
}

export default routes
