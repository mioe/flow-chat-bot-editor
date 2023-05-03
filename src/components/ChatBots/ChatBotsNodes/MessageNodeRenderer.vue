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

const message = computed({
	get() {
		return props.node.entity.text
	},
	set(val) {
		// eslint-disable-next-line vue/no-mutating-props
		props.node.entity.text = val
	},
})

const enabledAnswerButtons = computed({
	get() {
		return props.node.entity.enabledAnswerButtons
	},
	set(val) {
		// eslint-disable-next-line vue/no-mutating-props
		props.node.entity.enabledAnswerButtons = val
	},
})

const displayedOutputs: ComputedRef<any>  = computed(() => Object.values(props.node.outputs).filter((ni: any) => !ni.hidden))

const outputsEnabledViaFlag = computed(
	() => Object.entries(props.node.outputs)
		.filter(([nt, _]) => enabledAnswerButtons.value
			? nt !== 'nextStep'
			: nt === 'nextStep')
		.map(([_, ni]) => ni),
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
		<div class="flex flex-col gap-[8px]">
			<textarea v-model="message" />

			<label class="flex items-center">
				<input
					v-model="enabledAnswerButtons"
					type="checkbox"
				>
				<p>Кнопки-ответы</p>
			</label>
		</div>

		<template #outputs>
			<OutputNodeInterface
				v-for="output in outputsEnabledViaFlag"
				:key="output.id"
				:node="node"
				:intf="output"
			/>
		</template>
	</BaseNode>
</template>
