<template>
	<PButton
		:variant="intf.options?.variant"
		:size="intf.options?.size"
		:color="intf.options?.color"
		:disabled="intf.options?.disabled"
		:nuxt="intf.options?.nuxt"
		:type="intf.options?.type"
		class="w-full"
		@click="onClick"
	>
		<template
			v-if="intf.icon"
			#left
		>
			<component :is="intf.icon" />
		</template>
		{{ intf.name }}
	</PButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ButtonInterface } from './ButtonInterface'

export default defineComponent({
	props: {
		intf: {
			type: Object as () => ButtonInterface,
			required: true,
		},
	},
	setup(props) {
		const onClick = () => {
			if (props.intf.callback) {
				props.intf.callback()
			}
		}

		return { onClick }
	},
})
</script>
