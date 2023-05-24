<script setup lang="ts">
import BaseNode from './_BaseNode.vue'
import { AbstractNode } from '@baklavajs/core'
import { computed, ref } from 'vue'
import OutputNodeInterface from '~/components/ChatBots/ChatBotsNodes/_BaseOutputNodeInterface.vue'
import { Actions } from '~/components/ChatBots/ChatBotsNodes'

const POSITIONS = ['top', 'bottom', 'center']

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

const showDBEditAlert = ref(true)

const displayedOutputs = computed(() =>
	Object.values(props.node.outputs).filter((ni) => !ni.hidden),
)
const topOutputs = computed(() =>
	displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[0]),
)
const bottomOutputs = computed(() =>
	displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[1]),
)
const centerOutputs = computed(() =>
	displayedOutputs.value.filter((ni: any) => ni.position === POSITIONS[2]),
)
const hasDBEditAlert = computed(
	() =>
		Object.values(props.node.outputs).find((ni) => ni.name === 'Селектор действия')
			?.value === Actions.editDB,
)
</script>

<template>
	<BaseNode
		:node="node"
		:selected="selected"
		@select="emit('select')"
	>
		<template #outputs>
			<header>
				<OutputNodeInterface
					v-for="output in topOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/>
			</header>

			<div
				v-if="hasDBEditAlert"
				class="my-4"
			>
				<PAlert
					v-model="showDBEditAlert"
					show-cross
					color="warning"
				>
					<span class="text-[14px]">Внимание! Вы можете потерять существующие данные. </span>
				</PAlert>
			</div>

			<div class="my-4">
				<OutputNodeInterface
					v-for="output in centerOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/>
			</div>

			<footer class="mb-4">
				<OutputNodeInterface
					v-for="output in bottomOutputs"
					:key="output.id"
					:node="node"
					:intf="output"
				/>
			</footer>
		</template>
	</BaseNode>
</template>
