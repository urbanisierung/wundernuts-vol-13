import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import home from "./en/pages/home.json"

export const resources = {
	en: {
		home,
	},
} as const

i18n.use(initReactI18next).init({
	debug: false,
	lng: "en",
	ns: ["home"],
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
	resources,
})

export default i18n
