<script setup lang="ts">
// @ts-ignore
import ChatMIcon from '~/assets/icons/chat-m.svg?component'
// @ts-ignore
import AttachmentMIcon from '~/assets/icons/attachment-m.svg?component'
// @ts-ignore
import NotesLIcon from '~/assets/icons/notes-l.svg?component'
// @ts-ignore
import TimeMIcon from '~/assets/icons/time-m.svg?component'
// @ts-ignore
import ConditionIcon from '~/assets/icons/condition.svg?component'
// @ts-ignore
import ZapIcon from '~/assets/icons/zap.svg?component'

defineProps<{
	type: string
	title?: string
}>()
</script>

<template>
	<div class="min-w-[32px] min-h-[32px] p-[7px] bg-white flex gap-[8px] items-center justify-center cursor-pointer rounded-[8px] border border-solid border-$common-rain">
		<ChatMIcon
			v-if="type === 'MessageNode'"
			class="c-$additional-blue w-[16px] h-[16px]"
		/>
		<AttachmentMIcon
			v-if="type === 'InputNode'"
			class="c-$additional-blue w-[16px] h-[16px]"
		/>
		<NotesLIcon
			v-if="type === 'TemplateWabaNode'"
			class="c-$additional-green w-[16px] h-[16px]"
		/>
		<TimeMIcon
			v-if="type === 'IdleNode'"
			class="c-$additional-pink w-[16px] h-[16px]"
		/>
		<ConditionIcon
			v-if="type === 'IfNode'"
			class="c-$additional-orange w-[16px] h-[16px]"
		/>
		<ZapIcon
			v-if="type === 'ActionNode'"
			class="c-$additional-purple w-[16px] h-[16px]"
		/>
		<div
			v-if="title"
			class="text-size-[16px]"
		>
			{{ title }}
		</div>
	</div>
</template>
