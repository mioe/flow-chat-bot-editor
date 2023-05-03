import { Ref, toRef } from 'vue'
import { Graph } from '@baklavajs/core'
import { useViewModel } from './useViewModel'

export function useGraph(): { graph: Readonly<Ref<Graph>> } {
	const { viewModel } = useViewModel()
	return {
		graph: toRef(viewModel.value, 'displayedGraph'),
	}
}
