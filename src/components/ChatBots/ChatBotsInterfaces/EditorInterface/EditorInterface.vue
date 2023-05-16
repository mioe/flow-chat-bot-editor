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
	<div class="flex flex-col w-full">
		<PTextarea
			v-model="intf.value"
			:placeholder="intf.placeholder"
			:rows="3"
			max-height="auto"
			auto-grow
		/>
		<footer class="flex justify-between w-full">
			<div>
				1
			</div>
			<div>
				2
			</div>
		</footer>
	</div>
</template>
