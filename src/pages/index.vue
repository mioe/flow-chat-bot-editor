<script setup lang="ts">
import { ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { useDraggableWithBounding } from '../utils/useDrag'

const parent = ref<HTMLElement | null>(null)
const el = ref<HTMLElement | null>(null)

const boundingBox = useElementBounding(parent)

useDraggableWithBounding(el, { boundingBox })
</script>

<template>
	<div
		ref="parent"
		class="relative flex-1 w-full w-full"
	>
		<div
			ref="el"
			style="position: absolute"
		>
			ddd
		</div>
	</div>
</template>
