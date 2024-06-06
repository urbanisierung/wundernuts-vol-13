/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. Licensed under a commercial license.
 * You may not use this file except in compliance with the commercial license.
 */

export function downloadFile(options: {
	fileName: string
	content: string
	mimeType: "text/x-shellscript" | "text/plain" | "application/json"
}) {
	const a = document.createElement("a")
	a.download = options.fileName
	let content = options.content
	a.href = window.URL.createObjectURL(
		new Blob([content], { type: options.mimeType }),
	)
	a.click()
	window.URL.revokeObjectURL(a.href)
}
