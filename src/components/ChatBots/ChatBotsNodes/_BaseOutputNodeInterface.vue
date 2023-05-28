
<script setup lang="ts">
import { computed, inject, onMounted, onUpdated, Ref, ref } from 'vue'
import {
	// StartNode,
	ActionNode,
	IdleNode,
	IfNode,
	MessageNode,
	InputNode,
	// RedirectNode,
	TemplateWabaNode,
} from '~/components/ChatBots/ChatBotsNodes'
import { AbstractNode, NodeInterface } from '@baklavajs/core'
import { useViewModel, useTransform } from '~/components/ChatBots/utility'

// @ts-ignore
import ChatMIcon from '~/assets/icons/chat-m.svg?component'
// @ts-ignore
import AttachmentMIcon from '~/assets/icons/attachment-m.svg?component'
// @ts-ignore
import NotesLIcon from '~/assets/icons/notes-l.svg?component'
// @ts-ignore
import TimeMIcon from '~/assets/icons/time-m.svg?component'
// @ts-ignore
import ConditionIcon from '~/assets/icons/condition.svg?component'
// @ts-ignore
import ZapIcon from '~/assets/icons/zap.svg?component'


const { transform } = useTransform()

const props = defineProps<{
	node: AbstractNode
	intf: NodeInterface
}>()

const { viewModel } = useViewModel()
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const hoveredOver = inject<(intf: NodeInterface | undefined) => void>('hoveredOver')!
const editorEl = inject<Ref<HTMLElement | null>>('editorEl')

const el = ref<HTMLElement | null>(null) as Ref<HTMLElement>

const isConnected = computed(() => props.intf.connectionCount > 0)
const showConnectionMenu = computed(() => !isConnected.value && props.intf.port)
const isOpenConnectionMenu = ref(false)

const showComponent = computed<boolean>(
	() => props.intf.component && !props.intf.isInput,
)

const classes = computed(() => {
	return showComponent.value && !props.intf.port
		? {}
		: {
			'--input': props.intf.isInput,
			'--output': !props.intf.isInput,
			'--connected': isConnected.value,
		}
})

const FAKE_LINE_WITH_SCALE = computed(() => {
	// @ts-ignore
	const s = viewModel.value.displayedGraph.scaling
	return 2 / s
})

const NODES_LIST = new Map()
NODES_LIST.set('ActionNode', ActionNode)
NODES_LIST.set('IdleNode', IdleNode)
NODES_LIST.set('IfNode', IfNode)
NODES_LIST.set('MessageNode', MessageNode)
NODES_LIST.set('InputNode', InputNode)
NODES_LIST.set('TemplateWabaNode', TemplateWabaNode)

const addNodeWithCoordinates = (nodeType: any, x: number, y: number) => {
	const n = new nodeType()
	viewModel.value.displayedGraph.addNode(n)
	n.position.x = x
	n.position.y = y
	return n
}


const handleConnectionMenuItem = (ev: MouseEvent, nodeKey: string) => {
	isOpenConnectionMenu.value = false
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const rect = editorEl!.value!.getBoundingClientRect()
	const [x, y] = transform(ev.clientX - rect.left, ev.clientY - rect.top)
	const newNode = addNodeWithCoordinates(NODES_LIST.get(nodeKey), x, y)
	viewModel.value.displayedGraph.addConnection(
		props.intf,
		newNode.inputs.input,
	)
}

const startHover = () => {
	hoveredOver(props.intf)
}
const endHover = () => {
	hoveredOver(undefined)
}

const onRender = () => {
	if (el.value) {
		viewModel.value.hooks.renderInterface.execute({ intf: props.intf, el: el.value })
	}
}

onMounted(onRender)
onUpdated(onRender)
</script>

<template>
	<div
		:id="intf.id"
		ref="el"
		class="baklava-node-interface"
		:class="classes"
	>
		<div
			v-if="intf.port"
			class="__port"
			@pointerover="startHover"
			@pointerout="endHover"
		/>

		<template v-if="showConnectionMenu">
			<div>
				<svg
					width="100%"
					height="100%"
					class="absolute top-[50%] transform right-[-50px] -translate-y-[50%] h-[100%] w-[26px] bg-transparent"
				>
					<line
						x1="0"
						y1="50%"
						x2="100%"
						y2="50%"
						stroke="#b6c7d6"
						:stroke-width="FAKE_LINE_WITH_SCALE"
						marker-end="url(#ps-connection-arrow)"
					/>
				</svg>
			</div>

			<div class="chat-bots-nodes--toggle-connection-menu">
				<PDropdown
					v-model="isOpenConnectionMenu"
					:close-on-self-click="false"
					:width="182"
					placement="right-start"
				>
					<template #activator="{ setReference, click }">
						<button
							:ref="setReference"
							class="chat-bots-nodes--toggle-connection-btn"
							:class="{'is-open': isOpenConnectionMenu}"
							@click="click"
						>
							<IconAddMd class="w-[20px] h-[20px]" />
						</button>
					</template>

					<div class="chat-bots-nodes--toggle-connection-drop">
						<div class="chat-bots-nodes--toggle-connection-drop--nodes">
							<button
								class="chat-bots-nodes--toggle-connection-drop--nodes--item"
								@click="handleConnectionMenuItem($event, 'MessageNode')"
							>
								<ChatMIcon class="c-$additional-blue w-[20px] h-[20px] inline-block" />
								<span>Сообщение</span>
							</button>

							<button
								class="chat-bots-nodes--toggle-connection-drop--nodes--item"
								@click="handleConnectionMenuItem($event, 'InputNode')"
							>
								<AttachmentMIcon class="c-$additional-blue w-[20px] h-[20px] inline-block" />
								<span>Вложение</span>
							</button>

							<button
								class="chat-bots-nodes--toggle-connection-drop--nodes--item"
								@click="handleConnectionMenuItem($event, 'TemplateWabaNode')"
							>
								<NotesLIcon class="c-$additional-green w-[20px] h-[20px] inline-block" />
								<span>Шаблон WABA</span>
							</button>

							<button
								class="chat-bots-nodes--toggle-connection-drop--nodes--item"
								@click="handleConnectionMenuItem($event, 'IdleNode')"
							>
								<TimeMIcon class="c-$additional-pink w-[20px] h-[20px] inline-block" />
								<span>Задержка</span>
							</button>

							<button
								class="chat-bots-nodes--toggle-connection-drop--nodes--item"
								@click="handleConnectionMenuItem($event, 'IfNode')"
							>
								<ConditionIcon class="c-$additional-orange w-[20px] h-[20px] inline-block" />
								<span>Условие</span>
							</button>

							<button
								class="chat-bots-nodes--toggle-connection-drop--nodes--item"
								@click="handleConnectionMenuItem($event, 'ActionNode')"
							>
								<ZapIcon class="c-$additional-purple w-[20px] h-[20px] inline-block" />
								<span>Действие</span>
							</button>
						</div>
					</div>
				</PDropdown>
			</div>
		</template>
		<!-- eslint-disable vue/no-mutating-props -->
		<component
			:is="intf.component"
			v-if="showComponent"
			v-model="intf.value"
			:node="node"
			:intf="intf"
		/>
		<!-- eslint-enable vue/no-mutating-props -->
		<span
			v-else
			class="align-middle"
		>
			{{ intf.name }}
		</span>
	</div>
</template>

<style>
.chat-bots-nodes--toggle-connection-menu {
	position: absolute;
	z-index: 1;
	top: 50%;
	right: -86px;
	transform: translateY(-50%);
}

.chat-bots-nodes--toggle-connection-btn {
	position: relative;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	overflow: hidden;
	border: 2px solid var(--common-dullSky);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: var(--common-dullSky);
	transition: transform .3s, opacity .3s;
	transform: rotate(0deg);
}

.chat-bots-nodes--toggle-connection-btn:hover,
.chat-bots-nodes--toggle-connection-btn:focus,
.chat-bots-nodes--toggle-connection-btn:focus-visible {
	opacity: 1 !important;
}

.chat-bots-nodes--toggle-connection-btn.is-open {
	transform: rotate(-45deg);
}

.chat-bots-nodes--toggle-connection-drop--nodes {
	display: flex;
	flex-direction: column;
	gap: 4px;
	text-align: left;
	color: var(--common-black);
}

.chat-bots-nodes--toggle-connection-drop--nodes--item {
	display: flex;
	gap: 12px;
	width: 100%;
	font: inherit;
	padding-top: 8px;
	padding-bottom: 8px;
}

.chat-bots-nodes--toggle-connection-drop--nodes .chat-bots-nodes--toggle-connection-drop--nodes--item:first-of-type {
	padding-top: 0;
}
</style>
