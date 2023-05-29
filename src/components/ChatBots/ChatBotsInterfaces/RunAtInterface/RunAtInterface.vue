<script setup lang="ts">
import type { RunAtInterface } from './RunAtInterface'
import { gtmTimeZones } from '~/components/ChatBots/ChatBotsInterfaces/_helpers/delayHelpers'

const props = defineProps<{
	intf: RunAtInterface
}>()


</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div>
		<div class="flex justify-between">
			<PInput
				v-model="intf.value"
				text-size="medium"
				size="medium"
				type="time"
				placeholder="00:00"
				class="max-w-[140px]"
			/>

			<PSelect
				v-model="intf.value"
				text-size="medium"
				size="medium"
				class="w-[140px]"
				placeholder="+3 GTM"
				autocomplete
				hide-empty-menu
				:options="gtmTimeZones"
			/>
		</div>
	</div>
</template>
