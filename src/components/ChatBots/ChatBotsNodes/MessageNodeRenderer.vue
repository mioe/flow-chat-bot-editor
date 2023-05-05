<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import BaseNode from './_BaseNode.vue'
import OutputNodeInterface from './_BaseOutputNodeInterface.vue'
import { AbstractNode } from '@baklavajs/core'

const props = withDefaults(
	defineProps<{
		node: AbstractNode | any;
		selected?: boolean;
	}>(),
	{
		selected: false,
	},
)

const displayedOutputs: ComputedRef<any>  = computed(() => Object.values(props.node.outputs).filter((ni: any) => !ni.hidden))

const emit = defineEmits<{
	(e: 'select'): void;
}>()
</script>

<template>
	<BaseNode
		:node="node"
		:selected="selected"
		@select="emit('select')"
	>
		<div class="flex flex-col gap-[8px]">
			<textarea />
		</div>
	</BaseNode>
</template>
