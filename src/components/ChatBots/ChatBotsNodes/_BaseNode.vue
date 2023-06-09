<script setup lang="ts">
import { ref, computed, toRef, onUpdated, onMounted } from 'vue'
import { AbstractNode } from '@baklavajs/core'
import { useDragMove, useGraph, useViewModel } from '~/components/ChatBots/utility'
import OutputNodeInterface from '~/components/ChatBots/ChatBotsNodes/_BaseOutputNodeInterface.vue'
import InputNodeInterface from '~/components/ChatBots/ChatBotsNodes/_BaseInputNodeInterface.vue'

// @ts-ignore
import TrashSIcon from '~/assets/icons/trash-s.svg?component'
// @ts-ignore
import CopySIcon from '~/assets/icons/copy-s.svg?component'

const props = withDefaults(
	defineProps<{
		node: AbstractNode
		idx?: number
		selected?: boolean
		hideActionButtons?: boolean
		outputEnabled?: boolean
	}>(),
	{
		idx: 0,
		selected: false,
		hideActionButtons: false,
		outputEnabled: false,
	},
)

const emit = defineEmits<{
	(e: 'select'): void;
}>()

const { viewModel } = useViewModel()
const { graph } = useGraph()
// @ts-ignore
const dragMove = useDragMove(toRef(props.node, 'position'))

const el = ref<HTMLElement | null>(null)

const classes = computed(() => ({
	'--selected': props.selected,
	'--dragging': dragMove.dragging.value,
}))

const styles = computed(() => ({
	// @ts-ignore
	top: `${props.node.position?.y ?? 0}px`,
	// @ts-ignore
	left: `${props.node.position?.x ?? 0}px`,
	// @ts-ignore
	width: `${props.node.width ?? 200}px`,
}))

const onRemoveNode = () => {
	graph.value.removeNode(props.node)
}

const onCopyNode = () => {
	alert('TODO COPY')
}

const displayedInputs = computed(() => Object.values(props.node.inputs).filter((ni) => !ni.hidden))
const displayedOutputs = computed(() => Object.values(props.node.outputs).filter((ni) => !ni.hidden))

const select = () => {
	emit('select')
}

const startDrag = (ev: PointerEvent) => {
	dragMove.onPointerDown(ev)
	document.addEventListener('pointermove', dragMove.onPointerMove)
	document.addEventListener('pointerup', stopDrag)
	select()
}

const stopDrag = () => {
	dragMove.onPointerUp()
	document.removeEventListener('pointermove', dragMove.onPointerMove)
	document.removeEventListener('pointerup', stopDrag)
}

const onRender = () => {
	if (el.value) {
		viewModel.value.hooks.renderNode.execute({ node: props.node, el: el.value })
	}
}

const SHOW_IDX_NODE = computed(() =>
	props.idx < 10
		? `0${props.idx}`
		: props.idx,
)

onMounted(onRender)
onUpdated(onRender)
</script>

<template>
	<div
		:id="node.id"
		ref="el"
		class="baklava-node"
		:class="classes"
		:style="styles"
		:data-node-type="node.type"
		@pointerdown="select"
	>
		<div
			class="__title"
			@pointerdown.self.stop="startDrag"
		>
			<div class="__title-label">
				<div>
					{{ SHOW_IDX_NODE }}
				</div>

				<div class="w-[5px] h-[5px] bg-current rounded-full" />

				<div>
					{{ node.title }}
				</div>
			</div>
			<button
				v-if="!hideActionButtons"
				class="border-none bg-transparent p-0 m-0 w-[20px] h-[20px] shrink-0 flex items-center justify-center cursor-pointer"
				@click="onRemoveNode"
			>
				<TrashSIcon class="w-[16px] h-[16px]" />
			</button>
			<button
				v-if="!hideActionButtons"
				class="border-none bg-transparent p-0 m-0 w-[20px] h-[20px] shrink-0 flex items-center justify-center cursor-pointer"
				@click="onCopyNode"
			>
				<CopySIcon class="w-[16px] h-[16px]" />
			</button>
		</div>

		<div class="__content">
			<!-- Outputs -->
			<div class="__outputs">
				<slot name="outputs">
					<OutputNodeInterface
						v-for="output in displayedOutputs"
						:key="output.id"
						:node="node"
						:intf="output"
					/>
				</slot>
			</div>

			<!-- Inputs -->
			<div
				v-show="outputEnabled"
				class="__inputs"
			>
				<InputNodeInterface
					v-for="input in displayedInputs"
					:key="input.id"
					:node="node"
					:intf="input"
				/>
			</div>
		</div>
	</div>
</template>
