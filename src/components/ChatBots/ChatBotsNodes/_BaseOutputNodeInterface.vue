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

		const showComponent = computed<boolean>(
			() => props.intf.component && !props.intf.isInput,
		)

		const classes = computed(() => {
			return showComponent.value && !props.intf.port
				? {}
				: {
					'--input': props.intf.isInput,
					'--output': !props.intf.isInput,
					'--connected': isConnected.value,
				}
		})

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

		return { el, isConnected, showComponent, classes, startHover, endHover }
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

		<button class="chat-bots-nodes--toggle-connection-menu">
			<IconAddMd class="w-[20px] h-[20px]" />
		</button>
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

<style>
.chat-bots-nodes--toggle-connection-menu {
	position: absolute;
	z-index: 1;
	top: 50%;
	right: -72px;
	transform: translateY(-50%);
	width: 36px;
	height: 36px;
	border-radius: 50%;
	overflow: hidden;
	border: 2px solid var(--common-dullSky);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: var(--common-dullSky);
	transition: transform .3s, opacity .3s;
}

.chat-bots-nodes--toggle-connection-menu:focus,
.chat-bots-nodes--toggle-connection-menu:focus-visible {
	transform: translateY(-50%) rotate(45deg);
}
</style>
