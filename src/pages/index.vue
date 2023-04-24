<script setup lang="ts">
import {
	EditorComponent,
	useBaklava,
	DependencyEngine,
	applyResult,
} from 'baklavajs'
import '~/assets/styles/SenderTheme.css'
import ChatBotsHistoryAndZoomPicker from '~/components/ChatBotsUI/ChatBotsHistoryAndZoomPicker.vue'

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

baklava.editor.registerNodeType(MathNode)
baklava.editor.registerNodeType(DisplayNode)
baklava.editor.registerNodeType(TestNode)

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

const node1 = addNodeWithCoordinates(MathNode, 300, 140)
const node2 = addNodeWithCoordinates(DisplayNode, 550, 140)

addNodeWithCoordinates(TestNode, 200, -20)

baklava.displayedGraph.addConnection(
	node1.outputs.result,
	node2.inputs.value,
)

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
