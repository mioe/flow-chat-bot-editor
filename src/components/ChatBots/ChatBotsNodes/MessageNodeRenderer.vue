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
const POSITIONS = ['top', 'center', 'bottom']
const topOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[0]))
const centerOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[1]))
const bottomOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[2]))
const otherOutputs =  computed(() => displayedOutputs.value.filter((ni: any) => !ni.position))

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
				<header class="flex flex-col gap-[24px]">
					<OutputNodeInterface
						v-for="output in topOutputs"
						:key="output.id"
						:node="node"
						:intf="output"
					/>
				</header>
				<div v-if="centerOutputs.length">
					<div
						v-if="otherOutputs.length"
						class="mb-[12px]"
					>
						<OutputNodeInterface
							v-for="output in otherOutputs"
							:key="output.id"
							:node="node"
							:intf="output"
						/>
					</div>
					<OutputNodeInterface
						v-for="output in centerOutputs"
						:key="output.id"
						:node="node"
						:intf="output"
					/>
				</div>
				<footer class="flex flex-col gap-[16px]">
					<OutputNodeInterface
						v-for="output in bottomOutputs"
						:key="output.id"
						:node="node"
						:intf="output"
					/>
				</footer>
			</div>
		</template>
	</BaseNode>
</template>
