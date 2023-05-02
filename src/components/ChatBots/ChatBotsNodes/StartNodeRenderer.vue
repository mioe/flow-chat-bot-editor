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
		hide-action-buttons
		@select="emit('select')"
	/>
</template>
