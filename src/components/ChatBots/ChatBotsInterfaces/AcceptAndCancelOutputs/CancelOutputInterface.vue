<script setup lang="ts">
import type { CancelOutputInterface } from './AcceptOutputInterface'

defineProps<{
	intf: CancelOutputInterface 
}>()
</script>

<template>
	<div 
		class="flex items-center border-1 h-[40px] text-[#E46060] border-solid border-[#D0DBE4] pl-[16px] rounded-bl-[8px] rounded-br-[8px] font-normal border-t-none"
	>
		{{ intf.name }}
	</div>
</template>
