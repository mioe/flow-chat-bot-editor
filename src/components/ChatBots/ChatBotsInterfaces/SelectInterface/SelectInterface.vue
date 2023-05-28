<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { SelectInterface } from './SelectInterface'

const props = defineProps<{
	intf: SelectInterface
}>()

const selectValue = ref('')

const filteredOptions = computed(() => {
	if (props.intf.options.options) {
		return props.intf.options.allowCustomValue
			? props.intf.options.options.filter((option) =>
				option.text.includes(selectValue.value),
			)
			: props.intf.options.options
	}
	return []
})
const hasEmptySearch = computed(() => {
	return (
		selectValue.value.length >= 1 &&
		filteredOptions.value.length < 1 &&
		!props.intf.options.hideEmptyMenu &&
		props.intf.options.allowCustomValue
	)
})

const onInput = (value: string) => {
	selectValue.value = value
}

watch(selectValue, (value) => {
	// eslint-disable-next-line vue/no-mutating-props
	props.intf.value = value
})
</script>

<template>
	<PSelect
		v-model="selectValue"
		:placeholder="props.intf.options.placeholder"
		:allow-custom-value="props.intf.options.allowCustomValue"
		:options="filteredOptions"
		:disabled="props.intf.options.disabled"
		:autocomplete="props.intf.options.autocomplete"
		:error="props.intf.options.error"
		:hide-empty-menu="props.intf.options.hideEmptyMenu"
		:hint="props.intf.options.hint"
		:label="props.intf.options.label"
		:max-height="props.intf.options.maxHeight"
		:max-length="props.intf.options.maxLength"
		:multiple="props.intf.options.multiple"
		:prefix="props.intf.options.prefix"
		:size="props.intf.options.size"
		:width="props.intf.options.width"
		:variant="props.intf.options.variant"
		:class="{ 'empty-options': hasEmptySearch }"
		@input="onInput"
	>
		<template #header>
			<div
				v-if="hasEmptySearch"
				class="font-normal text-sm leading-[143%] c-$common-asphalt px-[17px] py-4"
			>
				<span v-if="props.intf.options.hintEmptySearch">
					{{ `“${props.intf.value}” не найден` }}
				</span>
				<PButton
					v-else-if="props.intf.options.addEmptySearch"
					variant="default"
					size="x-small"
					color="secondary"
					type="button"
					class="w-full"
				>
					<IconPlusSm />
					<span>{{ `Добавить “${props.intf.value}”` }}</span>
				</PButton>
			</div>
			<slot name="header" />
		</template>
	</PSelect>
</template>

<style scoped>
.empty-options :deep(.dropdown-content) {
	padding: 0;
}
</style>
