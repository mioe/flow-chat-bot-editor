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
const POSITIONS = ['top', 'center', 'bottom', 'special']
const topOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[0]))
const centerOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[1]))
const isTitle = computed(() => Boolean(centerOutputs.value.find(item => item.name === 'Формат')))
const bottomOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[2]))
const specialOutputs = computed(() => displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[3]))


const emit = defineEmits<{
	(e: 'select'): void;
}>()
</script>

<template>
	<BaseNode
		:node="node"
		:selected="selected"
		class="relative"
		@select="emit('select')"
	>
		<template #outputs>
			<OutputNodeInterface
				v-for="output in topOutputs"
				:key="output.id"
				:node="node"
				:intf="output"
			/>

			<div
				v-if="isTitle"
				class="mt-[16px] font-semibold"
			>
				Проверка формата
			</div>
			
			<div :class="isTitle ? 'mt-[12px] mb-[16px]' : 'my-[16px]' ">
				<div
					v-for="output in centerOutputs"
					:key="output.id"
				>
					<OutputNodeInterface
						:node="node"
						:intf="output"
					/>
				</div>
			</div>

			<OutputNodeInterface
				v-for="output in bottomOutputs"
				:key="output.id"
				:node="node"
				:intf="output"
			/>


			<OutputNodeInterface
				v-for="(output, idx) in specialOutputs"
				:key="output.id"
				:node="node"
				:intf="output"
				:class="`output-${idx + 1}`"
			/>
		</template>
	</BaseNode>
</template>

<style scoped>
.output-1,
.output-2,
.output-3,
.output-4 {
	position: absolute;
}

.output-1 {
	top: 252px;
}

.output-2 {
	top: 322px;
}

.output-3 {
	top: 420px;
}

.output-4 {
	top: 490px;
}
</style>
