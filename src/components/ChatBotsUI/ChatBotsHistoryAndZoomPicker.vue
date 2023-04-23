<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
	scale: {
		type: Number,
		default: 1,
	},
	step: {
		type: Number,
		default: 0.25,
	},
	min: {
		type: Number,
		default: 0.25,
	},
	max: {
		type: Number,
		default: 3,
	},
})
const emit = defineEmits(['update:scale'])
const zoom = useVModel(props, 'scale', emit)

const onChangeZoom = (step: number) => {
	const nextZoom = zoom.value + step
	zoom.value = nextZoom >= props.max
		? props.max
		: nextZoom <= props.min
			? props.min
			: nextZoom
}

const handleZoomUp = () => {
	onChangeZoom(props.step)
}

const handleZoomDown = () => {
	onChangeZoom(props.step * -1)
}

const zoomPercent = computed(() => (zoom.value * 100).toFixed(0))
</script>

<template>
	<footer class="absolute flex gap-[8px] right-[32px] bottom-[32px]">
		<button
			class="w-[32px] h-[32px] bg-white flex items-center justify-center rounded-[8px] border border-solid border-$common-rain"
		>
			R
		</button>
		<button
			class="w-[32px] h-[32px] bg-white flex items-center justify-center rounded-[8px] border border-solid border-$common-rain"
		>
			U
		</button>
		<div class="flex gap-[4px] items-center bg-white rounded-[8px] border border-solid border-$common-rain">
			<button
				class="w-[32px] h-[32px] flex items-center justify-center border-0 bg-transparent"
				@click="handleZoomDown"
			>
				-
			</button>
			<span class="text-[16px]">{{ zoomPercent }}%</span>
			<button
				class="w-[32px] h-[32px] flex items-center justify-center border-0 bg-transparent"
				@click="handleZoomUp"
			>
				+
			</button>
		</div>
	</footer>
</template>
