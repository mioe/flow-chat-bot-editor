<script setup lang="ts">
defineProps<{
	type: string
	title?: string
}>()
</script>

<template>
	<div class="min-w-[32px] min-h-[32px] p-[7px] bg-white flex gap-[8px] items-center justify-center cursor-pointer rounded-[8px] border border-solid border-$common-rain">
		<div
			v-if="type === 'MessageNode'"
			class="c-$additional-blue w-[16px] h-[16px] i-mi:chat-m"
		/>
		<div
			v-if="type === 'InputNode'"
			class="c-$additional-blue w-[16px] h-[16px] i-mi:attachment-m"
		/>
		<div
			v-if="type === 'TemplateWabaNode'"
			class="c-$additional-green w-[16px] h-[16px] i-mi:notes-l"
		/>
		<div
			v-if="type === 'IdleNode'"
			class="c-$additional-pink w-[16px] h-[16px] i-mi:time-m"
		/>
		<div
			v-if="type === 'IfNode'"
			class="c-$additional-orange w-[16px] h-[16px] i-mi:condition"
		/>
		<div
			v-if="type === 'ActionNode'"
			class="c-$additional-purple w-[16px] h-[16px] i-mi:zap"
		/>
		<div
			v-if="title"
			class="text-[16px]"
		>
			{{ title }}
		</div>
	</div>
</template>
