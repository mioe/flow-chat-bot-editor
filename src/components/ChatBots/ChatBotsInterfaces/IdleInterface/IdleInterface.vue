<script setup lang="ts">
import { ref } from 'vue'
import type { IdleInterface } from './IdleInterface'

const props = defineProps<{
	intf: IdleInterface
}>()

const isOpenDropdown = ref(false)
const hours = ref(0)
const minutes = ref(0)

const isNumber = (ev: KeyboardEvent) => {
	const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
	const keyPressed: string = ev.key

	if (!keysAllowed.includes(keyPressed)) {
		ev.preventDefault()
	}
}

const getHoursAndMinutes = (minutes: number | null) => {
	if (!minutes) return { h: 0, m: 0 }
	const h = Math.floor(minutes / 60)
	return {
		h,
		m: minutes % (h * 60),
	}
}

const handleBlurMinutes = () => {
	const { h, m } = getHoursAndMinutes(minutes.value)
	hours.value = hours.value + h
	minutes.value = m
}

const handleCancel = () => {
	const { h, m } = getHoursAndMinutes(props.intf.value)
	hours.value = h
	minutes.value = m
	isOpenDropdown.value = false
}

const handleSubmit = () => {
	// eslint-disable-next-line vue/no-mutating-props
	props.intf.value = hours.value * 60 + minutes.value
	isOpenDropdown.value = false
}
</script>

<template>
	<span class="align-middle flex gap-[4px] justify-end">
		Нет ответа
		<div class="relative">
			<PDropdown
				v-model="isOpenDropdown"
				:close-on-self-click="false"
				:width="328"
				placement="center"
			>
				<template #activator="{ setReference, click }">
					<button
						:ref="setReference"
						class="c-$additional-blue"
						style="font: inherit;"
						@click="click"
					>
						{{ intf.value || 'X' }} минут
					</button>
				</template>
				<template #default>
					<div
						class="relative flex flex-col gap-[12px] text-left c-$common-black"
						style="font: inherit;"
					>
						<header>
							Если нет ответа
						</header>
						<div class="grid grid-cols-2 gap-[16px]">
							<div class="w-full flex items-center gap-[12px]">
								<PInput
									v-model.number="hours"
									text-size="medium"
									size="medium"
									type="number"
									@keypress="isNumber($event)"
								/>
								<span class="font-400 text-[16px]">
									часов
								</span>
							</div>
							<div class="w-full flex items-center gap-[12px]">
								<PInput
									v-model.number="minutes"
									text-size="medium"
									size="medium"
									type="number"
									@blur="handleBlurMinutes"
									@keypress="isNumber($event)"
								/>
								<span class="font-400 text-[16px]">
									минут
								</span>
							</div>
						</div>
						<footer class="grid grid-cols-2 gap-[16px]">
							<PButton
								variant="default"
								color="secondary"
								size="small"
								type="button"
								class="w-full"
								@click="handleCancel"
							>
								Отменить
							</PButton>
							<PButton
								variant="default"
								color="primary"
								size="small"
								type="button"
								class="w-full"
								@click="handleSubmit"
							>
								Сохранить
							</PButton>
						</footer>
					</div>
				</template>
			</PDropdown>
		</div>
	</span>
</template>
