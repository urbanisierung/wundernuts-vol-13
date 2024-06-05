import react from "@vitejs/plugin-react"
import analyze from "rollup-plugin-analyzer"
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

// @ts-expect-error just ignore
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "")

	const plugins: any[] = [
		react(),
		splitVendorChunkPlugin(),
		createHtmlPlugin({
			minify: false,
			template: "index.html",
			inject: {
				data: {
					env: env.VITE_ENV,
				},
			},
		}),
	]

	return {
		plugins,
		server: {
			port: 4300,
			cors: true,
			headers: {
				"Cross-Origin-Opener-Policy": "same-origin",
				"Cross-Origin-Embedder-Policy": "require-corp",
			},
		},
		optimizeDeps: {
			include: [
				"@carbon/react",
				"styled-components",
				"@urbanisierung/wundernut13",
			],
		},
		build: {
			rollupOptions: {
				plugins: [analyze({})],
			},
			plugins: [],
			outDir: "./dist",
		},
	}
})
