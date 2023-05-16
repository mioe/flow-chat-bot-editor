<script lang="ts">
import { defineComponent } from 'vue'
import type { IdleInterface } from './IdleInterface'

export default defineComponent({
	props: {
		intf: {
			type: Object as () => IdleInterface,
			required: true,
		},
	},
})
</script>

<template>
	<span class="align-middle">
		Нет ответа
		<button
			class="c-$additional-blue"
			style="font: inherit;"
		>
			X минут
		</button>
	</span>
</template>
