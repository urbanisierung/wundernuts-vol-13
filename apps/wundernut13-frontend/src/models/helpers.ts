import { RouterStore } from "mobx-router"
import { getRoot, IAnyStateTreeNode, types } from "mobx-state-tree"
import { RealRootModelInstance, RootStore, rootStore } from "./root"

export function getRootStore(node?: IAnyStateTreeNode): RealRootModelInstance {
	if (node) {
		return getRoot(node) as RealRootModelInstance
	} else {
		return rootStore.root
	}
}

export function getRouter(): RouterStore<RootStore> {
	return rootStore.router
}

export const ModalErrorType = types.optional(
	types.model("ModalError", {
		title: types.optional(types.string, ""),
		description: types.optional(types.string, ""),
	}),
	{},
)
