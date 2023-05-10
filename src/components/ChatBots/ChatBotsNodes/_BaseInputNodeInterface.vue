<script lang="ts">
import { computed, defineComponent, inject, onMounted, onUpdated, Ref, ref } from 'vue'
import { AbstractNode, NodeInterface } from '@baklavajs/core'
import { useViewModel } from '~/components/ChatBots/utility'

export default defineComponent({
	props: {
		node: {
			type: Object as () => AbstractNode,
			required: true,
		},
		intf: {
			type: Object as () => NodeInterface,
			required: true,
		},
	},
	setup(props) {
		const { viewModel } = useViewModel()
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const hoveredOver = inject<(intf: NodeInterface | undefined) => void>('hoveredOver')!

		const el = ref<HTMLElement | null>(null) as Ref<HTMLElement>

		const isConnected = computed(() => props.intf.connectionCount > 0)
		const classes = computed(() => ({
			'--input': props.intf.isInput,
			'--output': !props.intf.isInput,
			'--connected': isConnected.value,
		}))

		const startHover = () => {
			hoveredOver(props.intf)
		}
		const endHover = () => {
			hoveredOver(undefined)
		}

		const onRender = () => {
			if (el.value) {
				viewModel.value.hooks.renderInterface.execute({ intf: props.intf, el: el.value })
			}
		}

		onMounted(onRender)
		onUpdated(onRender)

		return { el, isConnected, classes, startHover, endHover }
	},
})
</script>

<template>
	<div
		:id="intf.id"
		ref="el"
		class="baklava-input-node-interface"
		:class="classes"
	>
		<div
			v-if="intf.port"
			class="__port"
			@pointerover="startHover"
			@pointerout="endHover"
		/>
	</div>
</template>

<style>
.baklava-input-node-interface {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 100%;
	background-color: transparent;
	border-radius: var(--baklava-node-border-radius);
}

.baklava-input-node-interface > .__port {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
