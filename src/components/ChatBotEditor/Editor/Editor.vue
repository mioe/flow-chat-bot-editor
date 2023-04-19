<script setup lang="ts">
import { ref, provide } from 'vue'

const el = ref<HTMLElement | null>(null)
provide('editorEl', el)
</script>

<template>
	<div
		ref="el"
		tabindex="-1"
		class="ps-chat-bot-editor"
	>
		chat bot editor
	</div>
</template>

<style>
.ps-chat-bot-editor {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	outline: none !important;
	font-size: 15px;
	touch-action: none;
}

.ps-chat-bot-editor *,
.ps-chat-bot-editor *::after,
.ps-chat-bot-editor *::before {
	box-sizing: border-box;
}
</style>
