<template>
	<div
		ref="el"
		tabindex="-1"
		class="baklava-editor"
		:class="{
			'baklava-ignore-mouse': !!temporaryConnection || dragging,
			'--temporary-connection': !!temporaryConnection,
		}"
		@pointermove.self="onPointerMove"
		@pointerdown="onPointerDown"
		@pointerup="onPointerUp"
		@wheel.self="mouseWheel"
		@keydown="keyDown"
		@keyup="keyUp"
	>
		<slot name="background">
			<CustomBackground />
		</slot>

		<svg class="connections-container">
			<defs>
				<marker
					id="ps-connection-arrow"
					markerWidth="12.5"
					markerHeight="12.5"
					viewBox="-10 -10 20 20"
					markerUnits="strokeWidth"
					orient="auto-start-reverse"
					refX="0"
					refY="0"
				>
					<polyline
						stroke="#b6c7d6"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						fill="#b6c7d6"
						:points="ARROW_POINTS_WITH_SCALE"
					/>
				</marker>
			</defs>

			<g
				v-for="connection in connections"
				:key="connection.id + counter.toString()"
			>
				<CustomConnectionWrapper
					:connection="connection"
				/>
			</g>

			<CustomTemporaryConnection
				v-if="temporaryConnection"
				:connection="temporaryConnection"
				@enabled-output-ports="handleEnabledOutputPorts"
				@disabled-output-ports="handleDisabledOutputPorts"
			/>
		</svg>

		<div
			class="node-container"
			:style="nodeContainerStyle"
		>
			<transition-group name="fade">
				<template v-for="(node, idx) in nodes">
					<slot
						name="node"
						:node="node"
						:selected="selectedNodes.includes(node)"
						@select="selectNode(node)"
					>
						<CustomNodeRenderer
							:key="node.id + counter.toString()"
							:idx="idx + 1"
							:node="node"
							:output-enabled="outputEnabled !== null && outputEnabled !== node.id"
							:selected="selectedNodes.includes(node)"
							@select="selectNode(node)"
						/>
					</slot>
				</template>
			</transition-group>
		</div>

		<ChatBotsHistoryAndZoomPicker v-model:scale="scaling" />
		<ChatBotsPalette />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, Ref, ref, toRef } from 'vue'

import { AbstractNode } from '@baklavajs/core'
import { IBaklavaViewModel } from 'baklavajs'
import { usePanZoom } from './panZoom'
import { useTemporaryConnection } from './temporaryConnection'

// Core vue-render
import CustomNodeRenderer from '~/components/ChatBots/CustomNodeRenderer'
import CustomConnectionWrapper from '~/components/ChatBots/ChatBotsConnections/ConnectionWrapper.vue'
import CustomTemporaryConnection from '~/components/ChatBots/ChatBotsConnections/TemporaryConnection.vue'
import CustomBackground from '~/components/ChatBots/ChatBotsWorkspace/ChatBotsBackground.vue'

// Optional components
import ChatBotsHistoryAndZoomPicker from '~/components/ChatBots/ChatBotsWorkspace/ChatBotsHistoryAndZoomPicker.vue'
import ChatBotsPalette from '~/components/ChatBots/ChatBotsWorkspace/ChatBotsPalette.vue'

import { providePlugin } from '~/components/ChatBots/utility'

export default defineComponent({
	components: {
		CustomBackground,
		CustomNodeRenderer,
		CustomConnectionWrapper,
		CustomTemporaryConnection,
		ChatBotsHistoryAndZoomPicker,
		ChatBotsPalette,
	},
	props: {
		viewModel: {
			type: Object as () => IBaklavaViewModel,
			required: true,
		},
	},
	setup(props) {
		const token = Symbol('EditorToken')

		const viewModelRef = toRef(props, 'viewModel') as unknown as Ref<IBaklavaViewModel>
		providePlugin(viewModelRef)

		const el = ref<HTMLElement | null>(null)
		provide('editorEl', el)

		const nodes = computed(() => props.viewModel.displayedGraph.nodes)
		const connections = computed(() => props.viewModel.displayedGraph.connections)
		// @ts-ignore
		const selectedNodes = computed(() => props.viewModel.displayedGraph.selectedNodes)

		const panZoom = usePanZoom()
		const temporaryConnection = useTemporaryConnection()

		const scaling = computed({
			get() {
				// @ts-ignore
				return props.viewModel.displayedGraph.scaling
			},
			// setter
			set(newValue) {
				// @ts-ignore
				return viewModelRef.value.displayedGraph.scaling = newValue
			},
		})

		const nodeContainerStyle = computed(() => ({
			...panZoom.styles.value,
		}))

		// Reason: https://github.com/newcat/baklavajs/issues/54
		const counter = ref(0)
		props.viewModel.editor.hooks.load.subscribe(token, (s) => {
			counter.value++
			return s
		})

		const onPointerMove = (ev: PointerEvent) => {
			panZoom.onPointerMove(ev)
			temporaryConnection.onMouseMove(ev)
		}

		const onPointerDown = (ev: PointerEvent) => {
			if (ev.button === 0) {
				if (ev.target === el.value) {
					unselectAllNodes()
					panZoom.onPointerDown(ev)
				}
				temporaryConnection.onMouseDown()
			}
		}

		const onPointerUp = (ev: PointerEvent) => {
			panZoom.onPointerUp(ev)
			temporaryConnection.onMouseUp()
		}

		const keyDown = (ev: KeyboardEvent) => {
			if (ev.key === 'Tab') {
				ev.preventDefault()
			}
			props.viewModel.commandHandler.handleKeyDown(ev)
		}

		const keyUp = (ev: KeyboardEvent) => {
			props.viewModel.commandHandler.handleKeyUp(ev)
		}

		const selectNode = (node: AbstractNode) => {
			if (!props.viewModel.commandHandler.pressedKeys.includes('Control')) {
				unselectAllNodes()
			}
			// @ts-ignore
			// eslint-disable-next-line vue/no-mutating-props
			props.viewModel.displayedGraph.selectedNodes.push(node)
		}

		const unselectAllNodes = () => {
			// @ts-ignore
			// eslint-disable-next-line vue/no-mutating-props
			props.viewModel.displayedGraph.selectedNodes = []
		}

		const ARROW_POINTS_WITH_SCALE = computed(() => {
			// @ts-ignore
			const s = props.viewModel.displayedGraph.scaling
			return `${-6 * s},${-3 * s} 0,0 ${-6 * s},${3 * s} ${-6 * s},${-3 * s}`
		})

		const outputEnabled: Ref<any> = ref(null)
		const handleEnabledOutputPorts = (val: string) => {
			outputEnabled.value = val
		}
		const handleDisabledOutputPorts = () => {
			outputEnabled.value = null
		}

		return {
			el,
			counter,
			nodes,
			connections,
			selectedNodes,
			nodeContainerStyle,
			onPointerMove,
			onPointerDown,
			onPointerUp,
			keyDown,
			keyUp,
			selectNode,
			temporaryConnection: temporaryConnection.temporaryConnection,
			mouseWheel: panZoom.onMouseWheel,
			dragging: panZoom.dragging,
			viewModelRef,
			ARROW_POINTS_WITH_SCALE,
			outputEnabled,
			handleEnabledOutputPorts,
			handleDisabledOutputPorts,
			scaling,
		}
	},
})
</script>
