import { Content } from "@carbon/react"
import { observer } from "mobx-react-lite"
import { MobxRouter } from "mobx-router"
import { useTranslation } from "react-i18next"
import { rootStore } from "../../models/root"

export const ContentWrapper = observer(() => {
	const { t } = useTranslation("home")

	let component

	component = (
		<>
			<Content>
				<MobxRouter store={rootStore} />
			</Content>
		</>
	)

	return component
})
