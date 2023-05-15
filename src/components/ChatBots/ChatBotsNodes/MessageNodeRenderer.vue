<script setup lang="ts">
import { computed } from 'vue'
import { AbstractNode } from '@baklavajs/core'
import BaseNode from '~/components/ChatBots/ChatBotsNodes/_BaseNode.vue'
import OutputNodeInterface from '~/components/ChatBots/ChatBotsNodes/_BaseOutputNodeInterface.vue'

const props = withDefaults(
	defineProps<{
		node: AbstractNode;
		selected?: boolean;
	}>(),
	{
		selected: false,
	},
)

const displayedOutputs = computed(() => Object.values(props.node.outputs).filter((ni) => !ni.hidden))

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
		<template #outputs>
			<div class="flex flex-col gap-[24px]">
				<OutputNodeInterface
					v-for="output in displayedOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/>
			</div>
		</template>
	</BaseNode>
</template>
