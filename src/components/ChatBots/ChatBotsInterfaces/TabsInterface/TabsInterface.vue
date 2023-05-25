<script setup lang="ts">
import type { TabsInterface } from './TabsInterface'

defineProps<{
	intf: TabsInterface
}>()
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div class="chat-bots--tab-interface">
		<PTabs
			v-model="intf.value"
			:tabs="intf.tabs"
		/>
	</div>
</template>

<style>
.chat-bots--tab-interface {
	display: flex;
	flex-direction: column;
}

.chat-bots--tab-interface .title-text {
	font-size: 14px;
}

.chat-bots--tab-interface .p-tab {
	padding-left: 0 !important;
	padding-right: 0 !important;
}
</style>
