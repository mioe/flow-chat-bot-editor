<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

// @ts-ignore
import CircleArrowUndoIcon from '~/assets/icons/circle-arrow-undo.svg?component'
// @ts-ignore
import CircleArrowRedoIcon from '~/assets/icons/circle-arrow-redo.svg?component'
// @ts-ignore
import MinusIcon from '~/assets/icons/minus.svg?component'
// @ts-ignore
import PlusIcon from '~/assets/icons/plus.svg?component'

const props = defineProps({
	scale: {
		type: Number,
		default: 1,
	},
	step: {
		type: Number,
		default: 0.1,
	},
	min: {
		type: Number,
		default: 0.1,
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
		<!-- <button
			class="w-[32px] h-[32px] bg-white flex items-center justify-center cursor-pointer rounded-[8px] border border-solid border-$common-rain"
		>
			<CircleArrowUndoIcon class="w-[16px] h-[16px]" />
		</button>
		<button
			class="w-[32px] h-[32px] bg-white flex items-center justify-center cursor-pointer rounded-[8px] border border-solid border-$common-rain"
		>
			<CircleArrowRedoIcon class="w-[16px] h-[16px]" />
		</button> -->
		<div class="flex gap-[4px] items-center bg-white rounded-[8px] border border-solid border-$common-rain">
			<button
				class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer border-0 bg-transparent"
				@click="handleZoomDown"
			>
				<MinusIcon class="w-[16px] h-[16px]" />
			</button>
			<span class="text-size-[16px]">{{ zoomPercent }}%</span>
			<button
				class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer border-0 bg-transparent"
				@click="handleZoomUp"
			>
				<PlusIcon class="w-[16px] h-[16px]" />
			</button>
		</div>
	</footer>
</template>
