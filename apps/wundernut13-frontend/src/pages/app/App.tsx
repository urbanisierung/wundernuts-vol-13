import { observer } from "mobx-react-lite"
import { ContentWrapper } from "./ContentWrapper"

export const App = observer(() => {
	let component = <ContentWrapper />
	return component
})
