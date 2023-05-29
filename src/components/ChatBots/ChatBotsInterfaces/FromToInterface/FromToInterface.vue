<script setup lang="ts">
import { FromToInterface } from './FromToInterface'
import { ref, onBeforeMount, watch } from 'vue'

const props = defineProps<{
	intf: FromToInterface
}>()

const from = ref('')
const to = ref('')

const handleInput = () => {
	// eslint-disable-next-line vue/no-mutating-props
	props.intf.value = `${from.value}-${to.value}`
}

watch(from, handleInput)
watch(to, handleInput)

onBeforeMount(() => {
	const [f, t] = props.intf.value.split('-')
	from.value = f
	to.value = t
})

const designColor = props.intf.active ? '#000000' : '#D0DBE4'
</script>

<template>
	<div class="w-[286px]">
		<div class="flex items-center rounded-[8px] h-[56px] bg-[#F1F5F9] relative text-[#2B3238] mb-[16px]">
			<div
				class="h-[100%] w-[7px] absolute rounded-tl-[8px] rounded-bl-[8px]"
				:style="{ background: designColor }"
			/>
		
			<div class="ml-[15px] mr-[8px]">
				C
			</div>

			<PInput
				v-model="from"
				text-size="medium"
				size="medium"
				type="time"
				placeholder="XX:XX"
				class="max-w-[90px]"
				:disabled="intf.disabled"
			/>


			<div class="ml-[12px] mr-[8px]">
				До
			</div>

			<PInput
				v-model="to"
				text-size="medium"
				size="medium"
				type="time"
				placeholder="XX:XX"
				class="max-w-[90px]"
				:disabled="intf.disabled"
			/>
		</div>
	</div>
</template>
