<script setup lang="ts">
import { computed  } from 'vue'
import type { ChipsInterface } from './ChipsInterface'
import { days } from '../helpers/conditionHelpers'

const props = defineProps<{
	intf: ChipsInterface
}>()

const activeDays = computed(() => props.intf.value.join(', ').toLowerCase())

const weekendDays = computed(() => days.filter((item: any) => !props.intf.value.includes(item)).join(', ').toLowerCase())
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div>
		<PChips
			v-model="intf.value"
			class="my-[16px] h-[36px]"
			style="gap: 8px;"
			:chips="intf.chips"
			:multiple="true"
		/>

		<div class="font-semibold text-[15px] mb-[16px]">
			Рабочие дни: <span class="font-normal text-[#5D7285]">{{ activeDays }}</span>
		</div>

		<div class="h-[128px]" />
		
		<div class="font-semibold text-[15px] mb-[16px]">
			Выходные дни: <span class="font-normal text-[#5D7285]">{{ weekendDays }}</span>
		</div>

		<div class="h-[128px]" />
	</div>
</template>