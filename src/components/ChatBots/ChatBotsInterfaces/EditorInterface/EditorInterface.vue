<script lang="ts">
import { defineComponent } from 'vue'
import type { EditorInterface } from './EditorInterface'

export default defineComponent({
	props: {
		intf: {
			type: Object as () => EditorInterface,
			required: true,
		},
	},
})
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div class="flex flex-col gap-[4px] w-full">
		<PTextarea
			v-model="intf.value"
			:placeholder="intf.placeholder"
			:rows="3"
			max-height="auto"
			auto-grow
		/>
		<footer class="flex justify-between w-full c-$common-asphalt">
			<div class="flex gap-[8px] py-[5px]">
				<button class="w-[24px] h-[24px] flex-shrink-0 flex items-center justify-center cursor-pointer">
					<IconFilledTextStyleBoldMd class="w-[20px] h-[20px]" />
				</button>
				<button class="w-[24px] h-[24px] flex-shrink-0 flex items-center justify-center cursor-pointer">
					<IconFilledTextStyleItalicMd class="w-[20px] h-[20px]" />
				</button>
				<button class="w-[24px] h-[24px] flex-shrink-0 flex items-center justify-center cursor-pointer">
					<IconFilledTextStyleStrikethroughMd class="w-[20px] h-[20px]" />
				</button>
			</div>
			<div class="flex gap-[8px] py-[5px]">
				<button class="w-[24px] h-[24px] flex-shrink-0 flex items-center justify-center cursor-pointer">
					<IconParametrMd class="w-[20px] h-[20px]" />
				</button>
				<button class="w-[24px] h-[24px] flex-shrink-0 flex items-center justify-center cursor-pointer">
					<IconSmileMd class="w-[20px] h-[20px]" />
				</button>
			</div>
		</footer>
	</div>
</template>
