<script setup lang="ts">
import { SelectInterface } from 'baklavajs'

defineProps<{
	intf: SelectInterface
}>()
</script>

<template>
	<PSelect
		v-model="intf.value"
		text-size="medium"
		size="medium"
		:placeholder="intf.placeholder"
		autocomplete
		hide-empty-menu
		:disabled="intf.disabled"
		:options="intf.options"
	/>
</template>