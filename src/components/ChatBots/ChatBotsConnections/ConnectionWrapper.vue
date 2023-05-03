<template>
	<connection-view
		:x1="d.x1"
		:y1="d.y1"
		:x2="d.x2"
		:y2="d.y2"
		:state="state"
		with-arrow
	/>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeUnmount, onMounted, nextTick, watch } from 'vue'
import { Connection } from '@baklavajs/core'
import ConnectionView from './ConnectionView.vue'
import resolveDom from './domResolver'
import { TemporaryConnectionState } from './connection'
import { useGraph } from '../utility'
import { getOutputPortCoordinates, getInputPortCoordinates } from './portCoordinates'

export default defineComponent({
	components: {
		'connection-view': ConnectionView,
	},
	props: {
		connection: {
			type: Object as () => Connection,
			required: true,
		},
	},
	setup(props) {
		const { graph } = useGraph()

		let resizeObserver: ResizeObserver
		const d = ref({ x1: 0, y1: 0, x2: 0, y2: 0 })

		const state = computed(() =>
			// @ts-ignore
			props.connection.isInDanger ? TemporaryConnectionState.FORBIDDEN : TemporaryConnectionState.NONE,
		)

		// @ts-ignore
		const fromNodePosition = computed(() => graph.value.findNodeById(props.connection.from.nodeId)?.position)
		// @ts-ignore
		const toNodePosition = computed(() => graph.value.findNodeById(props.connection.to.nodeId)?.position)

		const updateCoords = () => {
			const from = resolveDom(props.connection.from)
			const to = resolveDom(props.connection.to)
			if (from.node && to.node) {
				if (!resizeObserver) {
					resizeObserver = new ResizeObserver(() => {
						updateCoords()
					})
					resizeObserver.observe(from.node)
					resizeObserver.observe(to.node)
				}
			}
			const [x1, y1] = getOutputPortCoordinates(from)
			const [x2, y2] = getInputPortCoordinates(to)
			d.value = { x1, y1, x2, y2 }
		}

		onMounted(async() => {
			await nextTick()
			updateCoords()
		})

		onBeforeUnmount(() => {
			if (resizeObserver) {
				resizeObserver.disconnect()
			}
		})

		watch([fromNodePosition, toNodePosition], () => updateCoords(), { deep: true })

		return { d, state }
	},
})
</script>
