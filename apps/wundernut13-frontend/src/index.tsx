import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"
import { ApplicationBoot } from "./models/app-boot"
import { Provider } from "./models/provider"
import { rootStore } from "./models/root"
import { App } from "./pages/app/App"

ApplicationBoot.boot()

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
	<StrictMode>
		<Provider value={rootStore}>
			<App />
		</Provider>
	</StrictMode>,
)
