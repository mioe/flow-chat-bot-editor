<script setup lang="ts">
import { computed } from 'vue'
import {
	EditorComponent,
	useBaklava,
	DependencyEngine,
	applyResult,
} from 'baklavajs'
import '~/assets/styles/SenderTheme.css'
import ChatBotsHistoryAndZoomPicker from '~/components/ChatBotsUI/ChatBotsHistoryAndZoomPicker.vue'
import CustomConnectionWrapper from '~/components/ChatBotsConnections/ConnectionWrapper.vue'
import CustomTemporaryConnection from '~/components/ChatBotsConnections/TemporaryConnection.vue'
import CustomNodeRenderer from '~/components/CustomNodeRenderer'
import {
	StartNode,
	ActionNode,
	IdleNode,
	IfNode,
	MessageNode,
	InputNode,
	RedirectNode,
	TemplateWabaNode,
} from '~/components/ChatBotsNodes'

import { DisplayNode } from '~/components/DisplayNode'
import { MathNode } from '~/components/MathNode'
import { TestNode } from '~/components/TestNode'

const baklava = useBaklava() as any
const engine = new DependencyEngine(baklava.editor)

// baklava.editor.registerNodeType(MathNode)
// baklava.editor.registerNodeType(DisplayNode)
// baklava.editor.registerNodeType(TestNode)

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

// const node1 = addNodeWithCoordinates(MathNode, 300, 900)
// const node2 = addNodeWithCoordinates(DisplayNode, 550, 900)

// baklava.displayedGraph.addConnection(
// 	node1.outputs.result,
// 	node2.inputs.value,
// )

const SHOW_ALL_NODES = [
	StartNode,
	ActionNode,
	IdleNode,
	IfNode,
	MessageNode,
	InputNode,
	RedirectNode,
	TemplateWabaNode,
]
SHOW_ALL_NODES.forEach((node, idx) => {
	const y = idx * 100 + 16
	addNodeWithCoordinates(node, -420, y)
})

const DEMO_START = addNodeWithCoordinates(StartNode, 32, 32)
const DEMO_MESSAGE1 = addNodeWithCoordinates(MessageNode, 466, 32)
// const DEMO_MESSAGE2 = addNodeWithCoordinates(MessageNode, 520, 216)
// const DEMO_ACTION1 = addNodeWithCoordinates(ActionNode, 480, 400)
// const DEMO_ACTION2 = addNodeWithCoordinates(ActionNode, 400, 680)
// const DEMO_IDLE = addNodeWithCoordinates(IdleNode, 866, 74)
// const DEMO_TEMPLATE_WABA = addNodeWithCoordinates(TemplateWabaNode, 1010, 407)

const PS_CONNECTION_ARROW_OFFSET = computed(() => {
	return 6 * baklava.editor.graph.scaling
})

const e = Date.now() - s
console.log('🦕 END (between)', e)
</script>

<template>
	<div class="relative flex w-full h-full">
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
						:refX="PS_CONNECTION_ARROW_OFFSET"
						refY="0"
					>
						<polyline
							stroke="#b6c7d6"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							fill="#b6c7d6"
							points="-6,-3 0,0 -6,3 -6,-3"
						/>
					</marker>
				</defs>

				<CustomTemporaryConnection
					v-if="temporaryConnection"
					:connection="temporaryConnection"
				/>
			</template>

			<template #node="nodeProps">
				<CustomNodeRenderer
					:key="nodeProps.node.id"
					v-bind="nodeProps"
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
</template>


<style>
.ps-chat-bot-editor .baklava-node[data-node-type=TestNode] > .__title > .__menu {
	display: none;
}
</style>
