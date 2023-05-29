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
			<div class="flex flex-col gap-[16px] text-left w-full text-[#2B3238]">
				<OutputNodeInterface
					v-for="output in topOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/>

				<div>
					<template v-if="centerOutputs.length === 1">
						<OutputNodeInterface
							v-for="output in centerOutputs"
							:key="output.id"
							:node="node"
							:intf="output"
						/>
					</template>
					<template v-else>
						<div
							class="mb-12px font-semibold"
						>
							{{ centerOutputs[0].name }}
						</div>
						<div class="flex justify-between">
							<div
								v-for="output in centerOutputs"
								:key="output.id"
								class="w-[140px]"
							>
								<OutputNodeInterface
									:node="node"
									:intf="output"
								/>
							</div>
						</div>
					</template>
				</div>

				<OutputNodeInterface
					v-for="output in bottomOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/>
			</div>
		</template>
	</BaseNode>
</template>
