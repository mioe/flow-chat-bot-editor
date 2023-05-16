<script lang="ts">
import { defineComponent } from 'vue'
import type { SimpleInterface } from './SimpleInterface'

export default defineComponent({
	props: {
		intf: {
			type: Object as () => SimpleInterface,
			required: true,
		},
	},
})
</script>

<template>
	<span class="align-middle">
		{{ intf.name }}
	</span>
</template>
