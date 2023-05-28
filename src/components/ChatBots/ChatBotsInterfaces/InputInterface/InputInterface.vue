<script lang="ts">
import { defineComponent } from 'vue'
import type { InputInterface } from './InputInterface'

export default defineComponent({
	props: {
		intf: {
			type: Object as () => InputInterface,
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

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<PInput
		v-model="intf.value"
		:placeholder="intf.placeholder"
		text-size="medium"
		size="medium"
	>
		<template v-if="intf.icon" #right>
			<button
				class="w-[20px] h-[20px] cursor-pointer relative z-1 c-$common-asphalt"
				@click="onClick"
			>
				<IconTrashMd class="w-[20px] h-[20px]" />
			</button>
		</template>
	</PInput>
</template>
