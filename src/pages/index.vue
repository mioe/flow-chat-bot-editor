<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	EditorComponent,
	useBaklava,
	DependencyEngine,
	applyResult,
} from 'baklavajs'
import '~/assets/styles/SenderTheme.css'
import CustomEditorComponent from '~/components/ChatBots/ChatBotsWorkspace/ChatBotsEditor.vue'
import ChatBotsHistoryAndZoomPicker from '~/components/ChatBots/ChatBotsWorkspace/ChatBotsHistoryAndZoomPicker.vue'
import CustomConnectionWrapper from '~/components/ChatBots/ChatBotsConnections/ConnectionWrapper.vue'
import CustomTemporaryConnection from '~/components/ChatBots/ChatBotsConnections/TemporaryConnection.vue'
import CustomNodeRenderer from '~/components/ChatBots/CustomNodeRenderer'
import {
	StartNode,
	ActionNode,
	IdleNode,
	IfNode,
	MessageNode,
	InputNode,
	RedirectNode,
	TemplateWabaNode,
} from '~/components/ChatBots/ChatBotsNodes'

const baklava = useBaklava() as any
const engine = new DependencyEngine(baklava.editor)

baklava.displayedGraph.scaling = 0.7

baklava.editor.registerNodeType(StartNode)
baklava.editor.registerNodeType(ActionNode)
baklava.editor.registerNodeType(IdleNode)
baklava.editor.registerNodeType(IfNode)
baklava.editor.registerNodeType(MessageNode)
baklava.editor.registerNodeType(InputNode)
baklava.editor.registerNodeType(RedirectNode)
baklava.editor.registerNodeType(TemplateWabaNode)

const token = Symbol()
engine.events.afterRun.subscribe(token, (result) => {
	engine.pause()
	applyResult(result, baklava.editor)
	engine.resume()
})

engine.start()

// Add some nodes for demo purposes
function addNodeWithCoordinates(nodeType: any, x: any, y: any) {
	const n = new nodeType()
	baklava.displayedGraph.addNode(n)
	n.position.x = x
	n.position.y = y
	return n
}
const s = Date.now()
console.log('🦕 START', s)

// const SHOW_ALL_NODES = [
// 	StartNode,
// 	ActionNode,
// 	IdleNode,
// 	IfNode,
// 	MessageNode,
// 	InputNode,
// 	RedirectNode,
// 	TemplateWabaNode,
// ]
// SHOW_ALL_NODES.forEach((node, idx) => {
// 	const y = idx * 100 + 16
// 	addNodeWithCoordinates(node, -420, y)
// })

const DEMO_START = addNodeWithCoordinates(StartNode, 32, 32)
const DEMO_MESSAGE1 = addNodeWithCoordinates(MessageNode, 466, 32)
// const DEMO_MESSAGE2 = addNodeWithCoordinates(MessageNode, 520, 216)
// const DEMO_ACTION1 = addNodeWithCoordinates(ActionNode, 480, 400)
// const DEMO_ACTION2 = addNodeWithCoordinates(ActionNode, 400, 680)
// const DEMO_IDLE = addNodeWithCoordinates(IdleNode, 866, 74)
// const DEMO_TEMPLATE_WABA = addNodeWithCoordinates(TemplateWabaNode, 1010, 407)

baklava.editor.graphEvents.beforeAddConnection.subscribe(token, (conn: any, prevent: any) => {
	// может быть только один исход для одного варианта ответа #TODO
	if (conn.from._connectionCount >= 1) {
		const c = baklava.displayedGraph._connections
		const idx = c.findIndex((c: any) => c.from.id === conn.from.id)
		c.splice(idx, 1)
	}
})

const outputEnabled = ref(false)
const handleEnabledOutputPorts = () => {
	outputEnabled.value = true
}
const handleDisabledOutputPorts = () => {
	outputEnabled.value = false
}

const ARROW_POINTS_WITH_SCALE = computed(() => {
	const s = baklava.displayedGraph.scaling
	return `${-6 * s},${-3 * s} 0,0 ${-6 * s},${3 * s} ${-6 * s},${-3 * s}`
})

const e = Date.now() - s
console.log('🦕 END (between)', e)
</script>

<template>
	<div class="relative flex w-full h-full flex">
		<div class="w-[50%]">
			<EditorComponent
				:view-model="baklava"
				class="ps-chat-bot-editor"
			>
				<template #toolbar>
					<div />
				</template>

				<template #connection="connectionProps">
					<CustomConnectionWrapper :connection="connectionProps.connection" />
				</template>

				<template #temporaryConnection="{ temporaryConnection }">
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

					<CustomTemporaryConnection
						v-if="temporaryConnection"
						:connection="temporaryConnection"
						@enabled-output-ports="handleEnabledOutputPorts"
						@disabled-output-ports="handleDisabledOutputPorts"
					/>
				</template>

				<template #node="nodeProps">
					<CustomNodeRenderer
						:key="nodeProps.node.id"
						v-bind="nodeProps"
						:output-enabled="outputEnabled"
					/>
				</template>

				<!-- <template #palette>
			<div />
		</template> -->
			</EditorComponent>

			<ChatBotsHistoryAndZoomPicker
				v-model:scale="baklava.displayedGraph.scaling"
			/>
		</div>
		<div class="w-[50%]">
			<CustomEditorComponent
				:view-model="baklava"
				class="ps-chat-bot-editor"
			/>
		</div>
	</div>
</template>
