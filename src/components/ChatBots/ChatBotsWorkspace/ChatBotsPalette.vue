<template>
	<div class="absolute flex gap-[8px] left-[32px] bottom-[32px]">
		<ChatBotsPaletteItem
			v-for="node in nodes"
			:key="node[0]"
			:type="node[0]"
			@pointerdown="onDragStart(node[0], node[1])"
		/>
	</div>
	<transition name="fade">
		<div
			v-if="draggedNode"
			class="baklava-dragged-node"
			:style="draggedNodeStyles"
		>
			<ChatBotsPaletteItem
				:type="draggedNode.type"
				:title="draggedNode.nodeInformation.title"
			/>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { computed, CSSProperties, inject, Ref, ref, reactive } from 'vue'
import { usePointer } from '@vueuse/core'
import { AbstractNode, INodeTypeInformation } from '@baklavajs/core'
import { useViewModel, useTransform } from 'baklavajs'

import ChatBotsPaletteItem from './ChatBotsPaletteItem.vue'

type NodeTypeInformations = Record<string, INodeTypeInformation>;

interface IDraggedNode {
	type: string;
	nodeInformation: INodeTypeInformation;
}

const { viewModel } = useViewModel()
const { x: mouseX, y: mouseY } = usePointer()
const { transform } = useTransform()

const editorEl = inject<Ref<HTMLElement | null>>('editorEl')

const draggedNode = ref<IDraggedNode | null>(null)

const draggedNodeStyles = computed<CSSProperties>(() => {
	if (!draggedNode.value || !editorEl?.value) {
		return {}
	}
	const { left, top } = editorEl.value.getBoundingClientRect()
	return {
		top: `${mouseY.value - top}px`,
		left: `${mouseX.value - left}px`,
	}
})

const validNodesTypes = ['ActionNode', 'IdleNode', 'IfNode', 'MessageNode', 'InputNode', 'RedirectNode', 'TemplateWabaNode']
const nodeTypeEntries = Array.from(viewModel.value.editor.nodeTypes.entries())
const nodes = nodeTypeEntries.filter(([type, _]) => validNodesTypes.includes(type))

const onDragStart = (type: string, nodeInformation: INodeTypeInformation) => {
	draggedNode.value = {
		type,
		nodeInformation,
	}

	const onDragEnd = () => {
		const instance = reactive(new nodeInformation.type()) as AbstractNode
		viewModel.value.displayedGraph.addNode(instance)

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const rect = editorEl!.value!.getBoundingClientRect()
		const [x, y] = transform(mouseX.value - rect.left, mouseY.value - rect.top)
		// @ts-ignore
		instance.position.x = x
		// @ts-ignore
		instance.position.y = y

		draggedNode.value = null
		document.removeEventListener('pointerup', onDragEnd)
	}
	document.addEventListener('pointerup', onDragEnd)
}

</script>
