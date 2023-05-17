<script setup lang="ts">
import { ref } from 'vue'
import type { IdleInterface } from './IdleInterface'

defineProps<{
	intf: IdleInterface
}>()

const isOpenDropdown = ref(false)
const hours = ref(0)
const minutes = ref(0)
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
						X минут
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
									v-model="hours"
									text-size="medium"
									size="medium"
									type="number"
								/>
								<span class="font-400 text-[16px]">
									часов
								</span>
							</div>
							<div class="w-full flex items-center gap-[12px]">
								<PInput
									v-model="minutes"
									text-size="medium"
									size="medium"
									type="number"
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
							>
								Отменить
							</PButton>
							<PButton
								variant="default"
								color="primary"
								size="small"
								type="button"
								class="w-full"
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
