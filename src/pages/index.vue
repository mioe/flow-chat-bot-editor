<script setup lang="ts">
import {
	EditorComponent,
	useBaklava,
	DependencyEngine,
	applyResult,
} from 'baklavajs'
import '~/components/SenderTheme.css'

import { DisplayNode } from '~/components/DisplayNode'
import { MathNode } from '~/components/MathNode'
import { TestNode } from '~/components/TestNode'

const baklava = useBaklava()
const engine = new DependencyEngine(baklava.editor)

baklava.editor.registerNodeType(MathNode)
baklava.editor.registerNodeType(DisplayNode)
baklava.editor.registerNodeType(TestNode)

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

const emit = defineEmits([
	'done',
])

const e = Date.now() - s
console.log('🦕 END (between)', e)
</script>

<template>
	<EditorComponent
		:view-model="baklava"
		class="ps-chat-bot-editor"
	>
		<template #background>
			<div />
		</template>
		<template #toolbar>
			<div />
		</template>
		<!-- <template #palette>
			<div />
		</template> -->
	</EditorComponent>
</template>


<!-- <style>
.ps-chat-bot-editor .baklava-node[data-node-type=TestNode].--selected {
	box-shadow: none;
}

.ps-chat-bot-editor .baklava-node[data-node-type=TestNode]:hover {
	box-shadow: none;
}

.ps-chat-bot-editor .baklava-node[data-node-type=TestNode] > .__content {
	padding: 16px;
}

.ps-chat-bot-editor .baklava-node[data-node-type=TestNode] {
	border-radius: 16px;
	background-color: white;
	font-family: 'Inter';
	font-style: normal;
	width: 369px !important;
}

.ps-chat-bot-editor .baklava-node[data-node-type=TestNode] > .__title > .__menu {
	display: none;
}

.ps-chat-bot-editor .baklava-node[data-node-type=TestNode] > .__title {
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	background-color: #ddf8df;
	color: #51B77A;
	border-radius: 16px 16px 0px 0px;
	padding: 16px;
}
</style> -->
