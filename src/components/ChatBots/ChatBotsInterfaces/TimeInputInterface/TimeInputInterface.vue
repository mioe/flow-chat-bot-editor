<script setup lang="ts">
import { TimeInputInterface } from './TimeInputInterface'

defineProps<{
	intf: TimeInputInterface
}>()
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<PInput
		v-model="intf.value"
		text-size="medium"
		size="medium"
		type="time"
		placeholder="00:00"
		class="max-w-[140px]"
	/>
</template>
