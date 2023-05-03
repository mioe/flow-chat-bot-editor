import { useGraph } from './useGraph'

export function useTransform() {
	const { graph } = useGraph()

	const transform = (x: number, y: number) => {
		// @ts-ignore
		const tx = x / graph.value.scaling - graph.value.panning.x
		// @ts-ignore
		const ty = y / graph.value.scaling - graph.value.panning.y
		return [tx, ty] as [number, number]
	}

	return { transform }
}
