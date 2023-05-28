<script setup lang="ts">
import type { DurationInterface } from './DurationInterface'
import { ref, onBeforeMount, watch } from 'vue'
import { getHoursAndMinutes, isNumber } from '../DelayInterface/helpers'

const props = defineProps<{
	intf: DurationInterface
}>()

const hours = ref(0)
const minutes = ref(0)

const handleBlurMinutes = () => {
	const { h, m } = getHoursAndMinutes(minutes.value)
	hours.value = hours.value + h
	minutes.value = m
}

const handleDurationInput = () => {
	// eslint-disable-next-line vue/no-mutating-props
	props.intf.value = hours.value * 60 + minutes.value
}

watch(hours, handleDurationInput)
watch(minutes, handleDurationInput)

onBeforeMount(() => {
	const { h, m } = getHoursAndMinutes(props.intf.value)
	hours.value = h
	minutes.value = m
})
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div v-if="!intf.hide">
		<div class="mb-12px font-semibold">
			Длительность
		</div>
      
		<div class="flex justify-between">
			<div class="flex items-center gap-[12px] font-normal w-[132px]">
				<PInput
					v-model.number="hours"
					text-size="medium"
					size="medium"
					type="number"
					placeholder="00"
					class="w-[64px]"
					@keypress="isNumber($event)"
				/>
				часов
			</div>

			<div class="flex items-center gap-[12px] font-normal w-[132px]">
				<PInput
					v-model.number="minutes"
					text-size="medium"
					size="medium"
					type="number"
					placeholder="15"
					class="w-[64px]"
					@blur="handleBlurMinutes"
					@keypress="isNumber($event)"
				/>
				минут
			</div>
		</div>
	</div>
</template>
