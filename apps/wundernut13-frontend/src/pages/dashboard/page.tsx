import {
	Accordion,
	AccordionItem,
	Button,
	ClickableTile,
	FileUploader,
	Link,
	Stack,
	TextArea,
	Tile,
} from "@carbon/react"
import { EXAMPLES } from "@urbanisierung/wundernut13"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useMst } from "../../models/root"
import { downloadFile } from "./download.utils"

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
						title="Paste Maze JSON"
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
						title="Upload Maze JSON"
						onClick={() => {
							dashboard.updateAccordionItem("upload")
						}}
						open={dashboard.accordionOpen === "upload"}
					>
						<FileUploader
							labelTitle="Upload"
							labelDescription="Upload a Maze JSON file"
							buttonLabel="Upload Maze JSON"
							buttonKind="primary"
							size="md"
							filenameStatus="edit"
							role="button"
							accept={[".json"]}
							multiple={false}
							disabled={false}
							iconDescription="Remove file"
							name=""
							onChange={(event) => {
								const file =
									event?.target?.files && event.target.files.length > 0
										? event.target.files[0]
										: null
								if (file) {
									const fileReader = new FileReader()
									fileReader.onload = (onLoadEvent) => {
										const mazeJson: string =
											(onLoadEvent?.target?.result as string) ?? ""
										dashboard.updateInputJson(mazeJson)
									}
									fileReader.readAsText(file)
								} else {
									// ignore
								}
							}}
							onDelete={() => {
								dashboard.clearInputJson()
							}}
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
						disabled={dashboard.state !== "win"}
					>
						Run
					</Button>
					<Button
						kind="tertiary"
						onClick={() =>
							downloadFile({
								fileName: `submission-by-urbanisierung-wundernuts-vol-13-result-${Date.now()}.json`,
								content: dashboard.resultString,
								mimeType: "application/json",
							})
						}
						disabled={dashboard.state === "error" || dashboard.state === "idle"}
					>
						Gimme the Data!
					</Button>
				</div>
			</Tile>
			{dashboard.getDescription() && (
				<Tile>
					<div style={{ textAlign: "center" }}>
						{dashboard.getDescription()!.map((description, index) => (
							<p key={`description-${index}`}>{description}</p>
						))}
					</div>
				</Tile>
			)}
			{dashboard.getMazeStep() && (
				<Tile>
					<div style={{ textAlign: "center" }}>
						<pre>{dashboard.getMazeStep()}</pre>
					</div>
				</Tile>
			)}
			{dashboard.getPossiblePathsToWin() && (
				<Tile>
					<p>
						{dashboard.getPossiblePathsToWin()!.length} possible path(s) to{" "}
						<strong>win</strong>:
					</p>
					<div style={{ textAlign: "center" }}>
						<div style={{ display: "grid", gap: "0.5rem" }}>
							{dashboard.getPossiblePathsToWin()!.map((path, index) => (
								<pre key={`possible-path-win-${index}`}>{path}</pre>
							))}
						</div>
					</div>
				</Tile>
			)}
			{dashboard.getPossiblePathsToReachGoal() && (
				<Tile>
					<p>
						{dashboard.getPossiblePathsToReachGoal()!.length} Possible path(s)
						to <strong>reach goal</strong>:
					</p>
					<div style={{ textAlign: "center" }}>
						<div style={{ display: "grid", gap: "0.5rem" }}>
							{dashboard.getPossiblePathsToReachGoal()!.map((path, index) => (
								<pre key={`possible-path-goal-${index}`}>{path}</pre>
							))}
						</div>
					</div>
				</Tile>
			)}
		</Stack>
	)

	return component
})
