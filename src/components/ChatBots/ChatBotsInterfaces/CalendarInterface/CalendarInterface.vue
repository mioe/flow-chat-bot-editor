<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CalendarInterface } from './CalendarInterface'

const props = defineProps<{
	intf: CalendarInterface
}>()

const getStringDate = (value) => {
	if (!value) {
		return ''
	}

	const obj = new Date(value)
	let yy = obj.getYear()
	let mm = obj.getMonth() + 1

	let dd = obj.getDate()

	if (yy < 2000) { yy += 1900 }
	if (mm < 10) { mm = '0' + mm }
	if (dd < 10) { dd = '0' + dd }

	return dd + '.' + mm + '.' + yy
}

const formattedDate = computed(() => getStringDate(props.intf.value))

const isOpenDropdown = ref(false)
</script>

<template>
	<div class="relative">
		<PDropdown
			v-model="isOpenDropdown"
			:close-on-self-click="false"
			:width="328"
			placement="center"
		>
			<template #activator="{ setReference, click }">
				<PInput
					:ref="setReference"
					v-model="formattedDate"
					size="medium"
					text-size="medium"
					placeholder="XX.XX.XXXX"
					@click="click"
				>
					<template #right>
						<IconCalendarLg class="text-[#91A0AE]" />
					</template>
				</PInput>
			</template>
			<template #default>
				<PCalendar
					v-model="intf.value"
					:min="intf.min"
					:format="'ISO'"
				/>
			</template>
		</PDropdown>
	</div>
</template>
