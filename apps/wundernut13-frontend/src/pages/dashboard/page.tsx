import {
	Accordion,
	AccordionItem,
	Button,
	ClickableTile,
	Link,
	Stack,
	TextArea,
	Tile,
} from "@carbon/react"
import { EXAMPLES } from "@urbanisierung/wundernut13"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useMst } from "../../models/root"

export default observer(() => {
	const { t } = useTranslation("home")
	const {
		router,
		root: {
			pages: { dashboard },
		},
	} = useMst()

	let component = (
		<Stack gap={3}>
			<Tile>
				<div style={{ display: "flex", gap: "1rem" }}>
					<img src="/logo.png" alt="logo" width="48px" height="48px" />
					<Stack>
						<h1>Wundernuts Vol 13</h1>
						<p>
							<Link
								href="https://github.com/wunderdogsw/wundernuts"
								target="_blank"
							>
								Wundernuts
							</Link>{" "}
							is a coding challenge provided by{" "}
							<Link href="https://www.wunderdog.io/" target="_blank">
								Wunderdogs
							</Link>
							. This solution is provided by{" "}
							<Link href="https://urbanisierung.dev" target="_blank">
								@urbanisierung
							</Link>
							.
						</p>
						<p>
							<Link
								target="_blank"
								href="https://github.com/wunderdogsw/wundernut-vol13"
							>
								Challenge on Github
							</Link>{" "}
							/{" "}
							<Link
								target="_blank"
								href="https://github.com/urbanisierung/wundernuts-vol-13"
							>
								Submission on Github
							</Link>
						</p>
						<p>You can add your maze as a json or use one of the examples.</p>
					</Stack>
				</div>
			</Tile>
			<Tile>
				<Accordion>
					<AccordionItem
						title="Paste JSON"
						onClick={() => {
							dashboard.updateAccordionItem("text-area")
						}}
						open={dashboard.accordionOpen === "text-area"}
					>
						<TextArea
							labelText={"Your Maze"}
							helperText={
								"Add the maze as a json. Use these elements: 🟫, 🟩, ❎, 🏃 and 🐉."
							}
							value={dashboard.inputJson}
							onChange={(event) =>
								dashboard.updateInputJson(event.target.value)
							}
							rows={15}
						/>
					</AccordionItem>
					<AccordionItem
						title="Examples"
						onClick={() => {
							dashboard.updateAccordionItem("examples")
						}}
						open={dashboard.accordionOpen === "examples"}
					>
						<div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
							{EXAMPLES.map((example, index) => (
								<ClickableTile
									key={`example-${index}`}
									onClick={() =>
										dashboard.updateInputJson(JSON.stringify(example.maze))
									}
								>
									<Stack>
										<h3>{example.name}</h3>
										<p>{example.description}</p>
									</Stack>
								</ClickableTile>
							))}
						</div>
					</AccordionItem>
				</Accordion>
			</Tile>
			<Tile>
				<div style={{ display: "flex", gap: "0.5rem" }}>
					<Button
						onClick={() => {
							dashboard.clearInputJson()
						}}
						kind="tertiary"
					>
						Reset
					</Button>
					<Button
						onClick={() => dashboard.runMaze()}
						disabled={dashboard.directions.length === 0}
					>
						Run
					</Button>
				</div>
			</Tile>
			<Tile>
				<div style={{ textAlign: "center" }}>
					<pre>{dashboard.getMazeStep()}</pre>
				</div>
			</Tile>
		</Stack>
	)

	return component
})