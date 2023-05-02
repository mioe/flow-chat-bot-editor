<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGraph, useViewModel } from 'baklavajs'

export default defineComponent({
	setup() {
		const { viewModel } = useViewModel()
		const { graph } = useGraph()

		const styles = computed(() => {
			const config = viewModel.value.settings.background
			// @ts-ignore
			const positionLeft = graph.value.panning.x * graph.value.scaling
			// @ts-ignore
			const positionTop = graph.value.panning.y * graph.value.scaling
			// @ts-ignore
			const size = graph.value.scaling * config.gridSize
			const subSize = size / config.gridDivision
			const backgroundSize = `${size}px ${size}px, ${size}px ${size}px`
			const subGridBackgroundSize =
							// @ts-ignore
							graph.value.scaling > config.subGridVisibleThreshold
								? `, ${subSize}px ${subSize}px, ${subSize}px ${subSize}px`
								: ''
			return {
				backgroundPosition: `left ${positionLeft}px top ${positionTop}px`,
				backgroundSize: `${backgroundSize} ${subGridBackgroundSize}`,
			}
		})

		return { styles }
	},
})
</script>

<template>
	<div
		class="background"
		:style="styles"
	/>
</template>
