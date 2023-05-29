<script setup lang="ts">
import type { AcceptOutputInterface } from './AcceptOutputInterface'

defineProps<{
	intf: AcceptOutputInterface
}>()

</script>

<template>
	<div 
		class="flex items-center border-1 h-[40px] text-[#51B77A] border-solid border-[#D0DBE4] pl-[16px] rounded-tl-[8px] rounded-tr-[8px] font-normal"
	>
		{{ intf.name }}
	</div>
</template>
