<script lang="ts">
import { defineComponent } from 'vue'
import type { SwitchInterface } from './SwitchInterface'

export default defineComponent({
	props: {
		intf: {
			type: Object as () => SwitchInterface,
			required: true,
		},
	},
})
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<PSwitch
		v-model="intf.value"
		:label="intf.name"
	/>
</template>
