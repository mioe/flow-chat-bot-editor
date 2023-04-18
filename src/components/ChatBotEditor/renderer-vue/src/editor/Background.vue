<script setup lang="ts">
import { ref, provide } from 'vue'

const el = ref<HTMLElement | null>(null)
provide('editorEl', el)

console.log('render Editor')
</script>

<template>
	<div
		ref="el"
	>
		editor
	</div>
</template>
