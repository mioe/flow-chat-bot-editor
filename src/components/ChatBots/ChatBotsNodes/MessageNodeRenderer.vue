<script setup lang="ts">
import { ref, computed } from 'vue'
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

const showLimitAnswers = ref(true)

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
						v-if="otherOutputs.length >= 4 && showLimitAnswers"
						class="mb-[16px]"
					>
						<PAlert
							v-model="showLimitAnswers"
							show-cross
							color="warning"
						>
							<span class="text-size-[14px]">Четыре и более кнопок свернутся в меню</span>
						</PAlert>
					</div>
					<div
						v-if="otherOutputs.length"
						class="chat-bots-nodes--stack-field"
						:class="{
							'mb-[12px]': otherOutputs.length < 11
						}"
					>
						<OutputNodeInterface
							v-for="output in otherOutputs"
							:key="output.id"
							:node="node"
							:intf="output"
							class="chat-bots-nodes--stack-field--item"
						/>
					</div>
					<template v-if="otherOutputs.length < 11">
						<OutputNodeInterface
							v-for="output in centerOutputs"
							:key="output.id"
							:node="node"
							:intf="output"
						/>
					</template>
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

<style>
.chat-bots-nodes--stack-field .chat-bots-nodes--stack-field--item .control {
	border-radius: 0 !important;
}

.chat-bots-nodes--stack-field .chat-bots-nodes--stack-field--item:first-of-type .control {
	border-top-left-radius: 8px !important;
	border-top-right-radius: 8px !important;
}

.chat-bots-nodes--stack-field .chat-bots-nodes--stack-field--item:last-of-type .control {
	border-bottom-left-radius: 8px !important;
	border-bottom-right-radius: 8px !important;
}

.chat-bots-nodes--stack-field .chat-bots-nodes--stack-field--item .active .control {
	position: relative;
	z-index: 1;
}

.chat-bots-nodes--stack-field--item + .chat-bots-nodes--stack-field--item {
	margin-top: -1px;
}
</style>
