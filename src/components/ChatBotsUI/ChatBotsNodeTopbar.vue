<script setup lang="ts">
const props = defineProps({
	type: {
		type: String,
		default: null,
	},
	idx: {
		type: Number,
		default: 0,
	},
})

const COLORS = new Map()
COLORS.set('StartNode', 'ps-palegreen-topbar')
COLORS.set('ActionNode', 'ps-palepurple-topbar')
COLORS.set('IdleNode', 'ps-palepink-topbar')
COLORS.set('IfNode', 'ps-paleorange-topbar')
COLORS.set('MessageNode', 'ps-paleblue-topbar')
COLORS.set('InputNode', 'ps-paleblue-topbar')
COLORS.set('RedirectNode', 'ps-smog-topbar')
COLORS.set('TemplateWabaNode', 'ps-palegreen-topbar')

const getColorWithType = () => {
	return COLORS.has(props.type)
		? COLORS.get(props.type)
		: 'ps-default-topbar'
}
</script>

<template>
	<header
		class="ps-chat-bots-node-topbar"
		:class="getColorWithType()"
	>
		<slot />
		<div>
			COPY
		</div>
		<div>
			DELETER
		</div>
	</header>
</template>

<style>
.ps-chat-bots-node-topbar {
	display: flex;
	/* background: var(--baklava-node-title-color-background); */
	font-weight: 600;
	/* color: var(--baklava-node-title-color-foreground); */
	padding: 12px 16px;
	border-radius: var(--baklava-node-border-radius) var(--baklava-node-border-radius) 0 0;
	cursor: grab;
}

.baklava-node.--dragging .ps-chat-bots-node-topbar {
	cursor: grabbing;
}
</style>
