<script setup lang="ts">
import type { TabInterface } from './TabInterface'
import { typeOptions } from '../helpers/delayHelpers'

defineProps<{
	intf: TabInterface
}>()
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<PTabs
		v-model="intf.value"
		class="h-[36px] w-full"
		:tabs="typeOptions"
	/>
</template>
