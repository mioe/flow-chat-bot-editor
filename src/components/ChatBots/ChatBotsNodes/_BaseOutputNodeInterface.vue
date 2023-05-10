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

		const showComponent = computed<boolean>(
			() => props.intf.component && props.intf.connectionCount === 0 && (props.intf.isInput || !props.intf.port),
		)

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

		const FAKE_LINE_WITH_SCALE = computed(() => {
			// @ts-ignore
			const s = viewModel.value.displayedGraph.scaling
			return 2 / s
		})

		onMounted(onRender)
		onUpdated(onRender)

		return { el, isConnected, showComponent, classes, startHover, endHover, FAKE_LINE_WITH_SCALE }
	},
})
</script>

<template>
	<div
		:id="intf.id"
		ref="el"
		class="baklava-node-interface"
		:class="classes"
	>
		<div
			v-if="intf.port"
			class="__port"
			@pointerover="startHover"
			@pointerout="endHover"
		/>
		<!-- <svg
				width="100%"
				height="100%"
				class="absolute left-0 top-[50%] transform -translate-y-[50%] h-[100%] w-[26px] bg-transparent"
			>
				<line
					x1="0"
					y1="50%"
					x2="100%"
					y2="50%"
					stroke="black"
					:stroke-width="FAKE_LINE_WITH_SCALE"
				/>
			</svg>
		</div> -->
		<!-- eslint-disable vue/no-mutating-props -->
		<component
			:is="intf.component"
			v-if="showComponent"
			v-model="intf.value"
			:node="node"
			:intf="intf"
		/>
		<!-- eslint-enable vue/no-mutating-props -->
		<span
			v-else
			class="align-middle"
		>
			{{ intf.name }}
		</span>
	</div>
</template>
