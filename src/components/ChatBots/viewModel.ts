import { reactive, ref, Ref, shallowReadonly, watch } from 'vue'
import { AbstractNode, Editor, Graph, GraphTemplate, NodeInterface } from '@baklavajs/core'
import { IBaklavaTapable, SequentialHook } from '@baklavajs/events'

function setViewNodeProperties(node: any) {
	node.position = node.position ?? { x: 0, y: 0 }
	node.disablePointerEvents = false
	node.twoColumn = node.twoColumn ?? false
	node.width = node.width ?? 200
}

type IViewNodeState = any

export interface IViewSettings {
	/** Use straight connections instead of bezier curves */
	useStraightConnections: boolean
	/** Show a minimap */
	enableMinimap: boolean
	/** Background settings */
	background: {
		gridSize: number
		gridDivision: number
		subGridVisibleThreshold: number
	}
}

export interface IBaklavaViewModel extends IBaklavaTapable {
	editor: Editor;
	/** Currently displayed graph */
	displayedGraph: Graph;
	settings: IViewSettings;
	hooks: {
			/** Called whenever a node is rendered */
			renderNode: SequentialHook<{ node: AbstractNode; el: HTMLElement }, null>;
			/** Called whenever an interface is rendered */
			renderInterface: SequentialHook<{ intf: NodeInterface<any>; el: HTMLElement }, null>;
	};
}

export function useBaklava(existingEditor?: Editor): IBaklavaViewModel {
	const editor: Ref<Editor> = ref(existingEditor ?? new Editor()) as Ref<Editor>
	const token = Symbol('ViewModelToken')

	const _displayedGraph = ref(null as any) as Ref<Graph>
	const displayedGraph = shallowReadonly(_displayedGraph)

	const settings: IViewSettings = reactive({
		useStraightConnections: false,
		enableMinimap: false,
		background: {
			gridSize: 100,
			gridDivision: 5,
			subGridVisibleThreshold: 0.6,
		},
	})


	const hooks = {
		/** Called whenever a node is rendered */
		renderNode: new SequentialHook<{ node: AbstractNode; el: HTMLElement }, null>(null),
		/** Called whenever an interface is rendered */
		renderInterface: new SequentialHook<{ intf: NodeInterface<any>; el: HTMLElement }, null>(null),
	}

	watch(
		editor,
		(newValue, oldValue) => {
			if (oldValue) {
				oldValue.events.registerGraph.unsubscribe(token)
				oldValue.graphEvents.beforeAddNode.unsubscribe(token)
				newValue.nodeHooks.beforeLoad.unsubscribe(token)
				newValue.nodeHooks.afterSave.unsubscribe(token)
				newValue.graphTemplateHooks.beforeLoad.unsubscribe(token)
				newValue.graphTemplateHooks.afterSave.unsubscribe(token)
				newValue.graph.hooks.load.unsubscribe(token)
				newValue.graph.hooks.save.unsubscribe(token)
			}
			if (newValue) {
				newValue.nodeHooks.beforeLoad.subscribe(token, (state, node: any) => {
					node.position = (state as IViewNodeState).position ?? { x: 0, y: 0 }
					node.width = (state as IViewNodeState).width ?? 200
					node.twoColumn = (state as IViewNodeState).twoColumn ?? false
					return state
				})
				newValue.nodeHooks.afterSave.subscribe(token, (state, node: any) => {
					(state as IViewNodeState).position = node.position;
					(state as IViewNodeState).width = node.width;
					(state as IViewNodeState).twoColumn = node.twoColumn
					return state
				})
				newValue.graphTemplateHooks.beforeLoad.subscribe(token, (state: any, template: any) => {
					template.panning = state.panning
					template.scaling = state.scaling
					return state
				})
				newValue.graphTemplateHooks.afterSave.subscribe(token, (state: any, template: any) => {
					state.panning = template.panning
					state.scaling = template.scaling
					return state
				})
				newValue.graph.hooks.load.subscribe(token, (state: any, graph: any) => {
					graph.panning = state.panning
					graph.scaling = state.scaling
					return state
				})
				newValue.graph.hooks.save.subscribe(token, (state: any, graph: any) => {
					state.panning = graph.panning
					state.scaling = graph.scaling
					return state
				})

				newValue.graphEvents.beforeAddNode.subscribe(token, (node) => setViewNodeProperties(node))
			}
		},
		{ immediate: true },
	)

	return reactive({
		editor,
		displayedGraph,
		settings,
		hooks,
	}) as IBaklavaViewModel
}
