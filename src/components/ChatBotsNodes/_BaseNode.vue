<script setup lang="ts">
import { ref, computed, toRef, onUpdated, onMounted } from 'vue'
import { AbstractNode } from '@baklavajs/core'
import { useDragMove, useGraph, useViewModel } from 'baklavajs'

const props = withDefaults(
	defineProps<{
		node: AbstractNode;
		selected?: boolean;
	}>(),
	{
		selected: false,
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
				<slot name="title" />
			</div>
			<div class="__menu">
				<button @click="onRemoveNode">
					D
				</button>
			</div>
		</div>

		<div class="__content">
			<!-- Outputs -->
			<div class="__outputs">
				<!-- <NodeInterface
					v-for="output in displayedOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/> -->
			</div>

			<!-- Inputs -->
			<div class="__inputs">
				<!-- <NodeInterface
					v-for="input in displayedInputs"
					:key="input.id"
					:node="node"
					:intf="input"
				/> -->
			</div>
		</div>
	</div>
</template>
