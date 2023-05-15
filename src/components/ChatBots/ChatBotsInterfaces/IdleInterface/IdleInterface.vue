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
	<p>SSDD</p>
</template>
