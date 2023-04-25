<script setup lang="ts">
import BaseNode from './_BaseNode.vue'
import { AbstractNode } from '@baklavajs/core'

withDefaults(
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
</script>

<template>
	<BaseNode
		:node="node"
		:selected="selected"
		@select="emit('select')"
	>
		<template #title>
			07 TITLE
		</template>
	</BaseNode>
</template>
