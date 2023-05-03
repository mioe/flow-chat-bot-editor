<script setup lang="ts">
import {
	useBaklava,
	DependencyEngine,
	applyResult,
	NodeInterface,
} from 'baklavajs'
import '~/assets/styles/SenderTheme.css'
import CustomEditorComponent from '~/components/ChatBots/ChatBotsWorkspace/ChatBotsEditor.vue'
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
function addNodeWithCoordinates({
	nodeType,
	x,
	y,
	entity,
}: any) {
	const n = new nodeType()
	baklava.displayedGraph.addNode(n)
	n.position.x = x
	n.position.y = y
	n.entity = entity
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

const DEMO_START = addNodeWithCoordinates({
	nodeType: StartNode,
	x: 32,
	y: 32,
	entity: { text: '' },
})

const DEMO_MESSAGE1 = addNodeWithCoordinates({
	nodeType: MessageNode,
	x: 466,
	y: 32,
	entity: {
		text: 'misha',
		enabledAnswerButtons: true,
	},
})
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

const e = Date.now() - s
console.log('🦕 END (between)', e)
</script>

<template>
	<div class="relative flex w-full h-full flex select-none">
		<CustomEditorComponent
			:view-model="baklava"
			class="ps-chat-bot-editor"
		/>
	</div>
</template>
