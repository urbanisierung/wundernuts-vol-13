declare module "@carbon/react" {
	export const Stack: React.FunctionComponent<{
		id?: string
		orientation?: "horizontal" | "vertical"
		gap?: number
		className?: string
		children?: React.ReactNode
	}>

	export const Tabs: React.FunctionComponent<{
		selectedIndex?: number
		onChange?: (event: { selectedIndex: number }) => void
	}>

	export const Layer: React.FunctionComponent<{
		children: React.ReactNode
		style?: React.CSSProperties
		level?: number
	}>
	export const TabList: React.FunctionComponent
	export const TabPanel: React.FunctionComponent
	export const TabPanels: React.FunctionComponent
	export const DefinitionTooltip: React.FunctionComponent<{
		definition: string
		children: React.ReactNode
		align?: string
	}>
	export const ActionableNotification: React.FunctionComponent<{
		kind?: "info" | "warning" | "error"
		inline: boolean
		lowContrast: boolean
		hideCloseButton: boolean
		style: any
		actionButtonLabel: string
		onActionButtonClick: any
		title: string
		subtitle: string
	}>

	export const FlexGrid: React.FunctionComponent<{
		condensed?: boolean
		fullWidth?: boolean
		narrow?: boolean
		style: any
		className?: string
		children?: React.ReactNode
	}>

	export const Tooltip: React.FunctionComponent<{
		children?: React.ReactNode
		label: string
		align: any
	}>

	export * from "carbon-components-react"
}

declare module "@carbon/react/icons"
declare module "@carbon/themes"
